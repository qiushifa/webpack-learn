const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = env => {
  const localFlag = env.NODE_ENV === 'local';
  // 默认配置
  const defaultConf = {
    entry: './src/index.tsx', // 入口
    // 出口
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    // ？？
    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      // extensions作用：在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
      extensions: ['.ts', '.tsx', '.js'],
    },
    // 模块，处理webpack处理不了的东西
    module: {
      rules: [
        { loader: 'babel-loader' },
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    // 插件，处理module处理不了的东西
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  };

  if (localFlag) {
    return {
      ...defaultConf,
      devtool: 'inline-source-map',
      devServer: {
        host: '0.0.0.0',
        port: 8999,
      },
    };
  }
};
