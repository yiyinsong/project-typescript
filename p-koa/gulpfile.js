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
        .js.pipe(gulp.dest('build/dist'))
        .pipe($.uglify())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('build/dist'));
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.cleanCss())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('server', function() {
    $.nodemon({
        script: 'build/dist/app.min.js',
        ignore: [
            "build/**/*.*",
            "views/**/*.*",
            "node_modules/",
        ],
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() {
        browserSync.init({
            proxy: 'http://syy.jdhui.com:3000',
            files: ['build/**/*.*', 'views/**/*.*'],
            port: 8081, 
            notify: false
        }, function() {
            console.log('---------------ok---------------');
        });
    });
    gulp.watch('app/src/**/*.ts' , ['scripts']);
    gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['server']);