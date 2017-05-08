const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const dotenv =require('dotenv').config();


/**
 * Development server
 */
gulp.task('serve', cb => {
	runSequence(
		'clean',
		['copy-from-src-to-theme', 'copy-from-app-to-static', 'copy-from-app-to-theme'],
		['styles', 'scripts', 'icons', 'images'],
		['serve:src', 'watch'],
		cb);
});

gulp.task('serve:src', cb => {
	browserSync.init({
		notify: false,
		proxy: process.env.LOCAL_PROXY,
		open: false
	});
	cb();
});


gulp.task('copy-from-src-to-theme', () => {
	return gulp.src(['src/theme/**/*'])
		.pipe(gulp.dest('web/app/themes/' + process.env.THEME_NAME ));
});


/**
 * Run tasks (that might reload the server) when these files change.
 */

gulp.task('watch', cb => {
	// gulp.watch(['src/images/*.png', 'src/images/**/*', '!src/images/icons/**/*', '!src/images/favicons/**/*'], ['images']).on('change', browserSync.reload);
	gulp.watch(['src/theme/*', 'src/theme/templates/**/*.twig'], ['copy-from-src-to-theme']).on('change', browserSync.reload);
	gulp.watch(['src/styles/*.css', 'src/styles/**/*.css'], ['postcss']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/icons/*.{svg,png}', ['icons', 'copy-from-tmp-to-theme']).on('change', browserSync.reload);
	cb();
});

// Export our instance of browserSync to other tasks.
module.exports = browserSync;
