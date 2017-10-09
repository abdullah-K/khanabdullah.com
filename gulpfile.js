var gulp = require('gulp'), sass = require('gulp-sass'), pug = require('gulp-pug');

// task to compile sass files on save
gulp.task('sass', function() {
    return gulp.src('public/css/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

// task to compile main pug file on save
gulp.task('pug',function() {
 return gulp.src('public/*.pug')
 .pipe(pug({
    doctype: 'html',
    pretty: true
 }))
 .pipe(gulp.dest('public/'));
});

// default gulp task - is executed automatically on `gulp` command
gulp.task('default', function() {
    gulp.watch('public/*.sass', ['styles']);
    // run the main tasks
    gulp.start('sass', 'pug');
});