var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
// var minifyCSS = require('gulp-minify-css');

var config = {
	bootstrapDir: './public/bower_components/bootstrap-sass',
	publicDir: './public',
	scssDir: './resources/scss'
};

gulp.task('css', function() {
	return gulp.src(config.scssDir + '/*.scss')
		.pipe(sass({
			includePaths: [
				config.bootstrapDir + '/assets/stylesheets'
			],
		}))
		.pipe(gulp.dest(config.publicDir));
});

gulp.task('default', ['css'], function(){
	gulp.start('watch');
});

gulp.task('watch', function() {
	watch(config.scssDir + '/**/*.scss', function(files) {gulp.start('css');});
});
