/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:24:37
 * @LastEditors: lax
 * @LastEditTime: 2021-04-15 21:20:54
 */
class Element {
	constructor(p = {}) {
		// link element
		this.right = p.right || null;
		this.left = p.left || null;
		this.up = p.up || null;
		this.down = p.down || null;
		this.col = p.col || null;
		this.row = p.row || null;

		// matrix 0/1
		this.value = p.value;

		// head/base/col
		this.type = p.type || "base";
		// check used
		this.use = p.use === undefined ? false : p.use;
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

	tap() {
		const marks = this.getCols().map(col => {
			const rows = col.getRows().map(el => {
				return el;
			});
			return { col, rows };
		});
		const drops = this.outLine(this, "down", [], collection => {
			this.outLine(this.down, "right", collection);
		});
		this.out();
		drops.push(this);
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
			`enter func ${r}: this is [${ele.x},${ele.y}] next is [${next.x},${next.y}]`
		);
		console.log(`this is not origin ${!ele.check(next)}`);
		if (!ele.check(next)) {
			callback && callback(collection);
			next.out();
			collection.push(next);
			console.log(`drop: [${next.x},${next.y}]`);
			console.log(`drop collection has : ${collection.length}`);
			this.outLine(ele, direction, collection, callback);
		}
		console.log(`end func ${r}`);
		return collection;
	}

	check(el) {
		if (el.x === this.x && el.y === this.y) return true;
		return false;
	}
}

module.exports = Element;
