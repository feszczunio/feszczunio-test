'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const autoPrefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')

/** STYLESHEETS */

gulp.task('scss:watch', () =>
  gulp.watch(['./assets/stylesheets/**/*.scss'], gulp.series('scss:compile'))
)

gulp.task('scss:compile', () =>
  gulp
    .src(['./assets/stylesheets/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/stylesheets'))
)

gulp.task('scss:minify', () =>
  gulp
    .src([
      './assets/stylesheets/**/*.css',
      '!./assets/stylesheets/**/*.min.css',
    ])
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gulp.dest('./assets/stylesheets'))
)

gulp.task('scss', gulp.series('scss:compile', 'scss:minify'))

/** JAVASCRIPT */

gulp.task('js:copy', () =>
  gulp
    .src(['./assets/javascripts/*.js', '!./assets/javascripts/*.min.js'])
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./assets/javascripts'))
)

gulp.task('js:minify', () =>
  gulp
    .src(['./assets/javascripts/*.min.js'])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/javascripts'))
)

gulp.task('js', gulp.series('js:copy', 'js:minify'))

/** DEFAULT */

gulp.task('default', gulp.series('js', 'scss'))
