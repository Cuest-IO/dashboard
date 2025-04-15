import gulp from "gulp";
import flatten from "gulp-flatten";

export default function (config) {
  return gulp.src(config.private.images_tmp)
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(config.public.images_tmp));
};
