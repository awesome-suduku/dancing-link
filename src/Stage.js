/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-04-14 20:00:20
 */
const Element = require("@/Element.js");
class Stage {
	constructor(matrix) {
		// 跳舞链盘
		this.matrix = matrix;
		this.height = this.matrix.length + 1;
		this.width = this.matrix[0].row.length;
		this.dance = [];
		this.init();
		// this.head = this.dance[0][0];
		this.ans = [];
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
		this.linkChain();
		// this.clear();
	}

	createChain() {
		const chain = [].concat(
			{ row: new Array(this.width).fill(null) },
			this.matrix
		);
		return chain.map((row, x) => {
			return row.row.map((el, y) => {
				if (el !== 0 || el === null) return new Element({ x, y, row: x });
				return null;
			});
		});
	}

	getRowList() {
		this.chain
			.map(row => {
				return row.row.filter(el => {
					if (el !== null) return true;
				});
			})
			.map();
	}

	getColList() {
		const cols = [];
		for (let i = 0; i < this.width; i++) {
			const col = this.chain.map(row => {
				return row.row[i];
			});
			cols.push(col);
		}
	}

	linkChain() {
		this.chain.map((row, x, arr) => {
			row.row.map((ele, y) => {
				const num = this.matrix[x - 1].row[y];
				ele.type = x === 0 ? (y === 0 ? "head" : "col") : "base";
				ele.right = row[y === row.length - 1 ? 0 : y + 1];
				ele.left = row[y === 0 ? row.length - 1 : y - 1];
				ele.up = arr[x === 0 ? arr.length - 1 : x - 1][y];
				ele.down = arr[x === arr.length - 1 ? 0 : x + 1][y];
				ele.col = arr[0][y];
				ele.use = x === 0 ? true : this.matrix[x].row[y] === 1;
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

	/**
	 * 回标元素集合
	 * @param {*} list
	 */
	tapBack() {
		this.list.map(row => {
			row.map(el => {
				el.in();
			});
		});
	}
}
module.exports = Stage;
