const { src, dest, watch, series } = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  prefix = require("gulp-autoprefixer"),
  data = require("gulp-data"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  streamqueue = require("streamqueue"),
  mergeJSON = require("gulp-merge-json"),
  fs = require("fs")

const paths = {
  dist: "./dist/",
  src: "./src/",
  sass: "./src/sass/",
  assets: "./src/assets/",
  scripts: "./src/js/",
  data: "./src/_data/",
}

function json() {
  let enStream = src([paths.data + '*.json', "!" + paths.data + "index-fr.json"])
    .pipe(mergeJSON())
    .pipe(rename("data-en.json"))

  let frStream = src([paths.data + '*.json', "!" + paths.data + "index-en.json"])
    .pipe(mergeJSON())
    .pipe(rename("data-fr.json"))
    

  return streamqueue({ objectMode: true }, enStream, frStream)
  .pipe(dest(paths.data + "merged/"))
}

function html() {
  let enStream =
    src("./src/*.pug")
      .pipe(data((file) => {
        return JSON.parse(fs.readFileSync(paths.data + "merged/data-en.json"))
      }))
      .pipe(pug())
      .on("error", (err) => {
        process.stderr.write(err.message + "\n")
      })
      .pipe(rename("index-en.html"))

  let frStream =
    src("./src/*.pug")
      .pipe(data((file) => {
        return JSON.parse(fs.readFileSync(paths.data + "merged/data-fr.json"))
      }))
      .pipe(pug())
      .on("error", (err) => {
        process.stderr.write(err.message + "\n")
      })
      .pipe(rename("index-fr.html"))
  return streamqueue({ objectMode: true }, enStream, frStream)
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
    .pipe(prefix('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist + "css/"))
    .pipe(browserSync.stream())
}

function assets() {
  return src(paths.assets + "**/*")
    .pipe(dest(paths.dist + "assets/"))
}

function scripts() {
  let jsStream =
    src([paths.scripts + "helpers.js", paths.scripts + "*.js"])
      .pipe(babel({
        "presets": ["@babel/env"]
      }))
      .pipe(uglify())

  return streamqueue({ objectMode: true }, src(paths.scripts + "lib/three.min.js"), src(paths.scripts + "lib/vanta.waves.min.js"), jsStream)
    .pipe(concat('bundle.min.js'))
    .pipe(dest(paths.dist + "js/"))
}

function watchAndServe() {
  browserSync.init({
    server: paths.dist,
    port: 8888,
    index: "index-en.html"
  })

  watch(paths.sass + "**/*.sass", styles)
  watch(paths.src + "**/*.pug", html)
  watch(paths.data + "*.json", json)
  watch(paths.assets + "*", assets)
  watch(paths.scripts + "**/*.js", scripts)
  watch(paths.dist + "*.html").on("change", browserSync.reload)
}

exports.html = html
exports.styles = styles
exports.watch = watchAndServe
exports.default = process.argv.includes("--dev") && !process.argv.includes("--prod") ? series(json, html, styles, scripts, assets, watchAndServe) : series(json, html, styles, scripts, assets)
