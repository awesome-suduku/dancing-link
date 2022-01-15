/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-14 18:59:49
 * @LastEditors: lax
 * @LastEditTime: 2022-01-15 14:11:13
 * @FilePath: \dancing-links\test\debug\index.js
 */
const collection = require("@root/test/data/index.js");
const Stage = require("@/index.js");

const stage = new Stage(collection.one);

console.log(stage.calculate());
