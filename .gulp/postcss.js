const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('./serve');
const suitcss = require('gulp-suitcss');
const dotenv =require('dotenv').config();

const plugins = ['postcss-mixins', 'postcss-nested', 'postcss-for', 'postcss-calc'];

gulp.task('postcss', () => {
	return gulp.src('src/styles/*.css')
		.pipe(plumber())
		.pipe(suitcss({
      minify: false,
			use: plugins
		}))
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static/styles'))
		.pipe(browserSync.stream());
});
