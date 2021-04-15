/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-04-14 18:59:49
 * @LastEditors: lax
 * @LastEditTime: 2021-04-15 18:08:20
 * @FilePath: \dancing-links\test\debug\index.js
 */
const collection = require("./../data/index.js");
const Stage = require("./../../bin/index.js");

const stage = new Stage(collection);
// const next = stage.head.right;

console.log(stage.calculate());
// console.log(stage.rows);
