var gulp = require('gulp');
var babel = require('gulp-babel'); // 编译es6
var autoprefixer = require('gulp-autoprefixer'); // 给CSS新增浏览器前缀
var cssmin = require('gulp-clean-css'); // 压缩css文件
var uglify = require('gulp-uglify'); // 压缩丑化js文件
var imagemin = require('gulp-tinypng-nokey'); // 压缩图片
var htmlmin = require('gulp-htmlmin'); // 压缩html文件

// 不做任何处理，从src目录，把文件输出到dist目录，也就是复制操作
gulp.task('copy', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

// 压缩 *.html文件，把src文件夹下面所有后缀为.html的文件进行压缩操作
gulp.task('compress_html', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
});

// 先给*.css添加浏览器前缀，然后压缩 *.css
// autoprefixer会自动读取浏览器列表
gulp.task('compress_css', function () {
  return gulp.src(['src/**/*.css'])
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('dist'))
});

//先编译es6,再压缩js，会读取配置
gulp.task('compress_js', function () {
  return gulp.src(['src/**/*.js']) // 获取.js
    .pipe(babel()) // 编译es6 会自动读取.babelrc里面的配置
    .pipe(uglify()) // 压缩js
    .pipe(gulp.dest('dist'))
});

// 压缩图片
gulp.task('compress_img', function () {
  gulp.src('./src/**/*.{png,jpg,jpeg,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist'))
});

// 暂时去掉了压缩图片的操作
gulp.task('default', gulp.parallel(['compress_html', 'compress_css', 'compress_js']));