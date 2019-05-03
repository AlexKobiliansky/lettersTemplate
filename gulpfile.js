var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source'),
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

gulp.task('code', function() {
    return gulp.src('./dist/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

//CONVERTE INKY
gulp.task('inky', gulp.series('styles', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }));
}));

//WATCH
gulp.task('watch',function() {
    gulp.watch('./scss/**/*.scss', gulp.parallel('inky'));
    gulp.watch('./templates/**/*.html', gulp.parallel('inky'));
    gulp.watch('./templates/**/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));