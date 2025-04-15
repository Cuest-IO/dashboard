import gulp from 'gulp';
import setProcessEnv from './env.js';

setProcessEnv(`../.env.${process.env.NODE_ENV}`);

const config = {
  public: {
    images: `../${process.env.FOLDER_PUBLIC_BASE}/assets`,
    images_tmp: `../${process.env.FOLDER_PUBLIC_BASE}/assets/tmp`,
    copy: `../${process.env.FOLDER_PUBLIC_BASE}/copy`,
  },
  private: {
    svg_files: `../${process.env.FOLDER_PRIVATE_BASE}/../assets/sprite/svg/*.svg`,
    images: [
      `!../${process.env.FOLDER_PRIVATE_BASE}**/svg/`,
      `!../${process.env.FOLDER_PRIVATE_BASE}**/img/tmp/`,
      `!../${process.env.FOLDER_PRIVATE_BASE}**/img/style/`,
      `../${process.env.FOLDER_PRIVATE_BASE}**/img/*.*`,
      `../${process.env.FOLDER_ASSETS_IMG}*.*`
    ],
    images_tmp: [`../${process.env.FOLDER_PRIVATE_BASE}/**/img/tmp/**/*.*`],
    copy: `../${process.env.FOLDER_PRIVATE_BASE}/**/copy/**/*.*`,
  },
  key: {
    tiny: process.env.KEY_TINY,
  },
};

import gulp_tasks__copy from './gulp-tasks/gulp_tasks__copy.js';
import gulp_tasks__img_current from './gulp-tasks/gulp_tasks__img_current.js';
import gulp_tasks__img_tmp from './gulp-tasks/gulp_tasks__img_tmp.js';
import gulp_tasks__svg_sprite from './gulp-tasks/gulp_tasks__svg_sprite.js';

export function img_current(done) {
  gulp_tasks__img_current(config);
  done();
}

export function img_tmp(done) {
  gulp_tasks__img_tmp(config);
  done();
}

export function copy(done) {
  gulp_tasks__copy(config);
  done();
}

export function sprite(done) {
  gulp_tasks__svg_sprite(config);
  done();
}

export const img = gulp.series(img_current, img_tmp);
export const defaultTask = gulp.series(img, copy, sprite);

export { defaultTask as default };
