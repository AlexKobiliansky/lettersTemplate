var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    browserSync   = require('browser-sync');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist',
        },
        notify: false,
        open: true,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inky())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }));
});

//INLINE CSS
gulp.task('inline', function () {
  return gulp.src('./dist/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/inlined'));
});

gulp.task('code', function() {
    return gulp.src('templates/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

//WATCH
gulp.task('watch',function() {
    gulp.watch('./scss/**/*.scss', gulp.parallel('styles'));
    gulp.watch('./templates/**/*.html', gulp.parallel('inky'));
    gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));