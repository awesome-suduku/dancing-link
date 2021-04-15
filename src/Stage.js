/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-04-15 14:28:47
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

		this.init();
	}

	calculate() {
		this.dancing();
	}

	dancing() {
		// 获取head.right
		const next = this.head.right;
		if (next.check(this.head)) return true;

		// 标记right
		const nextTaps = next.tap();
		if (next.check(next.down)) return false;

		nextTaps.map(row => {
			// 获取right第一序列
			const nextFirst = row[0];

			// 标记该第一序列同行其余元素的列首元素
			const nextFirstTaps = this.tapByRow(nextFirst);

			// 得到子跳舞链盘
			if (this.dancing()) {
				return true;
			}
			// 返回该元素同行的其余元素所在的列首元素
			this.tapBack(nextFirstTaps);
			this.ans.push(nextFirst);
		});
		this.tapBack(nextTaps);
		return false;
	}

	/**
	 * 每个元素转换为元素对象引用自身周围
	 */
	init() {
		this.chain = this.createChain();
		this.rows = this.getRows();
		this.cols = this.getCols();
		this.head = this.getHead();
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
		return new Element({
			type: "head",
			right: this.rows[0][0],
			left: this.rows[0][this.rows.length - 1],
			use: true,
			row: 0
		});
	}

	/**
	 * @function getRows
	 * @description create dlx rows
	 * @returns rows
	 */
	getRows() {
		return this.chain.map(row => {
			return row.filter(el => {
				if (el) return true;
			});
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
				if (row.length === 1) {
					ele.right = ele;
					ele.left = ele;
				}
				ele.type = x === 0 ? "col" : "base";
				ele.right = row[y === row.length - 1 ? 0 : y + 1];
				ele.left = row[y === 0 ? row.length - 1 : y - 1];
				ele.row = x;
				ele.use = true;
			});
		});

		this.cols.map(col => {
			col.map((ele, x) => {
				if (col.length === 1) {
					ele.up = ele;
					ele.down = ele;
				}
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

	/**
	 * 标记该元素所在行剩余元素的首列元素
	 * @param {*} first
	 */
	tapByRow(first) {
		return this.matrix[first.x].reduce((el, next) => {
			if (next.y !== first.y) {
				return el.concat(this.tap(next.y));
			}
			return el;
		}, {});
	}
}

module.exports = Stage;
