/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-04-13 17:14:53
 */
const { getMatrixBySuduku } = require("@/utils/matrix.js");
class Stage {
	constructor(suduku) {
		// 九宫格
		this.suduku = suduku;
		// 跳舞链盘
		this.matrix = [];
		this.init();
		this.head = this.list[0][0];
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
		const nextTaps = this.tap(next.y);
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
		const matrix = getMatrixBySuduku(this.suduku);
		this.matrix = matrix;
		this.clear();
	}

	/**
	 * 清除所有空对象
	 */
	clear() {
		this.matrix.map(row => {
			row.map(el => {
				if (el.sup && !el.use) el.out();
			});
		});
	}

	/**
	 * 标记元素
	 * @param {*} col
	 */
	tap(col) {
		return this.matrix.filter((row, y) => {
			// 仅返回标记元素所在列其他元素的行集合中已使用的元素
			if (col === y) {
				return row.filter(el => {
					if (!el.sup && el.use) {
						el.out();
						return true;
					}
				});
			}
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
