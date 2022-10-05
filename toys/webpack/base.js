const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    page0: './src/index.js',  
    page1: './src/MissingNumberGame.js',   
    page2: './src/TwistedTimeTableGame.js',   
    page3: './src/BlockIt.js',
    page4: './src/GreatEscape.js',
    page5: './src/FactorSector.js'    
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|wav)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      inject: false,      
      chunks: ['page0'],
      template: "./main_index.html",
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['page1'],
      template: "./index.html",
      filename: 'missing_number_game.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['page2'],
      template: "./index.html",
      filename: 'twisted_timetable_game.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['page3'],
      template: "./index.html",
      filename: 'blockit.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['page4'],
      template: "./index.html",
      filename: 'great_escape.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['page5'],
      template: "./index.html",
      filename: 'factor_sector.html'
    })
  ]
};
