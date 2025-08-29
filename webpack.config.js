import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

/**
 * @param {*} env
 * @returns {import('webpack').Configuration & { devServer?: import('webpack-dev-server').Configuration }} config
 */
const webpackConfig = (env) => {
  const isDevelopment = env.NODE_ENV !== 'production'

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: path.join(import.meta.dirname, 'src', 'main.tsx'),
    output: {
      path: path.join(import.meta.dirname, 'dist'),
      pathinfo: isDevelopment,
      chunkFilename: 'assets/[name]-[contenthash:8].js',
      filename: 'assets/[name]-[contenthash:8].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  exportLocalsConvention: 'camel-case-only',
                  namedExport: false,
                  localIdentName: '[local]__[hash:base64:6]',
                },
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        '@/*': path.resolve(import.meta.dirname, 'src/*'),
      },
    },
    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: true,
            output: { ecma: 2017, comments: false, ascii_only: true },
          },
        }),
      ],
    },
    devServer: {
      static: {
        directory: path.join(import.meta.dirname, 'public'),
      },
      port: 3000,
      compress: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(
          import.meta.dirname,
          'public',
          'index.html',
        ),
        publicPath: '/',
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name]-[contenthash:8].css',
        chunkFilename: 'assets/[name]-[contenthash:8].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    ],
  }
}

export default webpackConfig
