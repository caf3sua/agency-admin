var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require("gulp-rename");

gulp.task('clean', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('build', ['clean'], function () {
    return gulp.src('src/**/*.js')
		.pipe(ngAnnotate())
		.pipe(gulp.dest('dist/'))		
		.pipe(uglify())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/'));
});