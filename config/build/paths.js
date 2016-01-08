var path = require('path');

var appRoot = 'assets/';
var outputRoot = 'public/';
var compiledRoot = 'dist/'

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: appRoot + 'scss/**/*.scss',
  public: outputRoot,
  output: outputRoot + 'assets/',
  images: appRoot + 'img/**/*',
  fonts: appRoot + 'fonts/**/*',
  compiled: compiledRoot
};
