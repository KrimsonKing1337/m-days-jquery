const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = (env = {}, argv) => {
  const webpackMode = argv.mode;
  const { analyze, mobile, sb } = env;
  const isProd = webpackMode === 'production';

  const plugins = [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      'isSbMode': JSON.stringify(sb),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      scriptLoading: 'blocking',
      isMobile: !!mobile,
      isProd,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    })
  ];

  const rules = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(ts|js)$/,
      use: ['babel-loader', {
        loader: 'ifdef-loader',
        options: {
          env: env,
        },
      }],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')
              ]
            },
          },
        },
        {
          loader: 'sass-loader',
        }
      ],
    },
    {
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /sprite/,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          use: ['@svgr/webpack'],
        },
      ],
    },
    {
      test: /\.(jpeg|jpg|png|docx)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        },
      ],
    },
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader?limit=100000'] },
    {
      test: /\.ejs$/,
      use: [
        {
          loader: 'ejs-loader',
          options: {
            esModule: false,
          }
        }
      ]
    },
  ];

  if (mobile) {
    rules.push({
      test: /\.(ts?|js?|json)$/,
      loader: 'string-replace-loader',
      options: {
        search: '/assets',
        replace: 'file:///android_asset/www/assets',
        flags: 'g',
      },
    });
  }

  const buildDir = path.join(__dirname, (mobile ? 'cordova/www' : 'dist'));

  return {
    entry: ['./src/index.ts'],
    mode: webpackMode,
    devtool: !isProd ? 'eval-source-map' : false,
    devServer: {
      static: buildDir,
      port: 3001, // todo
      historyApiFallback: true,
      hot: true,
      liveReload: false,
      allowedHosts: 'all',
      // https: true, // доступ к камере работает только через https
    },
    output: {
      // пустой publicPath нужен для кордовы. она не может найти bundle.min.js, если его путь начинается с '/'
      publicPath: mobile ? '' : './',
      path: buildDir,
      filename: '[name]_[contenthash].js',
    },
    target: !isProd ? 'web' : ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './public'),
      ],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, './assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    module: {
      rules: rules,
    },
    plugins: plugins,
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
  };
};
