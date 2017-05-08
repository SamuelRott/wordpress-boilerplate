const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const rollupify = require('rollupify');
const notify = require('gulp-notify');
const browserSync = require('./serve');
const dotenv =require('dotenv').config();

// Runs browserify with transforms on our scripts
gulp.task('browserify', () => {
	return browserify('src/scripts/app.js', {debug: true})
		.transform(rollupify)
		.transform(babelify)
		.bundle()
		.on('error', notify.onError(error => `Browserify error: ${error}`))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static/scripts'))
		.pipe(browserSync.stream({once: true}));
});
