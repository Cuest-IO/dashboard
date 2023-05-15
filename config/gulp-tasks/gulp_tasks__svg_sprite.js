const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");

module.exports = function (config) {
  return gulp.src(config.private.svg_files)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../symbol_sprite.svg',
        },
      },
    }))
    .pipe(gulp.dest(config.public.images));
};
