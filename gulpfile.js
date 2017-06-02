var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    image = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence');

/*
==================================================================
   Keep localTesting DISABLED unless you want to use it. With it enabled, gulp will copy the build to distPath.
*/

var packageName = "blog";
var localTesting = true; 
var distPath = "D:/xampp/htdocs/" + packageName + "/";

/*
==================================================================
*/

gulp.task('actuallyBuild', function() {
    if(localTesting) {  
        return gulp.src('_site/**/*')
            .pipe(gulp.dest(distPath));
    } else {
        return gulp.src('_site/**/*')
            .pipe(gulp.dest("."));
    }
});


gulp.task('build', function() {
    runSequence('html', 'styles', 'images', 'scripts');
});

gulp.task('watch', function() {
    if(localTesting) {
        gulp.watch('_site/**/*', function() { runSequence('html', 'html-local'); });
        gulp.watch('docs/_stylesheets/**/*.scss', function() { runSequence('styles', 'styles-local'); });
        gulp.watch('docs/media/*', function() { runSequence('images', 'images-local'); });
        //gulp.watch('src/_site/scripts/*.js', function() { runSequence('scripts', 'scripts-local'); });
    } else {
        gulp.watch('docs/*.html', ['html']);
        gulp.watch('docs/_stylesheets/**/*.scss', ['styles']);
        gulp.watch('docs/media/*', ['images']);
        //gulp.watch('src/_site/scripts/*.js', ['scripts']);
    }
});

gulp.task('html', function() {
    return gulp.src('docs/_site/**/*')
        .pipe(gulp.dest("."));
});

gulp.task('html-local', function() {
    return gulp.src('_site/**/*.html')
        .pipe(gulp.dest(distPath));
});

gulp.task('styles', function() {
    return sass('docs/_stylesheets/compositions/*.scss', {style: 'Expanded'})
            .pipe(autoprefixer('last 2 version'))
            .pipe(gulp.dest('css/'))
            .pipe(gulp.dest('docs/css/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglifycss({ "max-line-len": 40 }))
            .pipe(gulp.dest('css/'))
            .pipe(gulp.dest('docs/css/'));
});

gulp.task('styles-local', function() {
    return gulp.src("css/*.css")
        .pipe(gulp.dest(distPath + 'css/'));
});



gulp.task('scripts', function() {
    return gulp.src('scripts/*.js')
        .pipe(gulp.dest("scripts/"))
        .pipe(concat("main.js"))
        .pipe(gulp.dest("scripts/"))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("scripts/"));
});

gulp.task('scripts-local', function() {
    return gulp.src('scripts/*.js')
            .pipe(gulp.dest(distPath + 'scripts/'));
});

gulp.task('images', function() {
    return gulp.src("_preMedia/*")
        .pipe(image({
          pngquant: true,
          optipng: true,
          zopflipng: true,
          advpng: false,
          jpegRecompress: true,
          jpegoptim: true,
          mozjpeg: true,
          gifsicle: false,
          svgo: false
        }))
       .pipe(gulp.dest('media/'));
});

gulp.task('images-local', function() {
    return gulp.src('media/*')
            .pipe(gulp.dest(distPath + 'media/'));
});