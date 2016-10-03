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

gulp.task('styles', ['clean-styles'], () => {
  log('Compiling SASS to CSS');
  return gulp
    .src(config.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.distDir + '/styles'));
});

gulp.task('scripts', ['clean-scripts'], () => {
  log('Compiling scripts');
  return gulp
    .src(config.js)
    .pipe(gulp.dest(config.distDir + '/scripts'));  
});

gulp.task('images', ['clean-images'], () => {
  log('Optimizing images');
  return gulp
    .src(config.images)
    //add optimization here
    .pipe(gulp.dest(config.distDir + '/images'));  
});

gulp.task('views', ['clean-views'], () => {
  log('Copying views');
  return gulp
    .src(config.html)
    .pipe(gulp.dest(config.distDir));
});

gulp.task('clean-styles', () => {
  var files = config.distDir + '/**/*.css';
  del(files);
});

gulp.task('clean-scripts', () => {
  var files = config.distDir + '/**/*.js';
  del(files);
});

gulp.task('clean-images', () => {
  var files = config.distDir + '/**/*.png';
  del(files);
});

gulp.task('clean-views', () => {
  var files = config.distDir + '/**/*.html';
  del(files);
});

gulp.task('watch', () => {
  gulp.watch([config.scss], ['styles']);
  gulp.watch([config.js], ['scripts']);
});

gulp.task('default', ['lint', 'scripts', 'styles', 'images', 'views'], () => {
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
