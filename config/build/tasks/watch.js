var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var batch = require('gulp-batch');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.history.join(', ') + ' was ' + event.event + 'ed, running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function () {
    watch(paths.source, batch(function (events, done) {
        return events.on('data',function(event) {
            reportChange(event);
        }).on('end', function() {
            return runSequence('build-system', function() {
                browserSync.reload();
                done();
            });
        });

    }));
    watch(paths.images, batch(function (events, done) {
        return events.on('data',function(event) {
            reportChange(event);
        }).on('end', function() {
            return runSequence('build-images', function() {
                browserSync.reload();
                done();
            });
        });
    }));
    watch(paths.html, batch(function (events, done) {
        return events.on('data',function(event) {
            reportChange(event);
        }).on('end', function() {
            return runSequence('build-html', function() {
                browserSync.reload();
                done();
            });
        });
    }));
    watch(paths.fonts, batch(function (events, done) {
        return events.on('data',function(event) {
            reportChange(event);
        }).on('end', function() {
            return runSequence('build-fonts', function() {
                browserSync.reload();
                done();
            });
        });
    }));
    watch(paths.style, batch(function (events, done) {
        return events.on('data',function(event) {
            reportChange(event);
        }).on('end', function() {
            return runSequence('build-css', function() {
                browserSync.reload();
                done();
            });
        });
    }));
});
