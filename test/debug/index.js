/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-14 18:59:49
 * @LastEditors: lax
 * @LastEditTime: 2021-04-15 09:51:24
 * @FilePath: \dancing-links\test\debug\index.js
 */
const collection = require("./../data/index.js");
const Stage = require("./../../bin/index.js");

const stage = new Stage(collection);

console.log(stage.cols);
