var gulp = require("gulp"),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    template = require('gulp-template-compile'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    watchLess = require('gulp-watch-less'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    amdOptimize = require('amd-optimize');

gulp.task('image-compressed', function () {
    return gulp.src('assets/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/dist'));
});

gulp.task('sass', function () {
    return gulp.src('assets/css/scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('template-compile', function() {
    var path = 'assets/templates/',
        dirs = fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path+file).isDirectory();
        });

    return dirs.forEach(function(dir) {
        gulp.src(path + dir + '/**/*.html')
            .pipe(template())
            .pipe(concat('templates.js'))
            .pipe(replace(/_.escape/g, '\'\''))
            .pipe(gulp.dest(path + dir));
    });
});

gulp.task('dev', ['template-compile', 'sass', 'less'], function() {
    gulp.watch('assets/templates/**/*', ['template-compile']);
    gulp.watch('assets/css/scss/**/*', ['sass']);
    gulp.watch('assets/css/less/**/*', ['less']);
});

gulp.task('less', function () {
    return gulp.src('assets/css/less/*.less')
        .pipe(less({
            errLogToConsole: true
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css/css-backup/less/'));
});

gulp.task('compile-js', function() {
    var requirejs = require('requirejs');

    var config = {

        baseUrl: 'assets/js',
        name: 'components/index/main',
        out: 'assets/dist/main-built.js',
        paths: {
            'jquery': 'libs/jquery.min',
            'text': 'libs/text',
            'css': '../css',
            'common': 'components/common',
            'less-builder': 'libs/require-less/less-builder',
            'normalize': 'libs/require-less/normalize',
            'less': 'libs/require-less/less'
        }


        /*MODULE CONFIG*/
        // baseUrl: 'assets/js',
        // dir: 'assets/js/dist',
        // map: {
        //     '*': {
        //         'less': 'libs/require-less/less'
        //     }
        // },
        // paths: {
        //     'jquery': 'libs/jquery.min',
        //     'text': 'libs/text',
        //     'css': '../css',
        //     'common': 'components/common'
        // },
        // shim: {
        //     'util'                                      : ['jquery'],
        //     'function'                                  : ['jquery'],
        //     'libs/jquery.gritter.min'                   : ['jquery'],
        //     'libs/hoverIntent'                          : ['jquery'],
        //     'libs/superfish'                            : ['jquery'],
        //     'libs/jquery.fixed.menu'                    : ['jquery'],
        //     'libs/jquery.autocomplete.min'              : ['jquery'],
        //     'libs/jquery.bxslider.min'                  : ['jquery'],
        //     'libs/jquery.mCustomScrollbar.concat.min'   : ['jquery'],
        //     'libs/jquery.tabslet.min'                   : ['jquery'],
        //     'libs/jquery.tooltipster.min'               : ['jquery'],
        //     'libs/socketio'                             : ['jquery']
        // },
        // modules: [
        //     {
        //         name: 'components/index/main',
        //         exclude: ['libs/require-less/normalize']
        //     }
        // ]
    };

    return requirejs.optimize(config, function (buildResponse) {
        //buildResponse is just a text output of the modules
        //included. Load the built file for the contents.
        //Use config.out to get the optimized file contents.
        var contents = fs.readFileSync(config.out, 'utf8');
    }, function(err) {
        //optimization err callback
        console.log(err);
    });
});