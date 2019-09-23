const gulp = require('gulp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");


var jsSRC1 = "index.js";
var jsSRC2 = "display.js";
var jsSRC3 = "specialist.js";
var jsSRC4 = "client.js";



var jsFolder = "src/js/";
var jsFILES = [jsSRC1, jsSRC2, jsSRC3, jsSRC4];

// Logs Message
gulp.task('message', function(done) {
  console.log('Gulp is running...');
  done();
});

// Copy All HTML files
gulp.task('copyHtml', function(done) {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
  done();
})

// Copy All JSON files
gulp.task('copyJson', function(done) {
  gulp.src('src/*.json')
    .pipe(gulp.dest('dist'));
  done();
})

// Optimize Images
gulp.task('imageMin', () =>
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
);

// Compile sass
gulp.task('sass', function(done) {
  gulp.src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', console.error.bind(console)))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
  done();
});


//JS
gulp.task("js", function(done) {
  // gulp.src('src/js/*.js')

  jsFILES.map(function(entry) {
    return browserify({
        entries: [jsFolder + entry]
      })
      .transform(babelify, {
        presets: ["@babel/env"]
      })
      .bundle()
      .pipe(source(entry))
      .pipe(rename({
        extname: ".min.js"
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());

  });
  done();
});

// Serve
gulp.task("serve", function(done) {
  browserSync.init({
    server: "./dist"
  });
  done();
});

gulp.task('watch', function(done) {
  // gulp.watch('src/js/*.js', gulp.series('js'));

  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  gulp.watch('src/*.json', gulp.series('copyJson'));
  gulp.watch(["dist/*.html"]).on("change", browserSync.reload);
  done();
});

gulp.task('default', gulp.series(['message', 'copyJson', 'copyHtml', 'imageMin', 'sass', 'js', 'serve', 'watch']));
