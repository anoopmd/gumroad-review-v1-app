'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const clean = require('gulp-rimraf');
const concat = require('gulp-concat');

const paths = {
  src: {
    dir: 'src'
  },
  dist: {
    dir: 'public',
    css: 'public/css',
    js: 'public/js'
  }
};

// clean build dir
gulp.task('clean', () => {
  return gulp.src([paths.dist.dir], {read: false})
    .pipe(clean());
});

// vendor files
gulp.task('vendor', function() {
  let vendorJsFiles = [
    'node_modules/jquery/dist/jquery.min.js'
  ];

  let vendorCssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ];

  // build vendor js files
  gulp.src(vendorJsFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dist.js));

  // build vendor css files
  gulp.src(vendorCssFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dist.css));
});

// copy index to public
gulp.task('index', () => {
  gulp.src(['src/index.html'])
    .pipe(gulp.dest(paths.dist.dir))
    .pipe(connect.reload());
});

// start test server and livereload
gulp.task('connect', () => {
  connect.server({
    root: [paths.dist.dir],
    livereload: true,
    port: 8000
  });
});

// watch dirs for edits
gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['index']);
});

// build
gulp.task('build', ['clean'], () => {
  gulp.start('index', 'vendor');
});

// default task
gulp.task('default', ['build', 'connect', 'watch']);
