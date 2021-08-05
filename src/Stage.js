/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-08-05 17:45:12
 */
const Element = require("@/Element.js");
class Stage {
  constructor(matrix) {
    /**
     * matrix: to be solved
     * 待解决的矩阵
     */
    this.matrix = matrix;

    /**
     * dlx height
     * 跳舞链盘的高度
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
    console.log(`dancing... ${id}`);

    // step1: get head.right with next
    const next = this.head.right;
    console.log(`get next: ${next.getCoordinate()}`);

    const isHead = this.head.check(next);
    console.log(`check next is head: ${isHead}`);
    if (isHead) {
      console.log(`find plan: ${this.plan}`);
      console.log(`dancing end ${id}`);
      this.ans.push(this.plan.concat());
      return true;
    }

    // step2: mark next
    console.log(`next tap`);
    const { marks, drops } = next.tap();

    console.log(`next tap count: ${marks.length}`);
    if (!marks.length) console.log(`dancing end ${id}`);
    if (!marks.length) return false;

    const results = marks.map((mark, i) => {
      // save row count
      console.log(`try select ${i}`);
      this.plan.push(mark.index);

      //
      console.log(`tap select ${i} col as same row`);
      const dropCollection = mark.rows.map(ele => {
        return ele.col.tap().drops;
      });

      console.log(`redoCollection: `);
      console.log(dropCollection);

      const result = this.dancing({ id });

      this.redo(dropCollection);
      console.log(`redo: ${this.plan}`);

      return result;
    });

    console.log(drops);
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
    this.cols = this.getCols();
    this.head = this.getHead();
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
    const chain = [].concat(
      { row: new Array(this.width).fill({}) },
      this.matrix
    );
    return chain.map((row, x) => {
      return row.row.map((el, y) => {
        // when 1 or {}
        if (el) return new Element({ x, y, row: x });
        return undefined;
      });
    });
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
  getRows(chain = this.chain, head = this.head) {
    return chain.map((row, i) => {
      return [].concat(
        // add head element in first row
        i === 0 ? [head] : [],
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
        ele.type = x === 0 ? (y === 0 ? "head" : "col") : "base";
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
}

module.exports = Stage;
