/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2022-01-18 09:48:28
 */
const log = require("@/log.js").log;
const Element = require("@/Element.js");
class Stage {
  constructor(matrix) {
    /**
     * matrix: to be solved
     * 待解决的矩阵
     */
    this.matrix = this.checkMatrix(matrix);

    /**
     * dlx height
     * 跳舞链盘的高度,+1为列节点
     */
    this.height = this.matrix.length + 1;

    /**
     * dlx width
     * 跳舞链盘的宽度
     */
    this.width = this.matrix[0].row.length;

    /**
     * base chain
     * 原链：将每个1转化为Element对象并增加头部元素
     */
    this.chain = [];

    /**
     * dlx rows
     * 跳舞链的每行集合
     */
    this.rows = [];

    /**
     * dlx cols
     * 跳舞链的每列集合
     */
    this.cols = [];

    /**
     * dlx head element
     * 跳舞链head元素
     */
    this.head = null;

    /**
     * matrix answers collection
     * 矩阵解答集合
     */
    this.ans = [];

    /**
     * 一种解决方案缓存
     */
    this.plan = [];

    this.init();
  }

  calculate() {
    if (this.dancing()) return this.getResult();
  }

  dancing({ id } = { id: `0000` }) {
    // set id
    const date = new Date();
    const time = date.getMilliseconds();
    id = `${id}-${time}`;
    log(`dancing... ${id}`);
    log(this.chain);

    // step1: get head.right with next
    const next = this.head.right;
    log(`get next: ${next.getName()}`);

    // check next is head
    const isHead = this.head.check(next);
    log(`check next is head: ${isHead}`);

    // only has head get the answer
    if (isHead) {
      log(`find plan: ${this.plan}`);
      log(`dancing end ${id}`);
      this.ans.push(this.plan.concat());
      return true;
    }

    // step2: mark next
    log(`next tap`);
    const { marks, drops } = next.tap();

    log(`next tap select count: ${marks.length}`);
    log(this.chain);
    if (!marks.length) log(`dancing end ${id}`);
    if (!marks.length) return false;

    const results = marks.map(mark => {
      const index = mark.index;
      // save row count
      log(`try select ${index}`);
      this.plan.push(index);

      // step3 mark other element col as same row
      log(`tap select ${index} element col as same row`);
      log(mark.rows);
      const dropCollection = mark.rows.map(ele => {
        return ele.tap().drops;
      });

      const result = this.dancing({ id });

      this.redo(dropCollection);
      log(`redo: ${this.plan}`);

      return result;
    });

    this.redo(drops);

    console.log(`result ${results.includes(true)}`);
    if (results.includes(true)) return true;
    return false;
  }

  getResult() {
    return this.ans.map(plan => {
      return plan.map(index => {
        return this.matrix[index - 1];
      });
    });
  }

  /**
   * 每个元素转换为元素对象引用自身周围
   */
  init() {
    this.chain = this.createChain();
    this.head = this.getHead();
    this.cols = this.getCols();
    this.rows = this.getRows();
    this.linkChain();
    // this.clear();
  }

  /**
   * @function createChain
   * @description create base chain
   * @returns chain
   */
  createChain() {
    // add head element
    const chain = [].concat(this.createColList(), this.matrix);
    return chain.map((row, x) => {
      return row.row.map((el, y) => {
        // when 1 or {}
        if (el) return new Element({ x, y });
        return undefined;
      });
    });
  }

  createColList() {
    return { row: new Array(this.width).fill({}) };
  }

  /**
   * @function getHead
   * @description create head element
   * @returns head
   */
  getHead() {
    return new Element({ x: -1, y: -1 });
  }

  /**
   * @function getRows
   * @description create dlx rows
   * @returns rows
   */
  getRows(chain = this.chain) {
    return chain.map(row => {
      return [].concat(
        row.filter(el => {
          if (el) return true;
        })
      );
    });
  }

  /**
   * @function getCols
   * @description create dlx cols
   * @returns cols
   */
  getCols(chain = this.chain, width = this.width) {
    const cols = [];
    for (let i = 0; i < width; i++) {
      const col = chain
        .map(row => {
          return row[i];
        })
        .filter(el => {
          if (el) return true;
        });
      cols.push(col);
    }
    return cols;
  }

  linkChain() {
    this.rows.map((row, x) => {
      row.map((ele, y) => {
        ele.type = x === 0 ? "col" : "base";
        ele.right = row[y === row.length - 1 ? 0 : y + 1];
        ele.left = row[y === 0 ? row.length - 1 : y - 1];
        // all element will be use (head)
        ele.use = true;
      });
    });

    this.cols.map(col => {
      col.map((ele, x) => {
        ele.up = col[x === 0 ? col.length - 1 : x - 1];
        ele.down = col[x === col.length - 1 ? 0 : x + 1];
        ele.col = col[0];
        // all element have value (not head)
        ele.value = 1;
        ele.name = `[up[${ele.up.x},${ele.up.y}],down[${ele.down.x},${ele.down.y}],left[${ele.left.x},${ele.left.y}],right[${ele.right.x},${ele.right.y}]]`;
      });
    });

    this.head.right = this.rows[0][0];
    this.head.left = this.rows[0][0].left;
    this.head.left.right = this.head;
    this.rows[0][0].left = this.head;
    this.head.use = true;
  }

  /**
   * redo element list
   * @param {array} arr
   */
  redo(arr) {
    arr.map(obj => {
      if (obj instanceof Array) {
        obj.map(ele => {
          ele.in();
        });
      } else {
        obj.in();
      }
    });
    // redo plan
    this.plan.pop();
  }

  checkMatrix(matrix) {
    if (!(matrix instanceof Array)) throw new Error("this matrix is not array");
    const check = matrix.filter(row => {
      if (row.data !== undefined || row.row !== undefined) return true;
    });
    if (!check.length) throw new Error("this matrix must had data and row");
    return matrix;
  }
}

module.exports = Stage;
