import gulp from "gulp";
import svgSprite from "gulp-svg-sprite";

export default function (config) {
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
