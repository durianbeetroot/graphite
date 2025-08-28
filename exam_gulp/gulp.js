////////////////////////////////
// Setup
////////////////////////////////

// Gulp and package
const { src, dest, parallel, series, watch } = require("gulp");

// Plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");

/* for development */
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
/* js babel */
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

/* .env TODO: read the file */
const dotenv = require("dotenv").config();
const productionMode = process.env.NODE_ENV === "production";

/* browserify / babel / uglify / sass */
const browserify = require("browserify");
const babelify = require("babelify");
const uglify = require("gulp-uglify");
const sassCompiler = require("sass");
const gulpSass = require("gulp-sass")(sassCompiler);

// Paths TODO: with proper path
const paths = {
  css: "./dist/css",
  sass: "./src/sass",
  js: {
    src: "./src/js",
    dest: "./dist/js"
  }
};

////////////////////////////////
// Tasks (Complete the missing parts)
////////////////////////////////

// JavaScript Task
function scripts() {
  return browserify({
    entries: `${paths.js.src}/project.js`,
    debug: !productionMode
  })
    .transform(
      babelify,
      {
        presets: ["@babel/preset-env"],
        sourceMaps: !productionMode
      }
    )
    .bundle()
    .pipe(source("project.js"))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulpif(!productionMode, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(productionMode, uglify()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpif(!productionMode, sourcemaps.write("./")))
    .pipe(dest(paths.js.dest));
}

// SCSS Task
function styles() {
  const processCss = [
    autoprefixer(),
  ];

  const minifyCss = [
    cssnano({ preset: "default" }), // minify result
  ];

  return src(`${paths.sass}/project.scss`)
    .pipe(gulpif(!productionMode, sourcemaps.init()))
    .pipe(plumber())
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(postcss(processCss))
    .pipe(postcss(minifyCss))
    .pipe(gulpif(!productionMode, sourcemaps.write("./")))
    .pipe(dest(paths.css));
}

// Watch Task
function watchPaths() {
  watch(`${paths.sass}/**/*.scss`, styles);
  watch(`${paths.js.src}/**/*.js`, scripts);
}

// Generate all assets
const generateAssets = parallel(styles, scripts);

exports.default = series(generateAssets, watchPaths);
