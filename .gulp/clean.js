const gulp = require('gulp');
const del = require('del');
const dotenv =require('dotenv').config();


// Deletes the two folders containing compiled output.
gulp.task('clean', () => del( 'web/app/themes/' + process.env.THEME_NAME ));
