/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:24:37
 * @LastEditors: lax
 * @LastEditTime: 2022-01-15 13:56:00
 */
const util = require("util");
const log = console.log;
class Element {
  constructor(p = {}) {
    // link element
    this.right = p.right || null;
    this.left = p.left || null;
    this.up = p.up || null;
    this.down = p.down || null;

    // cX
    this.col = null;

    this.row = p.x;

    // matrix 0/1
    this.value = p.value;

    // head/base/"col"
    this.type = p.type || "base";

    // check used
    this.use = p.use === undefined ? false : p.use;

    // use name
    this.name = p.name || "";

    // point x,y
    this.x = p.x;
    this.y = p.y;
  }

  /**
   * drop element from dance
   */
  out() {
    this.left.right = this.right;
    this.right.left = this.left;
    this.up.down = this.down;
    this.down.up = this.up;
    this.use = false;
  }

  /**
   * enter dance
   */
  in() {
    this.left.right = this;
    this.right.left = this;
    this.up.down = this;
    this.down.up = this;
    this.use = true;
  }

  /**
   *
   * @returns
   */
  tap() {
    // get marks before drop
    const marks = this.col.getCols().map(col => {
      const rows = col.getRows().concat([col]);
      log(`mark row index: ${col.x},find count: ${rows.length}`);
      return { index: col.x, rows };
    });

    const drops = marks
      .reduce((acc, next) => {
        return acc.concat(next.rows);
      }, [])
      .concat([this]);

    drops.map(each => {
      log(`drop item:`);
      log(each);
      each.out();
    });

    return { marks, drops };
  }

  getCols() {
    return this.get("down", []);
  }

  getRows() {
    return this.get("right", []);
  }

  get(direction, collection, acc = this) {
    const next = acc[direction];
    if (!this.check(next)) {
      collection.push(next);
      this.get(direction, collection, next);
    }
    return collection;
  }

  /**
   * @function outLine
   * @description out of line(row or col)
   * @param {*} ele
   * @param {*} direction
   * @param {*} callback
   * @returns
   */
  outLine(ele, direction, collection, callback) {
    const r = Math.random(1, 100);
    const next = ele[direction];
    console.log(
      `id:${r} start to drop, direction: ${direction} by: ${ele.getCoordinate()} `
    );
    const is = !ele.check(next);
    console.log(`this is not origin ${is}`);
    if (is) {
      callback && callback(collection);
      next.out();
      collection.push(next);
      console.log(`drop: ${next.getCoordinate()}`);
      console.log(`drop collection has : ${collection.length}`);
      this.outLine(ele, direction, collection, callback);
    }
    console.log(`id:${r} drop end `);
    return collection;
  }

  check(el) {
    if (el.x === this.x && el.y === this.y) return true;
    return false;
  }

  getCoordinate() {
    return `[${this.x},${this.y}]`;
  }

  [util.inspect.custom]() {
    return this.use ? `${this.type}${this.getCoordinate()}` : `out`;
  }

  getName() {
    return this.getCoordinate();
  }
}

module.exports = Element;
