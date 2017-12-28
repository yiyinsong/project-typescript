const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const ts = require('gulp-typescript');
const tsc = ts.createProject('tsconfig.json');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

gulp.task('scripts', function() {
    return tsc.src()
        .pipe($.plumber())
            .pipe(tsc())
            .js.pipe($.uglify())
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('imgMove', function() {
    return gulp.src('src/**/*.[jpg|gif|png]')
        .pipe($.flatten())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    browserSync.init({
        files: ['dist/**/*.js'],
        server: {
            baseDir: './'
        },
        port: 8080
    });
    gulp.watch('src/**/*.ts' , ['scripts']);
    gulp.watch('src/**/*.[jpg|gif|png]', ['imgMove']);
});

gulp.task('default', ['watch']);