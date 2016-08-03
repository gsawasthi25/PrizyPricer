var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var angularTemplatecache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var inject = require('gulp-inject');
var del = require('del');
var runsequence = require('run-sequence');
var rimraf = require('gulp-rimraf');
var buildPath = './src/main/resources/static/assets/';
var jsPath = [ './src/main/resources/static/js/app.js',
		'./src/main/resources/static/js/appCtrl.js',
		'./src/main/resources/static/js/mercuryAnywhereServices.js',
		'./src/main/resources/static/js/meetingViewCtrl.js',
		'./src/main/resources/static/js/infoPackCtrl.js',
		'./src/main/resources/static/js/loading.js' ];
var vendorJsPath = [ "./src/main/resources/static/js/lib/moment.js",
		"./src/main/resources/static/js/lib/moment-timezone.js",
		"./src/main/resources/static/js/lib/angular.js",
		"./src/main/resources/static/js/lib/angular-ui-router.js",
		"./src/main/resources/static/js/lib/svgxuse.min.js",
		"./src/main/resources/static/js/lib/jquery-1.11.3.js",
		"./src/main/resources/static/js/lib/bootstrap.js",
		"./src/main/resources/static/js/lib/bootstrap-submenu.min.js" ];
var cssPath = './src/main/resources/static/css/*.css';
var vendorCssPath = './src/main/resources/static/css/lib/*.css';
var appHtml = './src/main/resources/templates/app.html';
var appHtmlPath = './src/main/resources/templates';
var injectIgnorePath = 'src/main/resources/static/';

// task minify html
gulp.task('minify-html', function() {
	gulp.src('./src/main/resources/static/partials/*.html').pipe(minifyHtml())
			.pipe(gulp.dest('./minified/html'));
});

gulp.task('templatecache', function() {
	gulp.src('./src/main/resources/static/partials/*.html').pipe(minifyHtml())
			.pipe(angularTemplatecache('templates.js', {
				module : 'mercuryAnywhere',
				standalone : false,
				root : 'partials/'
			})).pipe(gulp.dest(buildPath));
});

gulp.task('js', [ 'templatecache' ], function() {
	var source = [].concat(jsPath, buildPath + 'templates.js');
	return gulp.src(source).pipe(concat('app.min.js')).pipe(ngAnnotate({
		add : true,
		single_quotes : true
	})).pipe(uglify({
		mangle : false
	})).pipe(gulp.dest(buildPath));
});

gulp.task('vendorjs', function() {
	return gulp.src(vendorJsPath).pipe(concat('vendor.min.js')).pipe(uglify({
		mangle : false
	})).pipe(gulp.dest(buildPath));
});

// task minify css
gulp.task('css', function() {
	gulp.src(cssPath).pipe(minifyCss()).pipe(concat('app.min.css')).pipe(
			gulp.dest(buildPath));
});

// task minify vendor css
gulp.task('vendorcss', function() {
	gulp.src(vendorCssPath).pipe(minifyCss()).pipe(concat('vendor.min.css'))
			.pipe(gulp.dest(buildPath));
});


gulp.task('inject-minified', [ 'js', 'vendorjs', 'css', 'vendorcss' ],
		function() {
			var minified = buildPath + '*.min.*';
			var minFilter = filter([ '*.min.*' ], {
				restore : true
			});
			var appHtmlFilter = filter([ 'app.html' ], {
				restore : true
			});
			var appHtmlMinified = buildPath;

			var stream = gulp.src([].concat(minified, appHtml)) // add all built
			// min files and
			// app.html
			.pipe(minFilter) // filter the stream to minified css and js
			.pipe(rev()) // create files with rev's
			.pipe(gulp.dest(buildPath)) // write the rev files
			.pipe(minFilter.restore) // remove filter, back to original
			// stream

			// // inject the files into app.html
			.pipe(appHtmlFilter) // filter to app.html
			.pipe(injectMinified('vendor.min.css', 'inject-vendor')).pipe(
					injectMinified('app.min.css')).pipe(
					injectMinified('vendor.min.js', 'inject-vendor')).pipe(
					injectMinified('app.min.js')).pipe(gulp.dest(buildPath))
					.pipe(appHtmlFilter.restore) // remove filter, back to
					// original stream

					// replace the files referenced in app.html with the rev'd
					// files
					.pipe(revReplace()) // Substitute in new filenames
					.pipe(gulp.dest(buildPath)) // write the index.html file
					// changes
					.pipe(rev.manifest()) // create the manifest (must happen
					// last or we screw up the
					// injection)
					.pipe(gulp.dest(buildPath)); // write the manifest

			function injectMinified(path, name) {
				var pathGlob = buildPath + path;
				var options = {
					ignorePath : injectIgnorePath,
					read : false,
					selfClosingTag : true,
					addRootSlash : false
				};
				if (name) {
					options.name = name;
				}
				return inject(gulp.src(pathGlob), options);
			}
		});

gulp.task('clean-all', function() {
	return gulp.src(buildPath + '*.*', {
		read : false
	}).pipe(rimraf());
});

gulp.task('moveTemplate', function() {
	var stream = gulp.src(buildPath + 'app.html').pipe(gulp.dest(appHtmlPath));
});

gulp.task('build', [ 'inject-minified' ], function() {
});

gulp.task('clean', function() {
	return gulp
			.src(
					[ buildPath + '**', '!' + buildPath,
							'!' + buildPath + '*-*.min.*' ], {
						read : false
					}).pipe(rimraf());
});
