var install = require("gulp-install"),
    gulp = require("gulp"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    template = require('gulp-template-compile'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace');

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

gulp.task('template-compile', function() {
    return gulp.src('assets/templates/**/*.html')
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(replace(/_.escape/g, '\'\''))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('dev', ['template-compile'], function() {
    gulp.watch('assets/templates/**/*', ['template-compile']);
});