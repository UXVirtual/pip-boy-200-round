var gulp = require('gulp');
var config = require('../config');


gulp.task('deploy', ['compile'],function() {
    rsync({
        ssh: true,
        src: './',
        dest: config.username+'@'+ config.hostname + ':' + config.path,
        recursive: true,
        syncDest: true,
        args: ['--verbose -rltD'],
        exclude: ["*scss*", "*node_modules*", "*.sass-cache", "*.git", "*sublime*", ".idea/*", ".htaccess", '*jspm_packages*','resources'],
    }, function(error, stdout, stderr, cmd) {
        console.log(stdout);
    });
});


