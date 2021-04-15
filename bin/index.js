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
 * @LastEditTime: 2021-04-15 15:02:30
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

		this.num = 0;
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
		return this.outLine(this, "down", [], collection => {
			this.outLine(this.down, "right", collection);
		});
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
		const next = ele[direction];
		console.log(
			`enter func ${this.num}: this is [${ele.x},${ele.y}] next is [${next.x},${next.y}]`
		);
		this.num++;
		console.log(`is not ont ${!ele.check(next)}`);
		if (!ele.check(next)) {
			callback && callback(collection);
			next.out();
			collection.push(next);
			console.log(`drop: [${next.x},${next.y}]`);
			console.log(`collection: ${collection.length}`);
			this.outLine(ele, direction, collection);
		}
		console.log(`end func ${this.num}`);
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
 * @LastEditTime: 2021-04-15 14:28:47
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdGFnZS8uL3NyYy9FbGVtZW50LmpzIiwid2VicGFjazovL1N0YWdlLy4vc3JjL1N0YWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1N0YWdlLmpzXCIpO1xuIiwiLypcbiAqIEBEZXNjcmlwdGlvbjpcbiAqIEBWZXJzaW9uOiAxLjAuMFxuICogQEF1dGhvcjogbGF4XG4gKiBARGF0ZTogMjAyMC0xMC0wOCAxOToyNDozN1xuICogQExhc3RFZGl0b3JzOiBsYXhcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDQtMTUgMTU6MDI6MzBcbiAqL1xuY2xhc3MgRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHAgPSB7fSkge1xuXHRcdC8vIGxpbmsgZWxlbWVudFxuXHRcdHRoaXMucmlnaHQgPSBwLnJpZ2h0IHx8IG51bGw7XG5cdFx0dGhpcy5sZWZ0ID0gcC5sZWZ0IHx8IG51bGw7XG5cdFx0dGhpcy51cCA9IHAudXAgfHwgbnVsbDtcblx0XHR0aGlzLmRvd24gPSBwLmRvd24gfHwgbnVsbDtcblx0XHR0aGlzLmNvbCA9IHAuY29sIHx8IG51bGw7XG5cdFx0dGhpcy5yb3cgPSBwLnJvdyB8fCBudWxsO1xuXG5cdFx0Ly8gbWF0cml4IDAvMVxuXHRcdHRoaXMudmFsdWUgPSBwLnZhbHVlO1xuXG5cdFx0Ly8gaGVhZC9iYXNlL2NvbFxuXHRcdHRoaXMudHlwZSA9IHAudHlwZSB8fCBcImJhc2VcIjtcblx0XHQvLyBjaGVjayB1c2VkXG5cdFx0dGhpcy51c2UgPSBwLnVzZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBwLnVzZTtcblx0XHR0aGlzLm5hbWUgPSBwLm5hbWUgfHwgXCJcIjtcblxuXHRcdC8vIHBvaW50IHgseVxuXHRcdHRoaXMueCA9IHAueDtcblx0XHR0aGlzLnkgPSBwLnk7XG5cblx0XHR0aGlzLm51bSA9IDA7XG5cdH1cblxuXHQvKipcblx0ICogZHJvcCBlbGVtZW50IGZyb20gZGFuY2Vcblx0ICovXG5cdG91dCgpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzLnJpZ2h0O1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXMubGVmdDtcblx0XHR0aGlzLnVwLmRvd24gPSB0aGlzLmRvd247XG5cdFx0dGhpcy5kb3duLnVwID0gdGhpcy51cDtcblx0XHR0aGlzLnVzZSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGVudGVyIGRhbmNlXG5cdCAqL1xuXHRpbigpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzO1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXM7XG5cdFx0dGhpcy51cC5kb3duID0gdGhpcztcblx0XHR0aGlzLmRvd24udXAgPSB0aGlzO1xuXHRcdHRoaXMudXNlID0gdHJ1ZTtcblx0fVxuXG5cdHRhcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRMaW5lKHRoaXMsIFwiZG93blwiLCBbXSwgY29sbGVjdGlvbiA9PiB7XG5cdFx0XHR0aGlzLm91dExpbmUodGhpcy5kb3duLCBcInJpZ2h0XCIsIGNvbGxlY3Rpb24pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBvdXRMaW5lXG5cdCAqIEBkZXNjcmlwdGlvbiBvdXQgb2YgbGluZShyb3cgb3IgY29sKVxuXHQgKiBAcGFyYW0geyp9IGVsZVxuXHQgKiBAcGFyYW0geyp9IGRpcmVjdGlvblxuXHQgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG5cdCAqIEByZXR1cm5zXG5cdCAqL1xuXHRvdXRMaW5lKGVsZSwgZGlyZWN0aW9uLCBjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IG5leHQgPSBlbGVbZGlyZWN0aW9uXTtcblx0XHRjb25zb2xlLmxvZyhcblx0XHRcdGBlbnRlciBmdW5jICR7dGhpcy5udW19OiB0aGlzIGlzIFske2VsZS54fSwke2VsZS55fV0gbmV4dCBpcyBbJHtuZXh0Lnh9LCR7bmV4dC55fV1gXG5cdFx0KTtcblx0XHR0aGlzLm51bSsrO1xuXHRcdGNvbnNvbGUubG9nKGBpcyBub3Qgb250ICR7IWVsZS5jaGVjayhuZXh0KX1gKTtcblx0XHRpZiAoIWVsZS5jaGVjayhuZXh0KSkge1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soY29sbGVjdGlvbik7XG5cdFx0XHRuZXh0Lm91dCgpO1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5leHQpO1xuXHRcdFx0Y29uc29sZS5sb2coYGRyb3A6IFske25leHQueH0sJHtuZXh0Lnl9XWApO1xuXHRcdFx0Y29uc29sZS5sb2coYGNvbGxlY3Rpb246ICR7Y29sbGVjdGlvbi5sZW5ndGh9YCk7XG5cdFx0XHR0aGlzLm91dExpbmUoZWxlLCBkaXJlY3Rpb24sIGNvbGxlY3Rpb24pO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhgZW5kIGZ1bmMgJHt0aGlzLm51bX1gKTtcblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGNoZWNrKGVsKSB7XG5cdFx0aWYgKGVsLnggPT09IHRoaXMueCAmJiBlbC55ID09PSB0aGlzLnkpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnQ7XG4iLCIvKlxuICogQERlc2NyaXB0aW9uOlxuICogQFZlcnNpb246IDEuMC4wXG4gKiBAQXV0aG9yOiBsYXhcbiAqIEBEYXRlOiAyMDIwLTEwLTA4IDE5OjMxOjM1XG4gKiBATGFzdEVkaXRvcnM6IGxheFxuICogQExhc3RFZGl0VGltZTogMjAyMS0wNC0xNSAxNDoyODo0N1xuICovXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZShcIkAvRWxlbWVudC5qc1wiKTtcbmNsYXNzIFN0YWdlIHtcblx0Y29uc3RydWN0b3IobWF0cml4KSB7XG5cdFx0LyoqXG5cdFx0ICogbWF0cml4OiB0byBiZSBzb2x2ZWRcblx0XHQgKiDlvoXop6PlhrPnmoTnn6npmLVcblx0XHQgKi9cblx0XHR0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuXHRcdC8qKlxuXHRcdCAqIGRseCBoZWlnaHRcblx0XHQgKiDot7PoiJ7pk77nm5jnmoTpq5jluqZcblx0XHQgKi9cblx0XHR0aGlzLmhlaWdodCA9IHRoaXMubWF0cml4Lmxlbmd0aCArIDE7XG5cblx0XHQvKipcblx0XHQgKiBkbHggd2lkdGhcblx0XHQgKiDot7PoiJ7pk77nm5jnmoTlrr3luqZcblx0XHQgKi9cblx0XHR0aGlzLndpZHRoID0gdGhpcy5tYXRyaXhbMF0ucm93Lmxlbmd0aDtcblxuXHRcdC8qKlxuXHRcdCAqIGJhc2UgY2hhaW5cblx0XHQgKiDljp/pk77vvJrlsIbmr4/kuKox6L2s5YyW5Li6RWxlbWVudOWvueixoeW5tuWinuWKoOWktOmDqOWFg+e0oFxuXHRcdCAqL1xuXHRcdHRoaXMuY2hhaW4gPSBbXTtcblxuXHRcdC8qKlxuXHRcdCAqIGRseCByb3dzXG5cdFx0ICog6Lez6Iie6ZO+55qE5q+P6KGM6ZuG5ZCIXG5cdFx0ICovXG5cdFx0dGhpcy5yb3dzID0gW107XG5cblx0XHQvKipcblx0XHQgKiBkbHggY29sc1xuXHRcdCAqIOi3s+iInumTvueahOavj+WIl+mbhuWQiFxuXHRcdCAqL1xuXHRcdHRoaXMuY29scyA9IFtdO1xuXG5cdFx0LyoqXG5cdFx0ICogZGx4IGhlYWQgZWxlbWVudFxuXHRcdCAqIOi3s+iInumTvmhlYWTlhYPntKBcblx0XHQgKi9cblx0XHR0aGlzLmhlYWQgPSBudWxsO1xuXG5cdFx0LyoqXG5cdFx0ICogbWF0cml4IGFuc3dlcnMgY29sbGVjdGlvblxuXHRcdCAqIOefqemYteino+etlOmbhuWQiFxuXHRcdCAqL1xuXHRcdHRoaXMuYW5zID0gW107XG5cblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGNhbGN1bGF0ZSgpIHtcblx0XHR0aGlzLmRhbmNpbmcoKTtcblx0fVxuXG5cdGRhbmNpbmcoKSB7XG5cdFx0Ly8g6I635Y+WaGVhZC5yaWdodFxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLmhlYWQucmlnaHQ7XG5cdFx0aWYgKG5leHQuY2hlY2sodGhpcy5oZWFkKSkgcmV0dXJuIHRydWU7XG5cblx0XHQvLyDmoIforrByaWdodFxuXHRcdGNvbnN0IG5leHRUYXBzID0gbmV4dC50YXAoKTtcblx0XHRpZiAobmV4dC5jaGVjayhuZXh0LmRvd24pKSByZXR1cm4gZmFsc2U7XG5cblx0XHRuZXh0VGFwcy5tYXAocm93ID0+IHtcblx0XHRcdC8vIOiOt+WPlnJpZ2h056ys5LiA5bqP5YiXXG5cdFx0XHRjb25zdCBuZXh0Rmlyc3QgPSByb3dbMF07XG5cblx0XHRcdC8vIOagh+iusOivpeesrOS4gOW6j+WIl+WQjOihjOWFtuS9meWFg+e0oOeahOWIl+mmluWFg+e0oFxuXHRcdFx0Y29uc3QgbmV4dEZpcnN0VGFwcyA9IHRoaXMudGFwQnlSb3cobmV4dEZpcnN0KTtcblxuXHRcdFx0Ly8g5b6X5Yiw5a2Q6Lez6Iie6ZO+55uYXG5cdFx0XHRpZiAodGhpcy5kYW5jaW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHQvLyDov5Tlm57or6XlhYPntKDlkIzooYznmoTlhbbkvZnlhYPntKDmiYDlnKjnmoTliJfpppblhYPntKBcblx0XHRcdHRoaXMudGFwQmFjayhuZXh0Rmlyc3RUYXBzKTtcblx0XHRcdHRoaXMuYW5zLnB1c2gobmV4dEZpcnN0KTtcblx0XHR9KTtcblx0XHR0aGlzLnRhcEJhY2sobmV4dFRhcHMpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDmr4/kuKrlhYPntKDovazmjaLkuLrlhYPntKDlr7nosaHlvJXnlKjoh6rouqvlkajlm7Rcblx0ICovXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5jaGFpbiA9IHRoaXMuY3JlYXRlQ2hhaW4oKTtcblx0XHR0aGlzLnJvd3MgPSB0aGlzLmdldFJvd3MoKTtcblx0XHR0aGlzLmNvbHMgPSB0aGlzLmdldENvbHMoKTtcblx0XHR0aGlzLmhlYWQgPSB0aGlzLmdldEhlYWQoKTtcblx0XHR0aGlzLmxpbmtDaGFpbigpO1xuXHRcdC8vIHRoaXMuY2xlYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gY3JlYXRlQ2hhaW5cblx0ICogQGRlc2NyaXB0aW9uIGNyZWF0ZSBiYXNlIGNoYWluXG5cdCAqIEByZXR1cm5zIGNoYWluXG5cdCAqL1xuXHRjcmVhdGVDaGFpbigpIHtcblx0XHQvLyBhZGQgaGVhZCBlbGVtZW50XG5cdFx0Y29uc3QgY2hhaW4gPSBbXS5jb25jYXQoXG5cdFx0XHR7IHJvdzogbmV3IEFycmF5KHRoaXMud2lkdGgpLmZpbGwoe30pIH0sXG5cdFx0XHR0aGlzLm1hdHJpeFxuXHRcdCk7XG5cdFx0cmV0dXJuIGNoYWluLm1hcCgocm93LCB4KSA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnJvdy5tYXAoKGVsLCB5KSA9PiB7XG5cdFx0XHRcdC8vIHdoZW4gMSBvciB7fVxuXHRcdFx0XHRpZiAoZWwpIHJldHVybiBuZXcgRWxlbWVudCh7IHgsIHksIHJvdzogeCB9KTtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvbiBnZXRIZWFkXG5cdCAqIEBkZXNjcmlwdGlvbiBjcmVhdGUgaGVhZCBlbGVtZW50XG5cdCAqIEByZXR1cm5zIGhlYWRcblx0ICovXG5cdGdldEhlYWQoKSB7XG5cdFx0cmV0dXJuIG5ldyBFbGVtZW50KHtcblx0XHRcdHR5cGU6IFwiaGVhZFwiLFxuXHRcdFx0cmlnaHQ6IHRoaXMucm93c1swXVswXSxcblx0XHRcdGxlZnQ6IHRoaXMucm93c1swXVt0aGlzLnJvd3MubGVuZ3RoIC0gMV0sXG5cdFx0XHR1c2U6IHRydWUsXG5cdFx0XHRyb3c6IDBcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gZ2V0Um93c1xuXHQgKiBAZGVzY3JpcHRpb24gY3JlYXRlIGRseCByb3dzXG5cdCAqIEByZXR1cm5zIHJvd3Ncblx0ICovXG5cdGdldFJvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2hhaW4ubWFwKHJvdyA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdGlmIChlbCkgcmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gZ2V0Q29sc1xuXHQgKiBAZGVzY3JpcHRpb24gY3JlYXRlIGRseCBjb2xzXG5cdCAqIEByZXR1cm5zIGNvbHNcblx0ICovXG5cdGdldENvbHMoKSB7XG5cdFx0Y29uc3QgY29scyA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjb2wgPSB0aGlzLmNoYWluXG5cdFx0XHRcdC5tYXAocm93ID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcm93W2ldO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZmlsdGVyKGVsID0+IHtcblx0XHRcdFx0XHRpZiAoZWwpIHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdGNvbHMucHVzaChjb2wpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29scztcblx0fVxuXG5cdGxpbmtDaGFpbigpIHtcblx0XHR0aGlzLnJvd3MubWFwKChyb3csIHgpID0+IHtcblx0XHRcdHJvdy5tYXAoKGVsZSwgeSkgPT4ge1xuXHRcdFx0XHRpZiAocm93Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdGVsZS5yaWdodCA9IGVsZTtcblx0XHRcdFx0XHRlbGUubGVmdCA9IGVsZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbGUudHlwZSA9IHggPT09IDAgPyBcImNvbFwiIDogXCJiYXNlXCI7XG5cdFx0XHRcdGVsZS5yaWdodCA9IHJvd1t5ID09PSByb3cubGVuZ3RoIC0gMSA/IDAgOiB5ICsgMV07XG5cdFx0XHRcdGVsZS5sZWZ0ID0gcm93W3kgPT09IDAgPyByb3cubGVuZ3RoIC0gMSA6IHkgLSAxXTtcblx0XHRcdFx0ZWxlLnJvdyA9IHg7XG5cdFx0XHRcdGVsZS51c2UgPSB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbHMubWFwKGNvbCA9PiB7XG5cdFx0XHRjb2wubWFwKChlbGUsIHgpID0+IHtcblx0XHRcdFx0aWYgKGNvbC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRlbGUudXAgPSBlbGU7XG5cdFx0XHRcdFx0ZWxlLmRvd24gPSBlbGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlLnVwID0gY29sW3ggPT09IDAgPyBjb2wubGVuZ3RoIC0gMSA6IHggLSAxXTtcblx0XHRcdFx0ZWxlLmRvd24gPSBjb2xbeCA9PT0gY29sLmxlbmd0aCAtIDEgPyAwIDogeCArIDFdO1xuXHRcdFx0XHRlbGUuY29sID0gY29sWzBdO1xuXHRcdFx0XHRlbGUudmFsdWUgPSAxO1xuXHRcdFx0XHRlbGUubmFtZSA9IGBbdXBbJHtlbGUudXAueH0sJHtlbGUudXAueX1dLGRvd25bJHtlbGUuZG93bi54fSwke2VsZS5kb3duLnl9XSxsZWZ0WyR7ZWxlLmxlZnQueH0sJHtlbGUubGVmdC55fV0scmlnaHRbJHtlbGUucmlnaHQueH0sJHtlbGUucmlnaHQueX1dXWA7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDmuIXpmaTmiYDmnInnqbrlr7nosaFcblx0ICovXG5cdGNsZWFyKCkge1xuXHRcdHRoaXMuZGFuY2UubWFwKHJvdyA9PiB7XG5cdFx0XHRyb3cubWFwKGVsID0+IHtcblx0XHRcdFx0aWYgKCFlbC51c2UpIGVsLm91dCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog5qCH6K6w6K+l5YWD57Sg5omA5Zyo6KGM5Ymp5L2Z5YWD57Sg55qE6aaW5YiX5YWD57SgXG5cdCAqIEBwYXJhbSB7Kn0gZmlyc3Rcblx0ICovXG5cdHRhcEJ5Um93KGZpcnN0KSB7XG5cdFx0cmV0dXJuIHRoaXMubWF0cml4W2ZpcnN0LnhdLnJlZHVjZSgoZWwsIG5leHQpID0+IHtcblx0XHRcdGlmIChuZXh0LnkgIT09IGZpcnN0LnkpIHtcblx0XHRcdFx0cmV0dXJuIGVsLmNvbmNhdCh0aGlzLnRhcChuZXh0LnkpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9LCB7fSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGFnZTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==