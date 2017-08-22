var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
var strip = require('gulp-strip-comments');
var wait = require('gulp-wait');
// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 1337;
var app = 'app/';
var dist = 'build/';
var commentStrippedScriptsFolder = "build/scripts";
var commentStrippedMainJS = "build/scripts/main.js";


// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('stripComments', ['build'], function () {
    return gulp.src(app + 'scripts/**/*.js')
        .pipe(strip())
        .pipe(gulp.dest(commentStrippedScriptsFolder));
});

gulp.task('scripts', function () {
    return gulp.src(webpackConfig.entry)
        .pipe($.webpack(webpackConfig))
        .pipe(gulp.dest(dist + 'js/'))
        .pipe($.size({title: 'js'}))
        .pipe($.connect.reload());
});


gulp.task('productionScript', function () {
    var productionConfig = require('./webpack.config.js').getConfig('production');
    console.log(productionConfig.entry);
    return gulp.src(productionConfig.entry)
        .pipe($.webpack(productionConfig))
        .pipe(gulp.dest(dist + 'js/'))
        .pipe($.size({title: 'js'}))

});


// copy html from app to dist
gulp.task('html', function () {
    return gulp.src(app + 'index.html')
        .pipe(wait(10000))
        .pipe(gulp.dest(dist))
        .pipe($.size({title: 'html'}))
        .pipe($.connect.reload());
});


// add livereload on the given port
gulp.task('serve', function () {
    $.connect.server({
        root: dist,
        port: port,
        livereload: {
            port: 35729
        }
    });
});


// copy images
gulp.task('images', function (cb) {
    return gulp.src(app + 'images/**/*.{png,jpg,jpeg,gif}')
        .pipe($.size({title: 'images'}))
        .pipe(gulp.dest(dist + 'images/'));
});

// copy style
gulp.task('assets', function (cb) {
    return gulp.src(app + 'assets/**/*.*')
        .pipe(gulp.dest(dist + 'assets/'));
});

// copy vendor
gulp.task('vendor', function (cb) {
    return gulp.src(app + 'vendor/**/*.*')
        .pipe(gulp.dest(dist + 'vendor/'));
});

// copy host and simulationframe
gulp.task('frames', function (cb) {
    return gulp.src([app + 'hostframe.html', app + 'SimulationFrame.html'])
        .pipe(gulp.dest(dist));
});


// copy external testdata
gulp.task('testdata', function (cb) {
    return gulp.src(app + 'testdata/**/*.*')
        .pipe(gulp.dest(dist + 'testdata/'));
});

// copy bower components
gulp.task('bower', function (cb) {
    return gulp.src(app + 'bower_components/**/*.*')
        .pipe(gulp.dest(dist + 'bower_components/'));
});

// watch styl, html and js file changes
gulp.task('watch', function () {
    gulp.watch(app + 'assets/**/*.*', ['assets']);
    gulp.watch(app + 'index.html', ['html']);
    gulp.watch(app + 'scripts/**/*.js', ['scripts']);
});

// remove bundels
gulp.task('clean', function (cb) {
    return del([dist], cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
    gulp.start(['testdata', 'assets', 'bower', 'images', 'vendor', 'html', 'scripts','frames']);
});


// waits until clean is finished then builds the project
gulp.task('prod', function () {
    gulp.start(['productionScript']);
});
