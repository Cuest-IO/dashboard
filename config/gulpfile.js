const gulp = require('gulp');
// Tasks
const gulp_tasks__copy = require( './gulp-tasks/gulp_tasks__copy');
const gulp_tasks__img_current = require( './gulp-tasks/gulp_tasks__img_current');
const gulp_tasks__img_tmp = require( './gulp-tasks/gulp_tasks__img_tmp');
const gulp_tasks__svg_sprite = require( './gulp-tasks/gulp_tasks__svg_sprite');

// Добавление ENV переменных в конфигурацию
const setProcessEnv = require( './env');
setProcessEnv(`../.env.${process.env.NODE_ENV}`);
const config = {
  public: {
    images: `../${process.env.FOLDER_PUBLIC_BASE}/assets`,
    images_tmp: `../${process.env.FOLDER_PUBLIC_BASE}/assets/tmp`,
    copy: `../${process.env.FOLDER_PUBLIC_BASE}/copy`,
  },
  private: {
    svg_files: `../${process.env.FOLDER_PRIVATE_BASE}/assets/sprite/svg/*.svg`,
    images: [
      `!../${process.env.FOLDER_PRIVATE_BASE}/**/svg/`,
      `!../${process.env.FOLDER_PRIVATE_BASE}/**/img/tmp/`,
      `!../${process.env.FOLDER_PRIVATE_BASE}/**/img/style/`,
      `../${process.env.FOLDER_PRIVATE_BASE}/**/img/*.*`
    ],
    images_tmp: [`../${process.env.FOLDER_PRIVATE_BASE}/**/img/tmp/**/*.*`],
    copy: `../${process.env.FOLDER_PRIVATE_BASE}/**/copy/**/*.*`,
  },
  key: {
    tiny: process.env.KEY_TINY, // Ключ для оптимизации изображений (https://tinypng.com/developers)
  },
};

gulp.task('img_current', function (done) { gulp_tasks__img_current(config); done()});
gulp.task('img_tmp', function (done) { gulp_tasks__img_tmp(config); done()});
gulp.task('copy', function (done) { gulp_tasks__copy(config); done()});
gulp.task('sprite', function (done) { gulp_tasks__svg_sprite(config); done()});

// Build
gulp.task('img', gulp.series(['img_current', 'img_tmp']));
gulp.task('default', gulp.series(['img', 'copy', 'sprite']));
