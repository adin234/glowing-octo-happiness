var gulp = require("gulp"),
    gulpsync = require('gulp-sync')(gulp),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    template = require('gulp-template-compile'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    watchLess = require('gulp-watch-less'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    amdOptimize = require('gulp-amd-optimizer'),
    requirejs = require('requirejs');

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

gulp.task('less', function () {
    return gulp.src('assets/css/less/**/*.less')
        .pipe(less({
            errLogToConsole: true
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('assets/css/css-backup/less'));
});

gulp.task('dev', ['template-compile', 'sass', 'less', 'dev-js', 'dev-components'], function() {
    gulp.watch('assets/templates/**/*', ['template-compile']);
    gulp.watch('assets/css/scss/**/*', ['sass']);
    gulp.watch('assets/css/less/**/*', ['less']);
    gulp.watch('assets/js/pages/**/**', ['dev-js']);
    gulp.watch('assets/js/components/**/**', ['dev-components']);
});


/**
 * REQUIREJS dirs reference
 * @type {String} 
 */
var components = getDirectories('assets/js/components'),
    pages = getFiles('assets/js/pages');

gulp.task('dev-js', ['compile-pages'], function() {
    return gulp.src(['assets/js/dist/media', 'assets/js/dist/templates'])
        .pipe(clean());
});

gulp.task('compile-pages', function() {
    var config = {
            baseUrl: 'assets/js/pages',
            dir: 'assets/js/dist',
            findNestedDependencies: true,
            keepBuildDir: true,
            paths: {
                'text' : '../libs/text'
            },
            modules: []
        },
        comps = components.slice().map(function(component) {
            return component + '/index';
        });


    comps.forEach(function(comp) {
        config.paths[comp] = 'empty:';
    });

    pages.forEach(function(page) {
        config.modules.push({
            name: page.slice(0, -3),
            exclude: comps
        });
    });

    return optimizeRequriejs(config);
});

gulp.task('dev-components', ['compile-components'], function() {
    return gulp.src(['assets/js/dist/compiled/**/*.js', '!assets/js/dist/compiled/text.js',])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js/dist/components'));
});

gulp.task('compile-components', function() {
    var config = {
        baseUrl: 'assets/js/components',
        dir: 'assets/js/dist/compiled',
        findNestedDependencies: true,
        paths: {
            'text' : '../libs/text'
        },
        modules: []
    };
    components.forEach(function(item) {
        config.modules.push({
            name: item + '/index',
            exclude: ['text']
        });
    });
    return optimizeRequriejs(config);
});

function optimizeRequriejs(opts) {
    return requirejs.optimize(opts, function (buildResponse) {
        console.log(buildResponse);
    }, function(err) {
        console.log(err);
    });
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(srcpath + '/' + file).isDirectory();
  });
}

function getFiles (srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(srcpath + '/' + file).isFile();
    });
}
