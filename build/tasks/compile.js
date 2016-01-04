var gulp = require('gulp');

var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var paths = require('../paths');


var uglify = require('gulp-uglify');
var jspm = require('gulp-jspm');



var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');



gulp.task('compile-js', function() {
    return gulp.src(paths.output + 'js/main.js')
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output + 'js'));
});

gulp.task('compile-css', function() {
    return gulp.src(paths.style)
        .pipe(sass({includePaths: ['styles'].concat(neat), outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.output + '/css/compressed'));
});



gulp.task('compile', function(callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html', 'build-css', 'build-images', 'build-fonts'],
        ['compile-js', 'compile-css'],
        callback
    );
});