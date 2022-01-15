/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-01-15 15:47:25
 * @LastEditors: lax
 * @LastEditTime: 2022-01-15 15:48:42
 * @FilePath: \dancing-links\src\log.js
 */
const fs = require("fs");
let stdout = fs.createWriteStream("log/debug.log");
let stderr = fs.createWriteStream("log/error.log");

const log = new console.Console(stdout, stderr);
module.exports = log;
