/**
 * GULP ICONS
 * Takes a folder of svgs and returns a .css svg spritesheet as well as png fallbacks
 */

const glob = require('glob');
const gulp = require('gulp');
const gulpicon = require('gulpicon/tasks/gulpicon');
const dotenv =require('dotenv').config();

const svgs = glob.sync('src/images/icons/*.svg');

gulp.task('icons', gulpicon(svgs, {
	enhanceSVG: true,
	cssprefix: '.Icon-',
	dest: 'web/app/themes/' + process.env.THEME_NAME + '/static/images/icons'
}));
