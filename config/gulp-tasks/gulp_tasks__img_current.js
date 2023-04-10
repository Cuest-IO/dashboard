const gulp = require("gulp");
const filter = require("gulp-filter");
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const tinypngCompress = require("gulp-tinypng-compress");
const flatten = require("gulp-flatten");


module.exports = function(config) {
  const filterForTiny = filter(['**/*.{png,jpg,jpeg}'],
    { restore: true });
  const filterForImageMin = filter(['**/*.{svg,gif}'],
    { restore: true });

  return gulp.src(config.private.images)
    .pipe(filterForImageMin)
    .pipe(imagemin({
      progressive: true,
      use: [imageminPngquant()],
    }))
    .pipe(filterForImageMin.restore)
    .pipe(filterForTiny)
    .pipe(tinypngCompress({
      key: config.key.tiny,
      summarise: true,
      log: true,
    }))
    .pipe(filterForTiny.restore)
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(`${config.public.images}`));
}
