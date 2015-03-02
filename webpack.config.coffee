path              = require 'path'
fs                = require 'fs'

basePath =
	src: path.join __dirname, './src'
	dist: '/public/dist'

ignoredApps =
	try
		fs.readFileSync './webpack.ignore', 'utf-8'
			.split '\n'
	catch
		[]

apps = fs.readdirSync basePath.src
	.filter (file) ->
		fs.statSync path.join basePath.src, file
			.isDirectory() and
			file not in ignoredApps

config =
	entry: {}
	output:
		path: path.join __dirname, basePath.dist
		publicPath: '/public/dist/'
		filename: '[name].js'
		chunkFilename: '[chunkhash].js'
	module:
		loaders: [{
			test: /\.coffee$/
			loader: 'coffee'
		}, {
			test: /\.styl$/
			loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]

for app in apps
	config.entry[app] = "#{basePath.src}/#{app}/index.coffee"

module.exports = config
