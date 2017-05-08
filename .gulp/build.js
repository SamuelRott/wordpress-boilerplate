const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const dotenv =require('dotenv').config();
const gutil = require("gulp-util");

// Build everything
gulp.task('build', cb => {
	runSequence(
		'clean',
		['icons', 'images', 'styles', 'scripts'],
		['copy-from-app-to-static', 'copy-from-app-to-theme'],
		['minify-styles', 'minify-scripts'],
		cb);
});

// Copies files not handled by other tasks.
gulp.task('copy-from-app-to-static', () => {
	if(!process.env.THEME_NAME) {
	  throw new gutil.PluginError({
	    plugin: 'copy-from-app-to-static',
	    message: 'Environment variable process.env.THEME_NAME is missing.'
	  });
	}

	return gulp.src([
		'src/scripts/vendor/**/*',
    'src/fonts/**/*',
    'src/no-timber.html',
    'src/robots.txt'
	], {
		// Because we copy multiple dirs we have to:
		// 1. keep folder structure
		base: 'src',
		// 2. include .dotfiles
		dot: true
	}).pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static'));
});

gulp.task('copy-from-app-to-theme', () => {
	return gulp.src([
    'src/theme/**/*'
	], {
		// Because we copy multiple dirs we have to:
		// 1. keep folder structure
		base: 'src/theme',
		// 2. include .dotfiles
		dot: true
	}).pipe(gulp.dest('web/app/themes/' + process.env.THEME_NAME ));
});

gulp.task('minify-styles', () => {
	return gulp.src( 'web/app/themes/' + process.env.THEME_NAME + '/styles/*.css', {base: 'web/app/themes/' + process.env.THEME_NAME + '/static'})
		// Don't remove vendor-prefixes and 'safe' until cssnano v4 is released.
		.pipe(cssnano({
			safe: true,
			autoprefixer: false
		}))
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static'));
});

gulp.task('minify-scripts', () => {
	return gulp.src( 'web/app/themes/' + process.env.THEME_NAME + '/static/scripts/*.js', {base:  'web/app/themes/' + process.env.THEME_NAME + '/static'})
		.pipe(uglify())
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static'));
});
