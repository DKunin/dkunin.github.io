'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var sftp = require('gulp-sftp');
function log(error) {
    var errorString = [
        '[' + error.name + ' in ' + error.plugin + ']',
        error.message
    ].join('\n');
    console.log(errorString);
    growl(errorString, { image: './err.jpg' });
    this.end();
}

var RootPath = './public';
var StylesPath = RootPath + '/styles';
var ViewsPath = RootPath + '/views';
var BuildPath = './';

gulp.task('connect', function() {
    connect.server({
        livereload: true,
        port: 9006,
        root: BuildPath
    });
});

gulp.task('stylus', function() {
    gulp
        .src(StylesPath + '/style.styl')
        .pipe(
            stylus({
                errors: true,
                use: [nib()]
            })
        )
        .pipe(gulp.dest(BuildPath + '/css'))
        .pipe(connect.reload());
});

gulp.task('jade', function() {
    gulp
        .src(ViewsPath + '/index.jade')
        .pipe(
            jade({
                pretty: true,
                basedir: './public/views'
            })
        )
        .pipe(gulp.dest(BuildPath));
    //.pipe(connect.reload());
});

gulp.task('build', ['jade', 'stylus']);

gulp.task('default', ['build', 'watch', 'connect']);

gulp.task('watch', function() {
    gulp.watch(StylesPath + '/*.styl', ['stylus']);
    gulp.watch(ViewsPath + '/**/*.jade', ['jade']);
});
