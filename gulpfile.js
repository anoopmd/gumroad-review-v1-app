'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const clean = require('gulp-rimraf');
const concat = require('gulp-concat');
const proxy = require('http-proxy-middleware');
const args = require('yargs').argv;
const sass = require('gulp-sass')(require('node-sass'));

const paths = {
  src: {
    dir: 'src',
    css: 'src/**/*.scss',
    assets: 'assets/**/*'
  },
  dist: {
    dir: 'public',
    css: 'public/css',
    js: 'public/js',
    assets: 'public/assets'
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
    'node_modules/lodash/lodash.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/star-rating-svg/src/jquery.star-rating-svg.js'
  ];

  let vendorCssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/star-rating-svg/src/css/star-rating-svg.css'
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

// app js
gulp.task('app', () => {
  gulp.src(['src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(connect.reload());
});

// sass
gulp.task('sass', function () {
  return gulp.src(paths.src.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(connect.reload());
});

// move assets
gulp.task('assets', () => {
  gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets));
});

// start test server and livereload
gulp.task('connect', () => {
  connect.server({
    root: [paths.dist.dir],
    livereload: true,
    port: 8000
  });
});

// start test server and livereload + proxy ws calls
gulp.task('connect-proxy', function(){
  connect.server({
    root: [paths.dist.dir],
    livereload: true,
    port: 8000,
    middleware: function(connect, opt) {
      return [
        proxy.createProxyMiddleware('/api', {
          target: args.proxy,
          secure: false,
          changeOrigin:true
        })
      ];
    }
  });
});

// watch dirs for edits
gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['index']);
  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch(['src/**/*.js'], ['app']);
});

// build
gulp.task('build', ['clean'], () => {
  gulp.start('index', 'app', 'sass', 'assets', 'vendor');
});

// default task
gulp.task('default', ['build', 'connect', 'watch']);
gulp.task('start:proxy', ['build', 'connect-proxy', 'watch']);
