const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const gutil = require('gulp-util');

const CSSSources = [];

const JSSources = [
  './node_modules/angular/angular.js',
  './node_modules/angular-animate/angular-animate.min.js',
  './node_modules/angular-aria/angular-aria.js',
  './node_modules/angular-messages/angular-messages.js',
  './node_modules/angular-ui-router/release/angular-ui-router.js',
  './node_modules/angular-material/angular-material.js'
];

const chatbotJSSources = [
  './src/app/app.js',
  './src/app/services/gateway.service.js',
  './src/app/routes.js'
];

gulp.task('css', () =>
  gulp.src(CSSSources)
  .pipe(plumber())
  .pipe(concatCss('vendors.css'))
  .pipe(cleanCSS())
  .pipe(rename('vendors.min.css'))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('scripts', () =>
  gulp.src(JSSources)
  .pipe(plumber())
  .pipe(concat('vendors.js'))
  .pipe(ngAnnotate())
  .pipe(uglify({
    mangle: true,
    exportAll: true
  }))
  .pipe(rename('vendors.min.js'))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('chatbot', () =>
  gulp.src(chatbotJSSources)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(plumber())
  .pipe(concat('chatbot.js'))
  .pipe(ngAnnotate())
  .pipe(uglify({
    mangle: true,
    exportAll: true
  }))
  .pipe(rename('chatbot.min.js'))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('index', () =>
  gulp.src('./index.html')
  .pipe(gulp.dest('./dist/'))
);

gulp.task('clean', () => del(['./dist/*', '!dist/.gitkeep']));

gulp.task('bs-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: process.env.PORT || 4000
  });

  gulp.watch(
    ['src/app/*.js', 'src/app/components/*.js', 'src/app/components/**/*.js', 'src/app/services/*.js',
      'src/app/components/**/*.html', 'src/app/components/**/**/.html', './*.html',
      'src/app/*.css', 'src/app/components/*.css', 'src/app/components/**/.css', 'src/app/components/**/**/*.css'
    ],
    gulp.series('bs-reload'));
});

gulp.task('templates', () =>
  gulp.src(['src/app/components/**/*.html'])
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./dist/src/app/components')));

gulp.task('inject', () => {
  const target = gulp.src('./index.html');
  const sources = gulp.src(CSSSources.concat(JSSources).concat(chatbotJSSources), { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});


gulp.task('start', gulp.series('inject', 'browser-sync'));
gulp.task('build', gulp.series('clean', 'scripts', 'css', 'chatbot', 'templates', 'index'));
