var webpack = require("webpack");
var version = require("./package.json").version;
var banner = "/**\n" + " * vue-form-generator v" + version + "\n" + " * https://github.com/icebob/vue-form-generator\n" + " * Released under the MIT License.\n" + " */\n";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

var loaders = [
	{
		"test": /\.js?$/,
		"exclude": /node_modules/,
		"loader": "babel"
	},
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	},
	{
		test: /\.json$/,
		loader: 'url-loader'
	},
	{
		test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
		// loader: "url-loader"
		loader: "url-loader?limit=10000"
	},
	{
		test: /\.(ttf|eot)$/,
		loader: "url-loader"
	},
	{
		"test": /\.vue?$/,
		"loader": "vue-loader",
		// options: {
		// 	postcss: [
		// 		require('autoprefixer')({
		// 			browsers: ['last 3 versions']
		// 		})
		// 	],
		// 	loaders: {
		// 		scss: 'style-loader!css-loader!sass-loader'
		// 	}
		// }

	}
];
var cssFileName;
if (process.env.FULL_BUNDLE) {
	cssFileName = "vfg.css";
} else {
	cssFileName = "vfg-core.css";
}

module.exports = [
	{
		entry: "./src/index.js",
		output: {
			path: "./dist",
			filename: "vfg.js",
			library: "VueFormGenerator",
			libraryTarget: "umd"
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : JSON.stringify("production")
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.BannerPlugin(banner, {
				raw: true
			}),
			new ExtractTextPlugin(cssFileName, { allChunks: true }),
			new StatsPlugin("../stats.json", {
				chunkModules: true
				//exclude: [/node_modules[\\\/]react/]
			})
		],

		module: {
			loaders,
			rules: [
					{
						test: /\.less$/,
						use: ExtractTextPlugin.extract({
							fallbackLoader: 'style-loader',
							loaders: [
								// activate source maps via loader query
								{
									loader: 'css-loader',
									options: { sourceMap: true, importLoaders: 1 }
								},
								{
									loader: 'less-loader',
									options: { sourceMap: true }
								}
							]
						})
					},
					{
						test: /\.css$/,
						use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: 'css-loader'
						})
					},
					{
						test: /\.sass$/,
						use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: 'sass-loader'
						})
					},

				]
		},

		vue: {
			loaders: {
				css: ExtractTextPlugin.extract("css"),
				postcss: ExtractTextPlugin.extract("css"),
				sass: ExtractTextPlugin.extract("css!sass"),
				scss: ExtractTextPlugin.extract("css!sass"),
				less: ExtractTextPlugin.extract("css!less"),
			}
		},

		resolve: {
			packageAlias: "browser"
		}
	}

];
