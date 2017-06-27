var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var stripDebug = require('gulp-strip-debug');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
	.pipe(concat('styles.css'))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Task to concat, strip debugging and minify JS files
gulp.task('scripts', function() {  
  gulp.src('./js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass:watch', 'scripts'], function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('./sass/**/*.scss', browserSync.reload);
});