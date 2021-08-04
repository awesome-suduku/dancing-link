/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-08-04 20:06:41
 * @LastEditors: lax
 * @LastEditTime: 2021-08-04 20:26:25
 * @FilePath: \dancing-links\test\sourceView\index.js
 */
const fs = require("fs-extra");
const collection = require("./../data/index.js");
const Stage = require("./../../bin/index");
const path = require("path");

const stage = new Stage(collection);
const chain = stage.createChain();
const cols = stage.getCols(chain, collection[0].row.length);
const head = stage.getHead();
const rows = stage.getRows(chain, head);

const CHAIN_PATH = path.resolve(__dirname, `./../../docs/source/chain.json`);
fs.ensureFileSync(CHAIN_PATH);
fs.writeJsonSync(CHAIN_PATH, chain);

const COLS_PATH = path.resolve(__dirname, `./../../docs/source/cols.json`);
fs.ensureFileSync(COLS_PATH);
fs.writeJsonSync(COLS_PATH, cols);

const ROWS_PATH = path.resolve(__dirname, `./../../docs/source/rows.json`);
fs.ensureFileSync(ROWS_PATH);
fs.writeJsonSync(ROWS_PATH, rows);
