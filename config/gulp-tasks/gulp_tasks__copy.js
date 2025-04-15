import gulp from "gulp";
import flatten from "gulp-flatten";

export default function (config) {
  return gulp.src(config.private.copy)
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(config.public.copy));
};
