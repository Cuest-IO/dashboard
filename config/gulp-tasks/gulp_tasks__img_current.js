import gulp from "gulp";
import flatten from "gulp-flatten";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import tinypngCompress from "gulp-tinypng-compress";
import filter from "gulp-filter";  // Added import for gulp-filter

export default function(config) {
  const filterForTiny = filter(['**/*.{png,jpg,jpeg}'], { restore: true });
  const filterForImageMin = filter(['**/*.{svg,gif}'], { restore: true });
  console.log(config.private.images);

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
