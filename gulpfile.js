const gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  prefixer      = require('autoprefixer'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  path = require('path');
  const { exec } = require("child_process");
  const handler = require('serve-handler');
  const http = require('http');
const postconfig = [
  prefixer({
    grid: true
  })
]
gulp.task('sass', function () {
    return gulp.src('./app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      noCache: true,
      outputStyle: "expanded",
      lineNumbers: true,
      loadPath: './app/**/*',
      sourceMap: true
    })).on('error', function (error) {
      gutil.log(error);
      this.emit('end');
    })
    // .pipe(prefixer())
    .pipe(postcss(postconfig))
    // .pipe(sourcemaps.write('./acf/maps'))
    .pipe(gulp.dest('./app'))
    .pipe(notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }));
  });
  gulp.task('watch', function() {
    gulp.watch('app/**/*.scss', gulp.series('sass'));
  });
  gulp.task('default', gulp.series('sass', 'watch'));

  exec("php -S localhost:8050",(error, stdout, stderr) => {
    
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

require("openurl").open("http://localhost:8050");
