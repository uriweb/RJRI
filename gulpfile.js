var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var header = require('gulp-header');


// options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed' //expanded, nested, compact, compressed
};

// JS concat, strip debugging and minify
gulp.task('scripts', scripts);

function scripts(done) {
	gulp.src('./src/js/*.js')
    .pipe(jshint(done))
    .pipe(jshint.reporter('default'));
	gulp.src('./src/js/*.js')
    .pipe(concat('script.min.js'))
    //.pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
    
	done();
 // console.log('scripts ran');
}

// CSS concat, auto-prefix and minify
gulp.task('styles', styles);

function styles(done) {

	var pkg = require('./package.json');
	var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.authorHuman %>',
  ' * License: <%= pkg.license %>',
  ' * License URI: <%= pkg.licenseURI %>',
  '',
  '*/',
  ''].join('\n')


	gulp.src('./src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(concat('style.css'))
        .pipe(postcss([ autoprefixer() ]))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest('.'));

  done();
  //console.log('styles ran');
}


// CSS concat, auto-prefix and minify
// this is for an alternate stylesheet (2 options)
gulp.task('styles2', styles);
function styles2(done) {

	var pkg = require('./package.json');
	var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.authorHuman %>',
  ' * License: <%= pkg.license %>',
  ' * License URI: <%= pkg.licenseURI %>',
  '',
  '*/',
  ''].join('\n')


	gulp.src('./src2/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(concat('style2.css'))
		.pipe(postcss([ autoprefixer() ]) )
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(sourcemaps.write('./map2'))
		.pipe(gulp.dest('.'));

  done();
  //console.log('styles2 ran');
}

// CSS concat, auto-prefix and minify
// this is for an alternate stylesheet (2 options)
gulp.task('styles3', styles);
function styles3(done) {

	var pkg = require('./package.json');
	var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.authorHuman %>',
  ' * License: <%= pkg.license %>',
  ' * License URI: <%= pkg.licenseURI %>',
  '',
  '*/',
  ''].join('\n')


	gulp.src('./src3/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(concat('style3.css'))
		.pipe(postcss([ autoprefixer() ]) )
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(sourcemaps.write('./map3'))
		.pipe(gulp.dest('.'));

  done();
  //console.log('styles3 ran');
}


// minify new images
gulp.task('images', images);

function images(done) {
  var imgSrc = './src/images/**/*',
      imgDst = './images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
	done();
  //console.log('images ran');
}

// watch
gulp.task('watcher', watcher);

function watcher(done) {
	// watch for JS changes
	gulp.watch('./src/js/*.js', scripts);

	// watch for CSS changes
	gulp.watch('./src/sass/**/*', styles);

	// watch for CSS changes
	gulp.watch('./src2/sass/**/*', styles2);

	// watch for CSS changes
	gulp.watch('./src3/sass/**/*', styles3);

	// watch for image changes
	gulp.watch('./src/images/**/*', images);

	done();
}

gulp.task( 'default',
	gulp.parallel('images', 'scripts', 'styles', 'styles2', 'styles3', 'watcher', function(done){
		done();
	})
);


function done() {
	console.log('done');
}