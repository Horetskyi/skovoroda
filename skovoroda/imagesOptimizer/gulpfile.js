import gulp from 'gulp';
import webp from 'gulp-webp';

const options = {
  quality: 75,
  alphaQuality: 100,
  method: 5,
};

export default () => (
	gulp.src('input/*')
		.pipe(webp(options))
		.pipe(gulp.dest('dist'))
);