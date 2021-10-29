const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装

module.exports = (env) => {
  const localFlag = env.NODE_ENV === 'local';
  // 默认配置
  const defaultConf = {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  };

  if(localFlag){
    return{
      ...defaultConf,
      devtool: 'inline-source-map',
      cache:{
        name: 'learn-demo-cache', // 缓存名称
        type: 'filesystem', // 通过文件系统来缓存，默认有效期1个月，缓存目录默认为 node_modules/.cache/webpack
        store: 'pack', // 当编译器闲置时候，将缓存数据都存放在一个文件中
        maxMemoryGenerations: 1, // 将最大限度地减少内存使用，同时仍将活动项目保留在内存缓存中
      }
    }
  }
};
