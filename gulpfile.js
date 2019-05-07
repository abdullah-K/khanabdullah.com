const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer');

// task to compile sass files on save and output a minified CSS file
let styles = () => {
    return gulp.src('public/css/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename((path) => {path.basename += ".min"}))
        .pipe(prefix())
        .pipe(gulp.dest('public/css/'));
};

// gulp watch task to watch for file changes
let watch = () => {
  gulp.watch('public/css/*.sass', gulp.series(styles));
};

// default gulp task - styles task runs first to generate CSS. Then, the watch task is run
gulp.task('default', gulp.series(styles, gulp.parallel(watch), (done) => {
    done();
}));
