/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-12 16:44:57
 * @LastEditors: lax
 * @LastEditTime: 2021-04-13 23:37:09
 * @FilePath: \suduku\webpack.config.js
 */
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
// const webpack = require("webpack")

module.exports = {
	devtool: "inline-cheap-source-map",
	resolve: {
		// 设置别名
		alias: {
			"@": resolve("src"),
			"@test": resolve("test")
		}
	},
	mode: process.env.NODE_ENV || "development"
};
