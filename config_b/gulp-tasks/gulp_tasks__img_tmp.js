const gulp = require("gulp");
const flatten = require("gulp-flatten");

module.exports = function (config) {
  return gulp.src(config.private.images_tmp)
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest(config.public.images_tmp));
};
