const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    page: './src/page.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new CopyPlugin({
      patterns: [{ from: 'src/share', to: 'share' }]
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),

    // // Internal pages
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/page.html',
    //   filename: './pages/page.html',
    //   chunks: ['page']
    // }),

    //Article
    new HtmlWebpackPlugin({
      template: './src/history.html',
      filename: './history.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/journal.html',
      filename: './journal.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: './about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/start.html',
      filename: './start.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials.html',
      filename: './tutorials.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/models.html',
      filename: './models.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/textures.html',
      filename: './textures.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/general.html',
      filename: './general.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/project.html',
      filename: './project.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/promo.html',
      filename: './promo.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pink.html',
      filename: './pink.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/style_guide.html',
      filename: './style_guide.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/journals/art.html',
      filename: './journals/art.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/journals/music.html',
      filename: './journals/music.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/textures/foole.html',
      filename: './textures/foole.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/models/mercury.html',
      filename: './models/mercury.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/tutorials/interface.html',
      filename: './tutorials/interface.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/hotkeys.html',
      filename: './tutorials/hotkeys.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/blender.html',
      filename: './tutorials/blender.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/simulation.html',
      filename: './tutorials/simulation.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/rigging.html',
      filename: './tutorials/rigging.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/rabbit.html',
      filename: './tutorials/rabbit.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/polygons.html',
      filename: './tutorials/polygons.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/tutorials/animation.html',
      filename: './tutorials/animation.html'
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
