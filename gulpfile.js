var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	compass = require('gulp-compass'),
	clean = require('gulp-clean'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync').create();

// Задача с названием 'default' запускается автоматически по команде 'gulp' в консоле.
// Эта конструкция работает синхронно, сначала выполняется задача 'clean' и только после ее завершнения запускается 'dev'.
gulp.task('default', ['clean'], function() {
	gulp.run('dev');
});

// Аналогично с предыдушей задачей.
// Выполняет задача 'clean' и после ее завершения запускается 'build'.
gulp.task('production', ['clean'], function() {
	gulp.run('build');
});

// Задача 'dev' представляется собой сборку в режиме разработки.
// Запускает build - сборку, watcher - слежку за файлами и browser-sync.
gulp.task('dev', ['build', 'watch', 'browser-sync']);

// Задача 'build' представляет собой сборку в режиме продакшен.
// Собирает проект.
gulp.task('build', ['html', 'styles', 'scripts', 'img', 'fonts', 'libs']);

// Задача 'watch' следит за всеми нашими файлами в проекте и при изменении тех или иных перезапустает соответсвующую задачу.
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['styles']); //стили
    gulp.watch('app/js/**/*.js', ['scripts']); //скрипты
	gulp.watch('app/libs/**/*.*', ['libs']); //библиотеки
    gulp.watch('app/*.html', ['html']); // html
    gulp.watch('./app/img/**/*.*', ['img']); //наши локальные файлы(картинки)
	gulp.watch('./app/fonts/**/*.*', ['fonts']); //наши локальные файлы(шрифты)
    gulp.watch('app/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
});

// Задача 'styles' выполняет сборку наших стилей.
gulp.task('styles', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(plumber({ // plumber - плагин для отловли ошибок.
			errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
		.pipe(sass()) //Компиляция sass.
		.pipe(autoprefixer({ //Добавление autoprefixer.
			browsers: ['last 2 versions']
		}))
		.pipe(concat('main.css')) //Соедение всех файлом стилей в один и задание ему названия 'main.css'.
		//.pipe(cssnano()) //Минификация стилей
		.pipe(sourcemaps.write())
		.pipe(rename('style.css')) //Переименование
		.pipe(gulp.dest('build/css'));
});

//Задача для удаление папки build.
gulp.task('clean', function() {
	return gulp.src('build/')
		.pipe(clean());
});

//Перенос html
gulp.task('html', function() {
	gulp.src('app/*.html')
		.pipe(gulp.dest('build/'));
});

//Перенос скриптов
gulp.task('scripts', function() {
	gulp.src('app/js/*.js')
		//.pipe(uglify()) //Минификация скриптов.
		.pipe(gulp.dest('build/js'));
});

//Перенос библиотек
gulp.task('libs', function() {
	gulp.src('app/libs/jquery/dist/jquery.min.js') // JQuery
		.pipe(gulp.dest('build/libs/jquery'));
	gulp.src([ // AOS
		'app/libs/aos/dist/aos.js', 'app/libs/aos/dist/aos.css' 
		])
		.pipe(gulp.dest('build/libs/aos')); 
	gulp.src([ // Fansybox
		'app/libs/fancybox/dist/jquery.fancybox.min.js', 'app/libs/fancybox/dist/jquery.fancybox.min.css'
		])
		.pipe(gulp.dest('build/libs/fancybox')); 	
	gulp.src([ // Slick
		'app/libs/slick-carousel/slick/slick.min.js', 'app/libs/slick-carousel/slick/slick.css',
		'app/libs/slick-carousel/slick/slick-theme.css', 'app/libs/slick-carousel/slick/ajax-loader.gif'
		])
		.pipe(gulp.dest('build/libs/slick'));
	gulp.src('app/libs/slick-carousel/slick/fonts/*.*')
		.pipe(gulp.dest('build/libs/slick/fonts')); 
	gulp.src('app/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js') // Mask
		.pipe(gulp.dest('build/libs/mask')); 
	gulp.src([ // Alertify
		'app/libs/alertify-js/build/alertify.min.js', 'app/libs/alertify-js/build/css/alertify.min.css',
		'app/libs/alertify-js/build/css/themes/default.min.css'
		])
		.pipe(gulp.dest('build/libs/alertifyjs'));		
});

//Перемешение наших локальных картинок в папку build
gulp.task('img', function() {
	return gulp.src('./app/img/**/*.*')
		.pipe(cache(imagemin({ // С кешированием
           //.pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./build/img')); // Выгружаем на продакшен	
});

//Перемешение наших локальных шрифтов в папку build
gulp.task('fonts', function() {
	return gulp.src('./app/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts')); // Выгружаем на продакшен	
});

//Задача для запуска сервера.
gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: './build/'
		}
	});
});

