module.exports = function () {
	var appDir = './app/'
	var config = {
		appDir: appDir,
		distDir: './dist/',
		jsDir: appDir + 'scripts/',
		js: [
			appDir + 'scripts/**/*.js'
		],
		scss: [
			appDir + 'styles/**/*.scss'
		],
        images: [
			appDir + 'images/**/*.png'
		]
	}

	return config;
};