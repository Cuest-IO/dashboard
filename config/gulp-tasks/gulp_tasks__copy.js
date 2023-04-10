const gulp = require("gulp");
const flatten = require("gulp-flatten");

module.exports = function (config) {
  return gulp.src(config.private.copy)
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(config.public.copy));
};
