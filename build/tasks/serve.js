var gulp = require('gulp');
var browserSync = require('browser-sync');
var php = require('gulp-connect-php');
var paths = require('../paths');



gulp.task('php', function() {
  php.server({ base: paths.public , port: 8010, keepalive: true, router: process.cwd() + '/server.php'});
});


// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build', 'php'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: "public"
    //proxy: '127.0.0.1:8010'
  }, done);
});
