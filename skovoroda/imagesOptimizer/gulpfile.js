import gulp from 'gulp';
import webp from 'gulp-webp';
import imageResize from 'gulp-image-resize';

const resizeOptions = {
  width: 221, // Set the desired width here
  // height: 243,
  // height will be calculated automatically to maintain aspect ratio
};

const options = {
  quality: 75,
  alphaQuality: 100,
  method: 5,
};

export default () => (
	gulp.src('input/*')
    //.pipe(webp(options))
    .pipe(imageResize(resizeOptions)) 
		.pipe(gulp.dest('dist'))
);