const gulp = require('gulp');
const {  parallel } = require('gulp');

const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const eslint = require('gulp-eslint');

const series = require('stream-series');

function lint() {
  return gulp.src(['server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}

function unit () {
  return gulp.src('server/test/unit/**/*.js', { read: false })
    .pipe(mocha({reporter: 'spec'}));
};


function integration () {
  return series(gulp.src('server/test/integration/app.js'), gulp.src('server/test/integration/**/*.js'))
//    .pipe(gulp.dest('dest'))
    .pipe(mocha({reporter: 'spec'}));
};



module.exports = {
  lint,
  unit,
  integration,
}
