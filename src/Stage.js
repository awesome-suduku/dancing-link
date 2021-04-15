/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-04-15 21:22:08
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

		this.plan = [];

		this.init();
	}

	calculate() {
		if (this.dancing()) return this.ans;
	}

	dancing() {
		const r = Math.random(0, 100);
		console.log(`dancing... ${r}`);

		// step1: get head.right
		const next = this.head.right;
		console.log(`next is [${next.x},${next.y}]`);

		console.log(`check next is head: ${next.check(this.head)}`);
		if (next.check(this.head)) {
			console.log(`find plan: ${this.plan}`);
			console.log(`dancing end ${r}`);
			this.ans.push(this.plan.concat());
			return true;
		}

		// step2: mark right
		console.log(`next tap`);
		const { marks } = next.tap();

		console.log(`get next cols: ${marks.length}`);
		if (!marks.length) console.log(`dancing end ${r}`);
		if (!marks.length) return false;

		console.log(`cols select`);
		const results = marks.map((mark, i) => {
			// save row count
			console.log(`cols select ${i}`);
			this.plan.push(mark.col.row);

			//
			console.log(`col${i} tap`);
			const dropCollection = mark.rows.map(ele => {
				return ele.col.tap().drops;
			});

			const result = this.dancing();

			this.redo(dropCollection);
			console.log(`redo: ${this.plan}`);

			return result;
		});
		console.log(`result ${results.includes(true)}`);
		if (results.includes(true)) return true;
		return false;
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
	getRows() {
		return this.chain.map((row, i) => {
			return [].concat(
				i === 0 ? [this.head] : [],
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
	getCols() {
		const cols = [];
		for (let i = 0; i < this.width; i++) {
			const col = this.chain
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
				ele.row = x;
				ele.use = true;
			});
		});

		this.cols.map(col => {
			col.map((ele, x) => {
				ele.up = col[x === 0 ? col.length - 1 : x - 1];
				ele.down = col[x === col.length - 1 ? 0 : x + 1];
				ele.col = col[0];
				ele.value = 1;
				ele.name = `[up[${ele.up.x},${ele.up.y}],down[${ele.down.x},${ele.down.y}],left[${ele.left.x},${ele.left.y}],right[${ele.right.x},${ele.right.y}]]`;
			});
		});
	}

	/**
	 * 清除所有空对象
	 */
	clear() {
		this.dance.map(row => {
			row.map(el => {
				if (!el.use) el.out();
			});
		});
	}

	redo(arr) {
		arr.map(row => {
			row.map(ele => {
				ele.in();
			});
		});
		this.plan.pop();
	}
}

module.exports = Stage;
