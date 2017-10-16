var gulp = require('gulp'),
    sass = require('gulp-sass');

// task to compile sass files on save
gulp.task('sass', function() {
    return gulp.src('public/css/styles.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

// gulp watch task to watch for file changes
gulp.task('watch', function() {
  gulp.watch('public/css/*.sass', ['sass']);
});

// default gulp task - is executed automatically on `gulp` command
gulp.task('default', function() {
    // run the main tasks - including the watch task
    gulp.start('sass', 'watch');
});