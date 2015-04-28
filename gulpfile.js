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
    minifyCSS = require('gulp-minify-css');

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
    return gulp.src('assets/css/scss/main.scss')
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
});
