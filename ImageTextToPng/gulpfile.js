const { src, dest, series } = require("gulp");
const {Jimp, JimpMime} = require("jimp");  // <-- Ensure correct import
const through = require("through2");
const path = require("path");
// const cv = require("opencv4nodejs");

const darkPixelThreshold = 180; 
const isScaleEnabled = false;

function makeTransparent(image) {
    return image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        if (this.bitmap.data[idx] > darkPixelThreshold) {
            this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (fully transparent)
        } 
    });
}
function makeTotalBlack(image) {
    return image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        if (this.bitmap.data[idx] <= darkPixelThreshold) {
            // If the pixel is dark, make it solid black
            this.bitmap.data[idx] = 0;   // Red channel
            this.bitmap.data[idx + 1] = 0; // Green channel
            this.bitmap.data[idx + 2] = 0; // Blue channel
            this.bitmap.data[idx + 3] = 255; // Fully opaque (visible)
        }
    });
}
function scale(image, number) {
    return image.resize({w: image.bitmap.width * number, h: image.bitmap.height * number});
}

function processImages() {
    return src("src/*.{jpg,png}")
        .pipe(
            through.obj(async function (file, _, cb) {
                if (file.isBuffer()) {
                    try {
                        console.log(`✔ Processing file: ${file.path} (${file.contents.length} bytes)`);
                        let image = await Jimp.read(file.path);
                        const loadedImageHeight = image.bitmap.height;
                        console.log("✔ Loaded Image:", image.bitmap.width, "x", loadedImageHeight);

                        // Apply transformations
                        image = image.greyscale();
                        if (loadedImageHeight > 1400 && isScaleEnabled) {
                            image = scale(image, 0.5);
                        }
                        // image = scale(image, 2);
                        image = image.threshold({ max: darkPixelThreshold });
                        image = makeTotalBlack(image); // bolder
                        image = image.gaussian(1); // needed to make image more smooth
                        image = makeTransparent(image);
                        image = makeTotalBlack(image);
                        if (loadedImageHeight > 2800 && isScaleEnabled) {
                            image = scale(image, 0.5);
                        }
                        // image = image.dilate(0.2);
                        // image = image.resize({w: image.bitmap.width * 2, h: image.bitmap.height * 2}) // Upscale 2x
                        // image = image.contrast(0) // 0.5
                        // image = image.resize({w: image.bitmap.width * 0.5, h: image.bitmap.height * 0.5})
                        // image = image.contrast(0.1) // 0.2
                       
                        // Convert to PNG
                        let outputFile = path.basename(file.path, path.extname(file.path)) + ".png";
                        file.contents = await image.getBuffer(JimpMime.png, { quality: 100 });
                        file.path = path.join(file.base, outputFile);
                        console.log("✔ Ready file: " + file.path);

                    } catch (error) {
                        console.error(error);
                        return cb(error);
                    }
                }
                cb(null, file);
            })
        )
        .pipe(dest("dist/")); // Save output to 'dist' folder
}

exports.default = series(processImages);
