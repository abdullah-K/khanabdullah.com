const { src, dest, watch, series } = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  prefix = require("gulp-autoprefixer"),
  data = require("gulp-data"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel")
  path = require("path"),
  fs = require("fs")

const paths = {
  dist: "./dist/",
  src: "./src/",
  sass: "./src/sass/",
  assets: "./src/assets/",
  scripts: "./src/js/",
  data: "./src/_data/"
}

function html() {
  return src("./src/*.pug")
    .pipe(data((file) => {
      return JSON.parse(fs.readFileSync(paths.data + path.basename(file.path) + ".json"))
    }))
    .pipe(pug())
    .on("error", (err) => {
      process.stderr.write(err.message + "\n")
      this.emit("end")
    })
    .pipe(dest(paths.dist))
}

function styles() {
  return src([paths.sass + "styles.sass", paths.sass + "includes/*"])
    .pipe(sass({
      includePaths: [paths.sass],
      errLogToConsole: true,
      outputStyle: "compressed",
      onError: browserSync.notify,
    }))
    .pipe(prefix())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist + "css/"))
    .pipe(browserSync.stream())
}

function assets() {
  return src(paths.assets + "**/*")
    .pipe(dest(paths.dist + "assets/"))
}

function scripts() {
  return src(paths.scripts + "*")
    .pipe(babel({
      "presets": ["@babel/env"]
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist + "js/"))
}

function watchAndServe() {
  browserSync.init({
    server: paths.dist,
    port: 8888
  })

  watch(paths.sass + "**/*.sass", styles)
  watch(paths.src + "*.pug", html)
  watch(paths.data + "*.json", html)
  watch(paths.assets + "*", assets)
  watch(paths.scripts + "*", scripts)
  watch(paths.dist + "*.html").on("change", browserSync.reload)
}

exports.html = html
exports.styles = styles
exports.watch = watchAndServe
exports.default = process.argv.includes("--dev") && !process.argv.includes("--prod") ? series(html, styles, scripts, assets, watchAndServe) : series(html, styles, scripts, assets)
