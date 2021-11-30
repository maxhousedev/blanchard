// input
// sources folder
const sourcesFolder = 'src';
// output
// developers build
const devFolder = 'build';
// public
const publicFolder = 'public';

const folder = {
  // template
  template: 'template',
  // scss
  scss: 'scss',
  // js
  js: 'js',
  // js/modules
  modulesJS: 'modules',
  // libs
  libs: 'libs',
  // img to be used
  img: 'img',
  // not optimized img
  imgNotOptimized: 'imgNotOptimized',
  // svg
  svg: 'svg',
  // svg sprite
  spriteSVG: 'sprite',
  // fonts to be used
  fonts: 'fonts',
  // ttf fonts
  fontsTTF: 'fontsTTF',
};

// file names
const fileName = {
  // main js
  mainJS: 'main.js',
  // common libs js
  libsJS: 'libs.js',
  // common modules js
  moduleJS: 'module.js',
  // templates js
  templateJS: 'template.js',
  // app js
  appJS: 'app.js',
  // app js
  appMinJS: 'app.min.js',
  // sprite.svg
  spriteSVG: 'sprite.svg',
};

// paths
const path = {
  // sources
  src: {
    root: `${sourcesFolder}/`,
    // html files
    html: `${sourcesFolder}/*.html`,
    // scss files
    scss: `${sourcesFolder}/${folder.scss}/*.scss`,
    // js files
    js: `${sourcesFolder}/${folder.js}`,
    // user's modules
    modulesJS: `${sourcesFolder}/${folder.js}/${folder.modulesJS}/*.js`,
    // libs js files
    libsJS: `${sourcesFolder}/${folder.libs}/**/*.js`,
    // template js files
    templateJS: `${sourcesFolder}/${folder.template}/**/*.js`,
    // images
    img: `${sourcesFolder}/${folder.img}/**/*.+(jpg|jpeg|png|gif|webp)`,
    // not optimized images
    imgNotOptimized: `${sourcesFolder}/${folder.imgNotOptimized}/**/*.+(jpg|jpeg|png|gif|webp)`,
    // svg
    // single svg files
    svg: `${sourcesFolder}/${folder.svg}/*.svg`,
    // svg files to sprite
    spriteSVG: `${sourcesFolder}/${folder.svg}/${folder.spriteSVG}/*.svg`,
    // fonts
    // fonts files
    fonts: `${sourcesFolder}/${folder.fonts}/*.+(woff|woff2|ttf|eot|svg)`,
    // ttf fonts
    fontsTTF: `${sourcesFolder}/${folder.fontsTTF}/*.ttf`,
  },
  // output
  // developers build
  build: {
    // html files
    html: `${devFolder}/`,
    // css file
    css: `${devFolder}/css/`,
    // js files
    js: `${devFolder}/js/`,
    // images
    img: `${devFolder}/img/`,
    // svg
    svg: `${devFolder}/svg/`,
    // fonts
    fonts: `${devFolder}/fonts/`,
  },
  // public
  public: {
    // html files
    html: `${publicFolder}/`,
    // css file
    css: `${publicFolder}/css/`,
    // js files
    js: `${publicFolder}/js/`,
    // images
    img: `${publicFolder}/img/`,
    // svg
    svg: `${publicFolder}/svg/`,
    // fonts
    fonts: `${publicFolder}/fonts/`,
  },
  // watch
  watch: {
    // html files
    html: `${sourcesFolder}/*.html`,
    templateHTML: `${sourcesFolder}/${folder.template}/**/*.html`,
    // scss files
    scss: `${sourcesFolder}/${folder.scss}/**/*.scss`,
    templateSCSS: `${sourcesFolder}/${folder.template}/**/*.scss`,
    libsSCSS: `${sourcesFolder}/${folder.libs}/**/*.scss`,
    // js files
    mainJS: `${sourcesFolder}/${folder.js}/${fileName.mainJS}`,
    modulesJS: `${sourcesFolder}/${folder.js}/${folder.modulesJS}/**/*.js`,
    libsJS: `${sourcesFolder}/${folder.libs}/**/*.js`,
    templatesJS: `${sourcesFolder}/${folder.template}/**/*.js`,
    // images
    img: `${sourcesFolder}/${folder.img}/**/*.+(jpg|png|gif|webp)`,
    // svg
    svg: `${sourcesFolder}/${folder.svg}/**/*.svg`,
  },
  // clean
  clean: {
    // developers build
    build: `./${devFolder}/`,
    // public
    public: `./${publicFolder}/`,
  },
};

// gulp
const { src, dest, series, parallel, watch } = require('gulp');
// extensions
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
// html
const HTMLmin = require('gulp-htmlmin');
// css, scss
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
// js
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const babel = require('gulp-babel');
// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// svg
const svgSprite = require('gulp-svg-sprite');
// fonts
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
//* ----------------------------
//* functions
//* ----------------------------
// call browser-sync
// serving from dev
const callBrowserSync = () => {
  browserSync.init({
    // server settings
    server: {
      // base dir dev folder
      baseDir: path.build.html,
      // false - without internet
      online: true,
    },
    // default
    browser: 'chrome', // choose browser
    host: 'localhost',
    port: 3000,
    notify: false,
  });
  browserSync.reload();
};
// serving from public
const callBrowserSyncFromPublic = () => {
  browserSync.init({
    // server settings
    server: {
      // base dir public folder
      baseDir: path.public.html,
      // false - without internet
      online: true,
    },
    // default
    host: 'localhost',
    port: 3000,
    notify: false,
  });
  browserSync.reload();
};
//* ----------------------------
//* dev build
//* ----------------------------
// build html files
const buildHTML = () =>
  // path to source folder
  src(path.src.html)
    // build html files
    .pipe(fileInclude())
    // upload to output folder
    .pipe(dest(path.build.html))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
// build css files
const buildCSS = () =>
  // path to source folder
  src(path.src.scss)
    // scss to css
    .pipe(
      scss({
        outputStyle: 'expanded',
      })
    )
    // group media queries
    .pipe(groupMediaQueries())
    // add autoprefix
    .pipe(
      autoprefixer()
      // file  .browserslistrc used
    )
    // upload css to output folder
    .pipe(dest(path.build.css))
    // clean and compress css
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    // rename compressed css to min.css
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    // upload min.css to output folder
    .pipe(dest(path.build.css))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
// build js files
// build template js
const buildTemplateJS = () =>
  // path to template js files
  src(path.src.templateJS, {
    allowEmpty: true,
  })
    // concat to common js file
    .pipe(concat(fileName.templateJS))
    // upload js to output folder
    .pipe(dest(path.src.js));
// build libs js
const buildLibsJS = () =>
  // path to libs js files
  src(path.src.libsJS, {
    allowEmpty: true,
  })
    // concat to common js file
    .pipe(concat(fileName.libsJS))
    // upload js to output folder
    .pipe(dest(path.build.js));
// build modules js
const buildModulesJS = () =>
  // path to modules js files
  src(path.src.modulesJS, {
    allowEmpty: true,
  })
    // concat to common js file
    .pipe(concat(fileName.moduleJS))
    // upload js to output folder
    .pipe(dest(path.src.js));

// build js
const buildJS = () =>
  // path to source folder
  src(
    [
      `${path.src.js}/${fileName.moduleJS}`,
      `${path.src.js}/${fileName.templateJS}`,
      `${path.src.js}/${fileName.mainJS}`,
    ],
    {
      allowEmpty: true,
    }
  )
    // concat
    .pipe(concat(fileName.appJS))
    // babel
    .pipe(
      babel()
      // file .babelrc used
    )
    // upload js to output folder
    .pipe(dest(path.build.js))
    // compress js
    .pipe(
      uglify({
        toplevel: true,
      }).on('error', notify.onError())
    )
    // rename compressed js to min.js
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    // upload min.js to output folder
    .pipe(dest(path.build.js))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
// images
// optimize images
const images = () =>
  // path to source folder
  src(path.src.imgNotOptimized)
    .pipe(
      // convert images to webp
      webp({
        quality: 70,
      })
    )
    // upload to img folder
    .pipe(dest(`${path.src.root + folder.img}/`))
    .pipe(src(path.src.imgNotOptimized))
    // optimize images
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    // upload to img folder
    .pipe(dest(`${path.src.root + folder.img}/`));
// build images
const buildImages = () =>
  // path to source folder
  src(path.src.img)
    // upload to output folder
    .pipe(dest(path.build.img))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
// svg
// svg sprite
const sprite = () =>
  // path to source folder
  src(path.src.spriteSVG)
    .pipe(
      svgSprite({
        mode: {
          stack: {
            // sprite file name
            sprite: `../${fileName.spriteSVG}`,
          },
        },
      })
    )
    // upload to output folder
    .pipe(dest(`${path.src.root + folder.svg}/`));
// build svg
const buildSVG = () =>
  // path to source folder
  src(path.src.svg)
    // upload to output folder
    .pipe(dest(path.build.svg))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
// fonts
// convert fonts ttf to woff and woff2
const fonts = () => {
  src(path.src.fontsTTF)
    .pipe(ttf2woff())
    .pipe(dest(`${path.src.root + folder.fonts}/`));
  return src(path.src.fontsTTF)
    .pipe(ttf2woff2())
    .pipe(dest(`${path.src.root + folder.fonts}/`));
};
// build fonts
const buildFonts = () =>
  // path to source folder
  src(path.src.fonts)
    // upload to output folder
    .pipe(dest(path.build.fonts))
    // inject changes without refreshing the page
    .pipe(browserSync.stream());
//* ----------------------------
//* public
//* ----------------------------
// html files
const publicHTML = () =>
  // path to source folder
  src(`${path.build.html}*.html`)
    // minify HTML
    .pipe(
      HTMLmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    // upload to output folder
    .pipe(dest(path.public.html));
// css files
const publicCSS = () =>
  // path to source folder
  src(`${path.build.css}*.min.css`)
    // upload to output folder
    .pipe(dest(path.public.css));
// build js files
const publicJS = () =>
  // path to source folder
  src([path.build.js + fileName.libsJS, path.build.js + fileName.appMinJS], {
    allowEmpty: true,
  })
    // upload to output folder
    .pipe(dest(path.public.js));
// images
const publicImages = () =>
  // path to source folder
  src(`${path.build.img}/**/*.*`)
    // upload to output folder
    .pipe(dest(path.public.img));
// build svg
const publicSVG = () =>
  // path to source folder
  src(`${path.build.svg}*.svg`)
    // upload to output folder
    .pipe(dest(path.public.svg));
// build fonts
const publicFonts = () =>
  // path to source folder
  src(`${path.build.fonts}*.*`)
    // upload to output folder
    .pipe(dest(path.public.fonts));
// watch
const watchFiles = () => {
  watch([path.watch.html, path.watch.templateHTML], buildHTML);
  watch(
    [path.watch.scss, path.watch.templateSCSS, path.watch.libsSCSS],
    buildCSS
  );
  watch(path.watch.mainJS, buildJS);
  watch(path.watch.templatesJS, series(buildTemplateJS, buildJS));
  watch(path.watch.modulesJS, series(buildModulesJS, buildJS));
  watch(path.watch.libsJS, series(buildLibsJS, buildJS));
  watch([path.watch.svg], buildSVG);
  watch([path.watch.img], buildImages);
};
// clean
// clean developers build
const cleanBuild = () => del(path.clean.build);
// clean public build
const cleanPublic = () => del(path.clean.public);
// build
// developers build by default
const build = series(
  cleanBuild,
  buildHTML,
  buildTemplateJS,
  buildModulesJS,
  buildLibsJS,
  parallel(buildCSS, buildJS, buildImages, buildSVG, buildFonts)
);
// public
const prod = series(
  cleanPublic,
  parallel(
    publicHTML,
    publicCSS,
    publicJS,
    publicImages,
    publicSVG,
    publicFonts
  ),
  callBrowserSyncFromPublic
);
// watch
const watchProject = series(build, parallel(watchFiles, callBrowserSync));

// exports
exports.build = build;
exports.prod = prod;

exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.cleanBuild = cleanBuild;
exports.cleanPublic = cleanPublic;
exports.default = watchProject;
