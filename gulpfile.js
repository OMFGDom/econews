let gulp = require('gulp')
    sass = require('gulp-sass')
    browserSync = require('browser-sync')
    concat = require('gulp-concat')
    uglify = require('gulp-uglify-es').default
    cleancss = require('gulp-clean-css')
    svgSprite = require('gulp-svg-sprite')
    autoprefixer = require('gulp-autoprefixer')
    rsync = require('gulp-rsync')
    newer = require('gulp-newer')
    rename = require('gulp-rename')
    responsive = require('gulp-responsive')
    del = require('del')


// Local Server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        online: true,
        // online: false, // Work offline without internet connection
        // tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
    })
});

function bsReload(done) {
    browserSync.reload();
    done();
};

// Custom Styles
gulp.task('styles', function () {
    return gulp.src('app/sass/default/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(cleancss({level: {2: {specialComments: 0, restructureRules: true}}})) // Optional. Comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

// Scripts & JS Libraries
gulp.task('scripts', function () {
    return gulp.src([
        // 'node_modules/jquery/dist/jquery.min.js', // Optional jQuery plug-in (npm i --save-dev jquery)
        'app/js/functions.js',
        'app/js/_custom.js',
        'app/js/libs/splide.min.js', // Custom scripts. Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Minify js (opt.)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

// Responsive Images
var quality = 95; // Responsive images quality

// Produce @1x images

gulp.task('img', function () {
    return gulp.src('app/images/*').pipe(browserSync.reload({stream: true}))
});

gulp.task('svgSprite', function () {
    return gulp.src('app/images/icons/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('app/images/'));
});


// Clean @*x images's
gulp.task('cleanimages', function () {
    return del(['app/images/@*'], {force: true})
});

// Code & Reload
gulp.task('code', function () {
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({stream: true}))
});

// Deploy
gulp.task('rsync', function () {
    return gulp.src('app/')
        .pipe(rsync({
            root: 'app/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Included files
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
});

gulp.task('watch', function () {
    gulp.watch('app/sass/default/*.scss', gulp.parallel('styles'));
    gulp.watch(['libs/**/*.js', 'app/js/_custom.js', 'app/js/pagination-date.js'], gulp.parallel('scripts'));
    gulp.watch('app/**/*.html', gulp.parallel('code'));
    gulp.watch('app/images/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));
