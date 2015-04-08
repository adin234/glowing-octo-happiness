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

gulp.task('dev', ['template-compile', 'sass', 'less', 'dev-js', 'compile-components'], function() {
    gulp.watch('assets/templates/**/*', ['template-compile']);
    gulp.watch('assets/css/scss/**/*', ['sass']);
    gulp.watch('assets/css/less/**/*', ['less']);
    gulp.watch(['assets/js/**/*', '!assets/js/dist/**'], ['dev-js', 'compile-components']);
});

gulp.task('dev-js', function() {
    return gulp.src('assets/js/pages/**')
        .pipe(gulp.dest("assets/js/dist/"));
});

gulp.task('compile-components', function() {
    var baseUrl = 'assets/js/temp_components',
        targetDir = 'assets/js/dist/compiled',
        config = {
            baseUrl: baseUrl,
            dir: targetDir,
            findNestedDependencies: true,
            removeCombined: true,
            paths: {
                'text' : '../libs/text'
            },
            modules: []
        },
        components = getDirectories(baseUrl);

    components.forEach(function(item) {
        config.modules.push({
            name: item + '/index',
            exclude: ['text']
        });
    });

    requirejs.optimize(config, function (buildResponse) {
        //buildResponse is just a text output of the modules
        //included. Load the built file for the contents.
        //Use config.out to get the optimized file contents.
        // var contents = fs.readFileSync(config.out, 'utf8');
        console.log(buildResponse);
    }, function(err) {
        //optimization err callback
        console.log(err);
    });

    return gulp.src([targetDir + '/**/*.js', '!'+targetDir + '/**/text.js',])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js/dist/components'));
});

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(srcpath + '/' + file).isDirectory();
  });
}
