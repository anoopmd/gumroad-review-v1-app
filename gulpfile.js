'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const clean = require('gulp-rimraf');
const concat = require('gulp-concat');
const proxy = require('http-proxy-middleware');
const args = require('yargs').argv;
const sass = require('gulp-sass')(require('node-sass'));

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

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
gulp.task('vendor-css', function() {
  let vendorCssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/star-rating-svg/src/css/star-rating-svg.css'
  ];

  // build vendor css files
  gulp.src(vendorCssFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dist.css));
});

// vendor plugins files (not able to browserify these)
gulp.task('vendor-plugins', function() {
  let vendorPluginFiles = [
    'node_modules/star-rating-svg/src/jquery.star-rating-svg.js'
  ];

  // build vendor css files
  gulp.src(vendorPluginFiles)
    .pipe(concat('vendor-plugins.js'))
    .pipe(gulp.dest(paths.dist.js));
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
  gulp.watch(['src/**/*.js'], ['app-bundle']);
});

gulp.task('app-bundle', function() {
  let appBundler = browserify(['./src/main.js']);
  let libs = ['jquery', 'lodash', 'react', 'react-dom'];

  libs.forEach(function(lib) {
    appBundler.external(lib);
  });

  appBundler
    .transform(babelify.configure({
      presets: ["@babel/preset-react"]
    }))
    .bundle()
    .on('error', (err)=>{
      console.log('App Bundler error');
      console.log(err);
    })
    .pipe(source('app-bundle.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(connect.reload());
});

gulp.task('vendor-bundle', function() {
  let vendorBundler = browserify();
  let libs = ['jquery', 'lodash', 'react', 'react-dom'];

  libs.forEach(function(lib) {
    vendorBundler.require(lib);
  });

  vendorBundler.bundle()
    .pipe(source('vendor-bundle.js'))
    .pipe(gulp.dest(paths.dist.js));
});

// build
gulp.task('build', ['clean'], () => {
  gulp.start('index', 'app-bundle', 'sass', 'assets', 'vendor-bundle', 'vendor-css', 'vendor-plugins');
});

// default task
gulp.task('default', ['build', 'connect', 'watch']);
gulp.task('start:proxy', ['build', 'connect-proxy', 'watch']);
