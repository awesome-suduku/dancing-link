module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Stage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Element.js":
/*!************************!*\
  !*** ./src/Element.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:24:37
 * @LastEditors: lax
 * @LastEditTime: 2021-04-16 16:41:24
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

	/**
	 *
	 * @returns
	 */
	tap() {
		// get marks before drop
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


/***/ }),

/***/ "./src/Stage.js":
/*!**********************!*\
  !*** ./src/Stage.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-08 19:31:35
 * @LastEditors: lax
 * @LastEditTime: 2021-04-16 16:50:18
 */
const Element = __webpack_require__(/*! @/Element.js */ "./src/Element.js");
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

	dancing() {
		// set id
		const r = Math.random(0, 100);
		console.log(`dancing... ${r}`);

		// step1: get head.right with next
		const next = this.head.right;
		console.log(`next is [${next.x},${next.y}]`);

		console.log(`check next is head: ${next.check(this.head)}`);
		if (next.check(this.head)) {
			console.log(`find plan: ${this.plan}`);
			console.log(`dancing end ${r}`);
			this.ans.push(this.plan.concat());
			return true;
		}

		// step2: mark next
		console.log(`next tap`);
		const { marks, drops } = next.tap();

		console.log(`next tap count: ${marks.length}`);
		if (!marks.length) console.log(`dancing end ${r}`);
		if (!marks.length) return false;

		const results = marks.map((mark, i) => {
			// save row count
			console.log(`try select ${i}`);
			this.plan.push(mark.col.row);

			//
			console.log(`tap select ${i} col as same row`);
			const dropCollection = mark.rows.map(ele => {
				return ele.col.tap().drops;
			});

			console.log(`redoCollection: `);
			console.log(dropCollection);

			const result = this.dancing();

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdGFnZS8uL3NyYy9FbGVtZW50LmpzIiwid2VicGFjazovL1N0YWdlLy4vc3JjL1N0YWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1N0YWdlLmpzXCIpO1xuIiwiLypcbiAqIEBEZXNjcmlwdGlvbjpcbiAqIEBWZXJzaW9uOiAxLjAuMFxuICogQEF1dGhvcjogbGF4XG4gKiBARGF0ZTogMjAyMC0xMC0wOCAxOToyNDozN1xuICogQExhc3RFZGl0b3JzOiBsYXhcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDQtMTYgMTY6NDE6MjRcbiAqL1xuY2xhc3MgRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHAgPSB7fSkge1xuXHRcdC8vIGxpbmsgZWxlbWVudFxuXHRcdHRoaXMucmlnaHQgPSBwLnJpZ2h0IHx8IG51bGw7XG5cdFx0dGhpcy5sZWZ0ID0gcC5sZWZ0IHx8IG51bGw7XG5cdFx0dGhpcy51cCA9IHAudXAgfHwgbnVsbDtcblx0XHR0aGlzLmRvd24gPSBwLmRvd24gfHwgbnVsbDtcblx0XHR0aGlzLmNvbCA9IHAuY29sIHx8IG51bGw7XG5cdFx0dGhpcy5yb3cgPSBwLnJvdyB8fCBudWxsO1xuXG5cdFx0Ly8gbWF0cml4IDAvMVxuXHRcdHRoaXMudmFsdWUgPSBwLnZhbHVlO1xuXG5cdFx0Ly8gaGVhZC9iYXNlL2NvbFxuXHRcdHRoaXMudHlwZSA9IHAudHlwZSB8fCBcImJhc2VcIjtcblxuXHRcdC8vIGNoZWNrIHVzZWRcblx0XHR0aGlzLnVzZSA9IHAudXNlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHAudXNlO1xuXHRcdHRoaXMubmFtZSA9IHAubmFtZSB8fCBcIlwiO1xuXG5cdFx0Ly8gcG9pbnQgeCx5XG5cdFx0dGhpcy54ID0gcC54O1xuXHRcdHRoaXMueSA9IHAueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBkcm9wIGVsZW1lbnQgZnJvbSBkYW5jZVxuXHQgKi9cblx0b3V0KCkge1xuXHRcdHRoaXMubGVmdC5yaWdodCA9IHRoaXMucmlnaHQ7XG5cdFx0dGhpcy5yaWdodC5sZWZ0ID0gdGhpcy5sZWZ0O1xuXHRcdHRoaXMudXAuZG93biA9IHRoaXMuZG93bjtcblx0XHR0aGlzLmRvd24udXAgPSB0aGlzLnVwO1xuXHRcdHRoaXMudXNlID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogZW50ZXIgZGFuY2Vcblx0ICovXG5cdGluKCkge1xuXHRcdHRoaXMubGVmdC5yaWdodCA9IHRoaXM7XG5cdFx0dGhpcy5yaWdodC5sZWZ0ID0gdGhpcztcblx0XHR0aGlzLnVwLmRvd24gPSB0aGlzO1xuXHRcdHRoaXMuZG93bi51cCA9IHRoaXM7XG5cdFx0dGhpcy51c2UgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zXG5cdCAqL1xuXHR0YXAoKSB7XG5cdFx0Ly8gZ2V0IG1hcmtzIGJlZm9yZSBkcm9wXG5cdFx0Y29uc3QgbWFya3MgPSB0aGlzLmdldENvbHMoKS5tYXAoY29sID0+IHtcblx0XHRcdGNvbnN0IHJvd3MgPSBjb2wuZ2V0Um93cygpLm1hcChlbCA9PiB7XG5cdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHsgY29sLCByb3dzIH07XG5cdFx0fSk7XG5cblx0XHRjb25zdCBkcm9wcyA9IHRoaXMub3V0TGluZSh0aGlzLCBcImRvd25cIiwgW10sIGNvbGxlY3Rpb24gPT4ge1xuXHRcdFx0dGhpcy5vdXRMaW5lKHRoaXMuZG93biwgXCJyaWdodFwiLCBjb2xsZWN0aW9uKTtcblx0XHR9KTtcblxuXHRcdHRoaXMub3V0KCk7XG5cdFx0ZHJvcHMucHVzaCh0aGlzKTtcblxuXHRcdHJldHVybiB7IG1hcmtzLCBkcm9wcyB9O1xuXHR9XG5cblx0Z2V0Q29scygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoXCJkb3duXCIsIFtdKTtcblx0fVxuXG5cdGdldFJvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFwicmlnaHRcIiwgW10pO1xuXHR9XG5cblx0Z2V0KGRpcmVjdGlvbiwgY29sbGVjdGlvbiwgYWNjID0gdGhpcykge1xuXHRcdGNvbnN0IG5leHQgPSBhY2NbZGlyZWN0aW9uXTtcblx0XHRpZiAoIXRoaXMuY2hlY2sobmV4dCkpIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXh0KTtcblx0XHRcdHRoaXMuZ2V0KGRpcmVjdGlvbiwgY29sbGVjdGlvbiwgbmV4dCk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBvdXRMaW5lXG5cdCAqIEBkZXNjcmlwdGlvbiBvdXQgb2YgbGluZShyb3cgb3IgY29sKVxuXHQgKiBAcGFyYW0geyp9IGVsZVxuXHQgKiBAcGFyYW0geyp9IGRpcmVjdGlvblxuXHQgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG5cdCAqIEByZXR1cm5zXG5cdCAqL1xuXHRvdXRMaW5lKGVsZSwgZGlyZWN0aW9uLCBjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgxLCAxMDApO1xuXHRcdGNvbnN0IG5leHQgPSBlbGVbZGlyZWN0aW9uXTtcblx0XHRjb25zb2xlLmxvZyhcblx0XHRcdGBlbnRlciBmdW5jICR7cn06IHRoaXMgaXMgWyR7ZWxlLnh9LCR7ZWxlLnl9XSBuZXh0IGlzIFske25leHQueH0sJHtuZXh0Lnl9XWBcblx0XHQpO1xuXHRcdGNvbnNvbGUubG9nKGB0aGlzIGlzIG5vdCBvcmlnaW4gJHshZWxlLmNoZWNrKG5leHQpfWApO1xuXHRcdGlmICghZWxlLmNoZWNrKG5leHQpKSB7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhjb2xsZWN0aW9uKTtcblx0XHRcdG5leHQub3V0KCk7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV4dCk7XG5cdFx0XHRjb25zb2xlLmxvZyhgZHJvcDogWyR7bmV4dC54fSwke25leHQueX1dYCk7XG5cdFx0XHRjb25zb2xlLmxvZyhgZHJvcCBjb2xsZWN0aW9uIGhhcyA6ICR7Y29sbGVjdGlvbi5sZW5ndGh9YCk7XG5cdFx0XHR0aGlzLm91dExpbmUoZWxlLCBkaXJlY3Rpb24sIGNvbGxlY3Rpb24sIGNhbGxiYWNrKTtcblx0XHR9XG5cdFx0Y29uc29sZS5sb2coYGVuZCBmdW5jICR7cn1gKTtcblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGNoZWNrKGVsKSB7XG5cdFx0aWYgKGVsLnggPT09IHRoaXMueCAmJiBlbC55ID09PSB0aGlzLnkpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnQ7XG4iLCIvKlxuICogQERlc2NyaXB0aW9uOlxuICogQFZlcnNpb246IDEuMC4wXG4gKiBAQXV0aG9yOiBsYXhcbiAqIEBEYXRlOiAyMDIwLTEwLTA4IDE5OjMxOjM1XG4gKiBATGFzdEVkaXRvcnM6IGxheFxuICogQExhc3RFZGl0VGltZTogMjAyMS0wNC0xNiAxNjo1MDoxOFxuICovXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZShcIkAvRWxlbWVudC5qc1wiKTtcbmNsYXNzIFN0YWdlIHtcblx0Y29uc3RydWN0b3IobWF0cml4KSB7XG5cdFx0LyoqXG5cdFx0ICogbWF0cml4OiB0byBiZSBzb2x2ZWRcblx0XHQgKiDlvoXop6PlhrPnmoTnn6npmLVcblx0XHQgKi9cblx0XHR0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuXHRcdC8qKlxuXHRcdCAqIGRseCBoZWlnaHRcblx0XHQgKiDot7PoiJ7pk77nm5jnmoTpq5jluqZcblx0XHQgKi9cblx0XHR0aGlzLmhlaWdodCA9IHRoaXMubWF0cml4Lmxlbmd0aCArIDE7XG5cblx0XHQvKipcblx0XHQgKiBkbHggd2lkdGhcblx0XHQgKiDot7PoiJ7pk77nm5jnmoTlrr3luqZcblx0XHQgKi9cblx0XHR0aGlzLndpZHRoID0gdGhpcy5tYXRyaXhbMF0ucm93Lmxlbmd0aDtcblxuXHRcdC8qKlxuXHRcdCAqIGJhc2UgY2hhaW5cblx0XHQgKiDljp/pk77vvJrlsIbmr4/kuKox6L2s5YyW5Li6RWxlbWVudOWvueixoeW5tuWinuWKoOWktOmDqOWFg+e0oFxuXHRcdCAqL1xuXHRcdHRoaXMuY2hhaW4gPSBbXTtcblxuXHRcdC8qKlxuXHRcdCAqIGRseCByb3dzXG5cdFx0ICog6Lez6Iie6ZO+55qE5q+P6KGM6ZuG5ZCIXG5cdFx0ICovXG5cdFx0dGhpcy5yb3dzID0gW107XG5cblx0XHQvKipcblx0XHQgKiBkbHggY29sc1xuXHRcdCAqIOi3s+iInumTvueahOavj+WIl+mbhuWQiFxuXHRcdCAqL1xuXHRcdHRoaXMuY29scyA9IFtdO1xuXG5cdFx0LyoqXG5cdFx0ICogZGx4IGhlYWQgZWxlbWVudFxuXHRcdCAqIOi3s+iInumTvmhlYWTlhYPntKBcblx0XHQgKi9cblx0XHR0aGlzLmhlYWQgPSBudWxsO1xuXG5cdFx0LyoqXG5cdFx0ICogbWF0cml4IGFuc3dlcnMgY29sbGVjdGlvblxuXHRcdCAqIOefqemYteino+etlOmbhuWQiFxuXHRcdCAqL1xuXHRcdHRoaXMuYW5zID0gW107XG5cblx0XHQvKipcblx0XHQgKiDkuIDnp43op6PlhrPmlrnmoYjnvJPlrZhcblx0XHQgKi9cblx0XHR0aGlzLnBsYW4gPSBbXTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0Y2FsY3VsYXRlKCkge1xuXHRcdGlmICh0aGlzLmRhbmNpbmcoKSkgcmV0dXJuIHRoaXMuZ2V0UmVzdWx0KCk7XG5cdH1cblxuXHRkYW5jaW5nKCkge1xuXHRcdC8vIHNldCBpZFxuXHRcdGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgwLCAxMDApO1xuXHRcdGNvbnNvbGUubG9nKGBkYW5jaW5nLi4uICR7cn1gKTtcblxuXHRcdC8vIHN0ZXAxOiBnZXQgaGVhZC5yaWdodCB3aXRoIG5leHRcblx0XHRjb25zdCBuZXh0ID0gdGhpcy5oZWFkLnJpZ2h0O1xuXHRcdGNvbnNvbGUubG9nKGBuZXh0IGlzIFske25leHQueH0sJHtuZXh0Lnl9XWApO1xuXG5cdFx0Y29uc29sZS5sb2coYGNoZWNrIG5leHQgaXMgaGVhZDogJHtuZXh0LmNoZWNrKHRoaXMuaGVhZCl9YCk7XG5cdFx0aWYgKG5leHQuY2hlY2sodGhpcy5oZWFkKSkge1xuXHRcdFx0Y29uc29sZS5sb2coYGZpbmQgcGxhbjogJHt0aGlzLnBsYW59YCk7XG5cdFx0XHRjb25zb2xlLmxvZyhgZGFuY2luZyBlbmQgJHtyfWApO1xuXHRcdFx0dGhpcy5hbnMucHVzaCh0aGlzLnBsYW4uY29uY2F0KCkpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gc3RlcDI6IG1hcmsgbmV4dFxuXHRcdGNvbnNvbGUubG9nKGBuZXh0IHRhcGApO1xuXHRcdGNvbnN0IHsgbWFya3MsIGRyb3BzIH0gPSBuZXh0LnRhcCgpO1xuXG5cdFx0Y29uc29sZS5sb2coYG5leHQgdGFwIGNvdW50OiAke21hcmtzLmxlbmd0aH1gKTtcblx0XHRpZiAoIW1hcmtzLmxlbmd0aCkgY29uc29sZS5sb2coYGRhbmNpbmcgZW5kICR7cn1gKTtcblx0XHRpZiAoIW1hcmtzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0Y29uc3QgcmVzdWx0cyA9IG1hcmtzLm1hcCgobWFyaywgaSkgPT4ge1xuXHRcdFx0Ly8gc2F2ZSByb3cgY291bnRcblx0XHRcdGNvbnNvbGUubG9nKGB0cnkgc2VsZWN0ICR7aX1gKTtcblx0XHRcdHRoaXMucGxhbi5wdXNoKG1hcmsuY29sLnJvdyk7XG5cblx0XHRcdC8vXG5cdFx0XHRjb25zb2xlLmxvZyhgdGFwIHNlbGVjdCAke2l9IGNvbCBhcyBzYW1lIHJvd2ApO1xuXHRcdFx0Y29uc3QgZHJvcENvbGxlY3Rpb24gPSBtYXJrLnJvd3MubWFwKGVsZSA9PiB7XG5cdFx0XHRcdHJldHVybiBlbGUuY29sLnRhcCgpLmRyb3BzO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnNvbGUubG9nKGByZWRvQ29sbGVjdGlvbjogYCk7XG5cdFx0XHRjb25zb2xlLmxvZyhkcm9wQ29sbGVjdGlvbik7XG5cblx0XHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZGFuY2luZygpO1xuXG5cdFx0XHR0aGlzLnJlZG8oZHJvcENvbGxlY3Rpb24pO1xuXHRcdFx0Y29uc29sZS5sb2coYHJlZG86ICR7dGhpcy5wbGFufWApO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0pO1xuXG5cdFx0Y29uc29sZS5sb2coZHJvcHMpO1xuXHRcdHRoaXMucmVkbyhkcm9wcyk7XG5cblx0XHRjb25zb2xlLmxvZyhgcmVzdWx0ICR7cmVzdWx0cy5pbmNsdWRlcyh0cnVlKX1gKTtcblx0XHRpZiAocmVzdWx0cy5pbmNsdWRlcyh0cnVlKSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Z2V0UmVzdWx0KCkge1xuXHRcdHJldHVybiB0aGlzLmFucy5tYXAocGxhbiA9PiB7XG5cdFx0XHRyZXR1cm4gcGxhbi5tYXAoaW5kZXggPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXRyaXhbaW5kZXggLSAxXTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIOavj+S4quWFg+e0oOi9rOaNouS4uuWFg+e0oOWvueixoeW8leeUqOiHqui6q+WRqOWbtFxuXHQgKi9cblx0aW5pdCgpIHtcblx0XHR0aGlzLmNoYWluID0gdGhpcy5jcmVhdGVDaGFpbigpO1xuXHRcdHRoaXMuY29scyA9IHRoaXMuZ2V0Q29scygpO1xuXHRcdHRoaXMuaGVhZCA9IHRoaXMuZ2V0SGVhZCgpO1xuXHRcdHRoaXMucm93cyA9IHRoaXMuZ2V0Um93cygpO1xuXHRcdHRoaXMubGlua0NoYWluKCk7XG5cdFx0Ly8gdGhpcy5jbGVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBjcmVhdGVDaGFpblxuXHQgKiBAZGVzY3JpcHRpb24gY3JlYXRlIGJhc2UgY2hhaW5cblx0ICogQHJldHVybnMgY2hhaW5cblx0ICovXG5cdGNyZWF0ZUNoYWluKCkge1xuXHRcdC8vIGFkZCBoZWFkIGVsZW1lbnRcblx0XHRjb25zdCBjaGFpbiA9IFtdLmNvbmNhdChcblx0XHRcdHsgcm93OiBuZXcgQXJyYXkodGhpcy53aWR0aCkuZmlsbCh7fSkgfSxcblx0XHRcdHRoaXMubWF0cml4XG5cdFx0KTtcblx0XHRyZXR1cm4gY2hhaW4ubWFwKChyb3csIHgpID0+IHtcblx0XHRcdHJldHVybiByb3cucm93Lm1hcCgoZWwsIHkpID0+IHtcblx0XHRcdFx0Ly8gd2hlbiAxIG9yIHt9XG5cdFx0XHRcdGlmIChlbCkgcmV0dXJuIG5ldyBFbGVtZW50KHsgeCwgeSwgcm93OiB4IH0pO1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uIGdldEhlYWRcblx0ICogQGRlc2NyaXB0aW9uIGNyZWF0ZSBoZWFkIGVsZW1lbnRcblx0ICogQHJldHVybnMgaGVhZFxuXHQgKi9cblx0Z2V0SGVhZCgpIHtcblx0XHRyZXR1cm4gbmV3IEVsZW1lbnQoeyB4OiAtMSwgeTogLTEgfSk7XG5cdH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uIGdldFJvd3Ncblx0ICogQGRlc2NyaXB0aW9uIGNyZWF0ZSBkbHggcm93c1xuXHQgKiBAcmV0dXJucyByb3dzXG5cdCAqL1xuXHRnZXRSb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLmNoYWluLm1hcCgocm93LCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRpID09PSAwID8gW3RoaXMuaGVhZF0gOiBbXSxcblx0XHRcdFx0cm93LmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdFx0aWYgKGVsKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uIGdldENvbHNcblx0ICogQGRlc2NyaXB0aW9uIGNyZWF0ZSBkbHggY29sc1xuXHQgKiBAcmV0dXJucyBjb2xzXG5cdCAqL1xuXHRnZXRDb2xzKCkge1xuXHRcdGNvbnN0IGNvbHMgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY29sID0gdGhpcy5jaGFpblxuXHRcdFx0XHQubWFwKHJvdyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJvd1tpXTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdFx0aWYgKGVsKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRjb2xzLnB1c2goY29sKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbHM7XG5cdH1cblxuXHRsaW5rQ2hhaW4oKSB7XG5cdFx0dGhpcy5yb3dzLm1hcCgocm93LCB4KSA9PiB7XG5cdFx0XHRyb3cubWFwKChlbGUsIHkpID0+IHtcblx0XHRcdFx0ZWxlLnR5cGUgPSB4ID09PSAwID8gKHkgPT09IDAgPyBcImhlYWRcIiA6IFwiY29sXCIpIDogXCJiYXNlXCI7XG5cdFx0XHRcdGVsZS5yaWdodCA9IHJvd1t5ID09PSByb3cubGVuZ3RoIC0gMSA/IDAgOiB5ICsgMV07XG5cdFx0XHRcdGVsZS5sZWZ0ID0gcm93W3kgPT09IDAgPyByb3cubGVuZ3RoIC0gMSA6IHkgLSAxXTtcblx0XHRcdFx0ZWxlLnJvdyA9IHg7XG5cdFx0XHRcdGVsZS51c2UgPSB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbHMubWFwKGNvbCA9PiB7XG5cdFx0XHRjb2wubWFwKChlbGUsIHgpID0+IHtcblx0XHRcdFx0ZWxlLnVwID0gY29sW3ggPT09IDAgPyBjb2wubGVuZ3RoIC0gMSA6IHggLSAxXTtcblx0XHRcdFx0ZWxlLmRvd24gPSBjb2xbeCA9PT0gY29sLmxlbmd0aCAtIDEgPyAwIDogeCArIDFdO1xuXHRcdFx0XHRlbGUuY29sID0gY29sWzBdO1xuXHRcdFx0XHRlbGUudmFsdWUgPSAxO1xuXHRcdFx0XHRlbGUubmFtZSA9IGBbdXBbJHtlbGUudXAueH0sJHtlbGUudXAueX1dLGRvd25bJHtlbGUuZG93bi54fSwke2VsZS5kb3duLnl9XSxsZWZ0WyR7ZWxlLmxlZnQueH0sJHtlbGUubGVmdC55fV0scmlnaHRbJHtlbGUucmlnaHQueH0sJHtlbGUucmlnaHQueX1dXWA7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDmuIXpmaTmiYDmnInnqbrlr7nosaFcblx0ICovXG5cdGNsZWFyKCkge1xuXHRcdHRoaXMuZGFuY2UubWFwKHJvdyA9PiB7XG5cdFx0XHRyb3cubWFwKGVsID0+IHtcblx0XHRcdFx0aWYgKCFlbC51c2UpIGVsLm91dCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogcmVkbyBlbGVtZW50IGxpc3Rcblx0ICogQHBhcmFtIHthcnJheX0gYXJyXG5cdCAqL1xuXHRyZWRvKGFycikge1xuXHRcdGFyci5tYXAob2JqID0+IHtcblx0XHRcdGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0XHRvYmoubWFwKGVsZSA9PiB7XG5cdFx0XHRcdFx0ZWxlLmluKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2JqLmluKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8gcmVkbyBwbGFuXG5cdFx0dGhpcy5wbGFuLnBvcCgpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==