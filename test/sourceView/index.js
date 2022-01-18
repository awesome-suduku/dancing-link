/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-08-04 20:06:41
 * @LastEditors: lax
 * @LastEditTime: 2022-01-15 10:58:53
 * @FilePath: \dancing-links\test\sourceView\index.js
 */
const fs = require("fs-extra");
const collection = require("@root/test/data/index.js");
const Stage = require("@/index");

const stage = new Stage(collection);
const chain = stage.createChain();
const cols = stage.getCols(chain, collection[0].row.length);
const rows = stage.getRows(chain);

const JSON = { chain, cols, rows };

const getPath = file => `docs/source/${file}.json`;

["chain", "cols", "rows"].map(name => {
  const path = getPath(name);
  fs.ensureFileSync(path);
  fs.writeJsonSync(path, JSON[name]);
});
