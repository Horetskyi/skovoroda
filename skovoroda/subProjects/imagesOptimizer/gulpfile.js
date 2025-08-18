import gulp from 'gulp';
import webp from 'gulp-webp';
import imageResize from 'gulp-image-resize';

const resizeOptions = {
  // width: 1900, 
  // width: 1200, 
  width: 800, 
  // height: 243,
  // height will be calculated automatically to maintain aspect ratio
};

const options = {
  quality: 100,
  alphaQuality: 100,
  method: 6,
};

export default () => (
	gulp.src('input/*')
    .pipe(webp(options))
    .pipe(imageResize(resizeOptions)) 
		.pipe(gulp.dest('dist'))
);