var gulp =          require('gulp');
var gulpprint =     require('gulp-print');
var gulpif =        require('gulp-if');

var eslint =        require('gulp-eslint');
var sass =          require('gulp-sass');
var autoprefixer =  require('gulp-autoprefixer');
var util =          require('gulp-util');
var del =           require('del')
var args =          require('yargs').argv;

var config = require('./gulp.config')();

gulp.task('lint', () => {
  log('Analyzing source with ESLint');
  return gulp
    .src(config.js)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('styles', ['clean-styles'], function () {
  log('Compiling SASS to CSS');
  return gulp
    .src(config.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.distDir + '/styles'));
});

gulp.task('scripts', ['clean-scripts'], function () {
  log('Compile scripts');
  return gulp
    .src(config.js)
    .pipe(gulp.dest(config.distDir + '/scripts'));  
});

gulp.task('images', ['clean-images'], function () {
  log('Optimize images');
  return gulp
    .src(config.images)
    .pipe(gulp.dest(config.distDir + '/images'));  
});

gulp.task('clean-styles', function () {
  var files = config.distDir + '/**/*.css';
  del(files);
});

gulp.task('clean-scripts', function () {
  var files = config.distDir + '/**/*.js';
  del(files);
});

gulp.task('clean-images', function () {
  var files = config.distDir + '/**/*.png';
  del(files);
});

gulp.task('watch', function () {
  gulp.watch([config.scss], ['styles']);
  gulp.watch([config.js], ['scripts']);
});

gulp.task('default', ['lint', 'styles', 'scripts', 'images'], function () {
  
});

///////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    Object.keys(msg).forEach(function (item) {
      util.log(util.colors.blue(msg[item]));
    });
  } else {
    util.log(util.colors.blue(msg));
  }
}
