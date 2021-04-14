/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-12 16:44:57
 * @LastEditors: lax
 * @LastEditTime: 2021-04-14 19:26:50
 * @FilePath: \dancing-links\webpack.config.js
 */
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
// const webpack = require("webpack")

module.exports = {
	devtool: "inline-cheap-source-map",
	entry: "./src/Stage.js",
	output: {
		path: resolve("bin"),
		filename: "index.js",
		libraryTarget: "commonjs2",
		library: "Stage"
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
