var path = require("path");
var webpack = require("webpack");
var projectRoot = path.resolve(__dirname, '../');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var loaders = [
	{
		test: /\.vue$/,
		loader: 'vue-loader'
	},
	{
		test: /\.js$/,
		loader: 'babel-loader',
		include: projectRoot,
		exclude: /node_modules/
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
	}
];

module.exports = {
	devtool: "source-map",

	entry: {
		test_post_form: path.resolve("dev", "post-form", "main.js"),
		test_simple: path.resolve("dev", "simple", "main.js"),
		meta: path.resolve("dev", "meta", "main.js"),
		full: path.resolve("dev", "full", "main.js"),
		mselect: path.resolve("dev", "multiselect", "main.js")
	},

	output: {
		path: path.resolve("dev"),
		filename: "[name].js",
		publicPath: "/"
	},

  plugins: [
      new webpack.DefinePlugin({
          "process.env": {
              NODE_ENV: JSON.stringify("development"),
              FULL_BUNDLE: true
          }
      }),
  ],

	module: {
		loaders: loaders,
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
				include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: path.resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },

	resolve: {
		packageAlias: "browser"
	},

	vue: {
		autoprefixer: {
			browsers: ["last 2 versions"]
		}
	}
};
