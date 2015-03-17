var install = require("gulp-install");
var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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

