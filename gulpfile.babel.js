'use strict';

import gulp from 'gulp';
import del from 'del';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import flatten from 'gulp-flatten';

let srcPath = 'src';
let distPath = 'dist';

gulp.task('clean', () => {
    return del(distPath);
});

gulp.task('build', ['clean'], () => {

    gulp.src(srcPath + '/images/**/*')
        .pipe(gulp.dest(distPath + '/images'));

    gulp.src(srcPath + '/**/*.css')
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(distPath));

    gulp.src(srcPath + '**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(flatten())
        .pipe(gulp.dest(distPath));
});