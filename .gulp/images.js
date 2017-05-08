const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const dotenv =require('dotenv').config();


gulp.task('images', ['images:optimize', 'images:favicons']);

// Optimize all images
// … except icons and favicons, which are handled by `gulp icons` and `gulp images:favicons` respectively.
gulp.task('images:optimize', () => {
	return gulp.src(['src/images/**/*', '!src/images/icons/**/*', '!src/images/favicons/**/*'])
		.pipe(changed( 'web/app/themes/' + process.env.THEME_NAME + '/static/images'))
		.pipe(imagemin([
			imagemin.svgo({plugins: [{cleanupIDs: false}]})
		]))
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static/images'));
});

// Move favicons to the root because that's where browsers expect them to be,
// and we don't want to pollute our list of files with one million favicons
gulp.task('images:favicons', () => {
	return gulp.src('src/images/favicons/**/*')
		.pipe(changed( 'web/app/themes/' + process.env.THEME_NAME + '/static'))
		.pipe(gulp.dest( 'web/app/themes/' + process.env.THEME_NAME + '/static'));
});
