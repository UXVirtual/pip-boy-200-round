var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
    return gulp.src(paths.source)
        .pipe(plumber({errorHandler: notify.onError('JS Error: <%= error.message %>')}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.output))
        .pipe(notify('JS Compiled'));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output));
});


gulp.task('build-css', function () {
    return gulp.src(paths.style)
        .pipe(plumber({errorHandler: notify.onError('SASS Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['styles',process.cwd() + '/node_modules'].concat(neat)}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output + '/css'))
        .pipe(notify('SCSS Compiled'));
});

gulp.task('build-images', function () {
    return gulp.src(paths.images)
        .pipe(changed(paths.output + 'img/'))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.output + 'img/'));
});

gulp.task('build-fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(changed(paths.output + '/fonts'))
        .pipe(gulp.dest(paths.output + '/fonts'));
})

// this task calls the clean task (located
// in ./clean.js), then runs the build-system,
// build-html and build-css  tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html', 'build-css', 'build-images', 'build-fonts'],
        callback
    );
});
