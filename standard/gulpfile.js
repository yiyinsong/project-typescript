const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const ts = require('gulp-typescript');
const tsc = ts.createProject('tsconfig.json');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

gulp.task('scripts', () => {
    return tsc.src()
            .pipe(tsc())
            .js.pipe($.uglify())
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest("dist"));
});

gulp.task('watch', () => {
    browserSync.init({
        files: ['dist/**/*.js'],
        server: {
            baseDir: './'
        },
        port: 8080
    });
    gulp.watch('src/**/*.ts' , ['scripts']);
});

gulp.task('default', ['watch']);