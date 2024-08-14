const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const localPublicFolder = path.join(__dirname, 'public');
const publicFolder = path.join(__dirname, '../m-days-public/');
const fontsFolder = path.join(__dirname, '../m-days-core/src/assets/fonts/');

const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = (env = {}, argv) => {
  const webpackMode = argv.mode;
  const { analyze, mobile, sb } = env;
  const isProd = webpackMode === 'production';
  const processEnv = dotenv.parsed;

  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
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
      'process.env': JSON.stringify(processEnv),
      'isSbMode': JSON.stringify(sb),
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.ejs',
      scriptLoading: 'blocking',
      filename: 'index.html',
      isMobile: !!mobile,
      isProd,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/config.ejs',
      scriptLoading: 'blocking',
      filename: 'config.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${localPublicFolder}/`,
          to: './',
        },
        {
          from: `${publicFolder}/`,
          to: './',
        },
        {
          from: `${fontsFolder}/`,
          to: './fonts',
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

  const buildDir = path.join(__dirname, 'dist');
  const imgBgDir = path.join(__dirname, '../m-days-public-images');

  return {
    entry: ['./src/index.ts'],
    mode: webpackMode,
    devtool: !isProd ? 'eval-source-map' : false,
    devServer: {
      static: [
        buildDir,
        imgBgDir,
      ],
      port: 5000, // todo
      historyApiFallback: true,
      allowedHosts: 'all',
      liveReload: true,
      client: {
        overlay: {
          warnings: false,
          errors: false,
        }
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
          // secure: false,
        },
        {
          context: ['/content-options'],
          target: 'http://localhost:3000',
          // secure: false,
        },
      ],
      devMiddleware: {
        writeToDisk: true, // без этого почему-то ошибка: cannot get /
      },
    },
    output: {
      publicPath: './',
      path: buildDir,
      filename: '[name]_[contenthash].js',
    },
    target: !isProd ? 'web' : ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules'),
        path.resolve(publicFolder),
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
