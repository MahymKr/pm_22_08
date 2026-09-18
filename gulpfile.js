const { src, dest, parallel, watch } = require('gulp');

const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const GulpCleanCss = require('gulp-clean-css');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

//Tasks
//Lab1
function html()
{
    return src('src/app/index.html')
    .pipe(fileInclude({prefix: '@@', basepath: '@file'}))

    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function css()
{
    return src('src/app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(GulpCleanCss())

    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function js()
{
    return src('src/app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(terser())

    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

async function imgs() {
  const imagemin = (await import('gulp-imagemin')).default;

  return src('src/app/imgs/**/*', { encoding: false })
    .pipe(imagemin())

    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream());
}

function browser()
{
    browserSync.init(
    {
        server: {baseDir: 'dist'},
        notify: false
    });
}
//Lab2
function copyBootstrapCss()
{
  return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest('dist/css'));
}

function copyBootstrapJS()
{
  return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(dest('dist/js'));
}

//Watcher
function watcher()
{
    watch('src/app/**/*.html', html);
    watch('src/app/scss/**/*.scss', css);
    watch('src/app/js/**/*.js', js);
    watch('src/app/imgs/**/*', imgs);
}

//Export
exports.default = parallel
(
    html,
    css,
    js,
    imgs,
    browser,
    copyBootstrapCss,
    copyBootstrapJS,
    watcher
)