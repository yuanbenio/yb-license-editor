'use strict';

import gulp from 'gulp';
import del from 'del';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import flatten from 'gulp-flatten';
import browserSyncModule from 'browser-sync';
import sass from 'gulp-sass';
import inject from 'gulp-inject';
import series from 'stream-series';

let srcPath = 'src';
let distPath = 'dist';
let servePath = 'tmp';
let demoPath = 'demo';

let browserSync = browserSyncModule.create();
let pluginJsStream = null;
let pluginCssStream = null;
let demoJsStream = null;
let demoCssStream = null;


gulp.task('clean', () => {
    del(servePath);
    del(distPath);
});

gulp.task('build', ['clean'], () => {

    // 1. Build plugin

    gulp.src(srcPath + '/images/**/*')
        .pipe(gulp.dest(distPath + '/images'));

    pluginCssStream = gulp.src(srcPath + '/sass/jquery.yb-license-editor.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(distPath));

    pluginJsStream = gulp.src(srcPath + '/js/jquery.yb-license-editor.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(flatten())
        .pipe(gulp.dest(distPath));


    // 2. Build demo

    demoCssStream = gulp.src(srcPath + '/demo.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(demoPath));

    demoJsStream = gulp.src(srcPath + '/demo.js')
        .pipe(flatten())
        .pipe(gulp.dest(demoPath))
        .pipe(browserSync.stream());


    let jqueryStream = gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest(demoPath));

    gulp.src(srcPath + '/index.html')
        .pipe(inject(series(jqueryStream, pluginJsStream, demoJsStream), {ignorePath: '/' + demoPath, addRootSlash: false}))
        .pipe(inject(series(pluginCssStream, demoCssStream), {ignorePath: '/' + demoPath, addRootSlash: false}))
        .pipe(gulp.dest(demoPath));

});

gulp.task('serve', ['watch:html'], () => {

    browserSync.init({
        server: {
            baseDir: './' + servePath
        }
    });

    gulp.watch( srcPath + '/**/*.scss', ['watch:sass']);
    gulp.watch( srcPath + '/**/*.js', ['watch:js']);
    gulp.watch( srcPath + '/**/*.html', ['watch:html']);

});

gulp.task('watch:sass', () => {
    pluginCssStream = gulp.src(srcPath + '/sass/jquery.yb-license-editor.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(servePath))
        .pipe(browserSync.stream());

    demoCssStream = gulp.src(srcPath + '/demo.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(servePath))
        .pipe(browserSync.stream());
});

gulp.task('watch:js', () => {

    pluginJsStream = gulp.src(srcPath + '/js/**/*.js')
        .pipe(flatten())
        .pipe(gulp.dest(servePath))
        .pipe(browserSync.stream());

    demoJsStream = gulp.src(srcPath + '/demo.js')
        .pipe(flatten())
        .pipe(gulp.dest(servePath))
        .pipe(browserSync.stream());
});

gulp.task('watch:image', () => {
    gulp.src(srcPath + '/images/**/*')
        .pipe(gulp.dest(servePath + '/images'));
});

gulp.task('watch:html', ['watch:sass', 'watch:js', 'watch:image'], () => {

    let jqueryStream = gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest(servePath));

    gulp.src(srcPath + '/index.html')
        .pipe(inject(series(jqueryStream, pluginJsStream, demoJsStream), {ignorePath: '/' + servePath, addRootSlash: false}))
        .pipe(inject(series(pluginCssStream, demoCssStream), {ignorePath: '/' + servePath, addRootSlash: false}))
        .pipe(gulp.dest(servePath))
        .pipe(browserSync.stream());


});
