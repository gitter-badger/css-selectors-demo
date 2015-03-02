path             = require 'path'
gulp             = require 'gulp'
gutil            = require 'gulp-util'
webpack          = require 'webpack'
WebPackDevServer = require 'webpack-dev-server'

webpackConfig = require './webpack.config.coffee'

gulp.task 'serve', ->
	config = Object.create webpackConfig
	config.devtool = 'sourcemap'
	config.debug = yes

	server = new WebPackDevServer(
		webpack(config),
		publicPath: "/#{config.output.publicPath}"
	)

	server.listen 8080, 'localhost', (err) ->
		throw new gutil.PluginError 'webpack-dev-server', err if err
		gutil.log '[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html'

gulp.task 'webpack:build', (callback) ->
	config = Object.create webpackConfig
	config.plugins = [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]

	webpack config, (err, stats) ->
		throw new gutil.PluginError("webpack:build", err)  if err
		gutil.log "[webpack:build]", stats.toString(colors: true)
		callback()

gulp.task 'webpack:build-dev', (callback) ->
	config = Object.create webpackConfig
	config.devtool = 'sourcemap'
	config.plugins = [
		new webpack.optimize.DedupePlugin()
	]

	webpack config, (err, stats) ->
		throw new gutil.PluginError('webpack:build', err)  if err
		gutil.log '[webpack:build]', stats.toString(colors: true)
		do callback
