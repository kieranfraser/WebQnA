const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const browserSync = require('browser-sync');
const tslint = require('gulp-tslint');
var sass = require('gulp-sass');
const reload = browserSync.reload;

const paths = {
    dist: 'public/dist/app',
    distview: 'public/views',
    distStyle: 'public/stylesheets',
    distFiles: 'public/dist/**/*',
    srcFiles: 'dev/**/*',
    srcTsFiles: 'dev/**/*.ts',
    srcSass: 'dev/assests/**.scss',
    srcHTML: 'dev/views/**/**.html'
}

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(paths.distFiles);
});
gulp.task('sass-copy:css', function () {
    return gulp.src(paths.srcSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(distStyle));
});
// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
    return gulp.src([paths.srcFiles, '!' + paths.srcTsFiles])
        .pipe(gulp.dest(paths.dist))
});

// copy static angular html templates
gulp.task('copy:views', ['clean'], function() {
    return gulp.src([paths.srcHTML])
        .pipe(gulp.dest(paths.distview))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.js',
            'node_modules/angular2-jwt/angular2-jwt.js',
            'node_modules/moment/moment.js',
            'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js'
        ])
        .pipe(gulp.dest('public/dist/lib'))
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
    return gulp
        .src(paths.srcTsFiles)
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.dist));
});

// linting
gulp.task('tslint', function(){
    return gulp.src(paths.srcTsFiles)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

// Run browsersync for development
gulp.task('serve', ['build'], function() {
   // browserSync({
    //    server: {
    //        baseDir: paths.dist
    //    }
    //});

    gulp.watch(paths.srcFiles, ['buildAndReload']);
});


gulp.task('build', [ 'clean', 'compile', 'copy:libs', 'copy:assets', 'copy:views', 'sass-copy:css']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['serve']);