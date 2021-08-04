/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-12 16:44:57
 * @LastEditors: lax
 * @LastEditTime: 2021-08-04 19:52:18
 * @FilePath: \dancing-links\webpack.config.js
 */
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	devtool: "inline-cheap-source-map",
	entry: "./src/Stage.js",
	output: {
		path: resolve("bin"),
		filename: "index.js",
		libraryTarget: "commonjs2",
		library: "Stage"
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	},
	resolve: {
		// 设置别名
		alias: {
			"@": resolve("src"),
			"@test": resolve("test")
		}
	},
	mode: process.env.NODE_ENV || "development"
};
