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
 * @LastEditTime: 2021-04-15 09:50:47
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
		this.value = p.value || 0;

		// head/base/col
		this.type = p.type || "base";
		// check used
		this.use = p.use === undefined ? false : p.use;
		this.name = p.name || "";

		// point x,y
		this.x = p.x || null;
		this.y = p.y || null;
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
		return this.outLine(this, "down", collection => {
			collection.push(this.outLine(this.down, "right"));
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
	outLine(ele, direction, callback) {
		const collection = [];
		const next = ele[direction];
		if (!ele.check(next)) {
			callback && callback(collection);
			next.out();
			collection.push(next);
			this.outLine(ele, direction);
		}
		return collection;
	}

	/**
	 * element activated
	 */
	activate() {
		this.value = 1;
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
 * @LastEditTime: 2021-04-15 09:51:15
 */
const Element = __webpack_require__(/*! @/Element.js */ "./src/Element.js");
class Stage {
	constructor(matrix) {
		// 跳舞链盘
		this.matrix = matrix;
		this.height = this.matrix.length + 1;
		this.width = this.matrix[0].row.length;
		this.chain = [];
		this.rows = [];
		this.cols = [];
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
		this.rows = this.getRows();
		this.cols = this.getCols();
		this.linkChain();
		// this.clear();
	}

	createChain() {
		const chain = [].concat(
			{ row: new Array(this.width).fill({}) },
			this.matrix
		);
		return chain.map((row, x) => {
			return row.row.map((el, y) => {
				if (el) return new Element({ x, y, row: x });
				return undefined;
			});
		});
	}

	getRows() {
		return this.chain.map(row => {
			return row.filter(el => {
				if (el) return true;
			});
		});
	}

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
				ele.use = true;
			});
		});
		this.cols.map(col => {
			col.map((ele, x) => {
				ele.up = col[x === 0 ? col.length - 1 : x - 1];
				ele.down = col[x === col.length - 1 ? 0 : x + 1];
				ele.col = col[0];
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdGFnZS8uL3NyYy9FbGVtZW50LmpzIiwid2VicGFjazovL1N0YWdlLy4vc3JjL1N0YWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1N0YWdlLmpzXCIpO1xuIiwiLypcbiAqIEBEZXNjcmlwdGlvbjpcbiAqIEBWZXJzaW9uOiAxLjAuMFxuICogQEF1dGhvcjogbGF4XG4gKiBARGF0ZTogMjAyMC0xMC0wOCAxOToyNDozN1xuICogQExhc3RFZGl0b3JzOiBsYXhcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDQtMTUgMDk6NTA6NDdcbiAqL1xuY2xhc3MgRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHAgPSB7fSkge1xuXHRcdC8vIGxpbmsgZWxlbWVudFxuXHRcdHRoaXMucmlnaHQgPSBwLnJpZ2h0IHx8IG51bGw7XG5cdFx0dGhpcy5sZWZ0ID0gcC5sZWZ0IHx8IG51bGw7XG5cdFx0dGhpcy51cCA9IHAudXAgfHwgbnVsbDtcblx0XHR0aGlzLmRvd24gPSBwLmRvd24gfHwgbnVsbDtcblx0XHR0aGlzLmNvbCA9IHAuY29sIHx8IG51bGw7XG5cdFx0dGhpcy5yb3cgPSBwLnJvdyB8fCBudWxsO1xuXG5cdFx0Ly8gbWF0cml4IDAvMVxuXHRcdHRoaXMudmFsdWUgPSBwLnZhbHVlIHx8IDA7XG5cblx0XHQvLyBoZWFkL2Jhc2UvY29sXG5cdFx0dGhpcy50eXBlID0gcC50eXBlIHx8IFwiYmFzZVwiO1xuXHRcdC8vIGNoZWNrIHVzZWRcblx0XHR0aGlzLnVzZSA9IHAudXNlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHAudXNlO1xuXHRcdHRoaXMubmFtZSA9IHAubmFtZSB8fCBcIlwiO1xuXG5cdFx0Ly8gcG9pbnQgeCx5XG5cdFx0dGhpcy54ID0gcC54IHx8IG51bGw7XG5cdFx0dGhpcy55ID0gcC55IHx8IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogZHJvcCBlbGVtZW50IGZyb20gZGFuY2Vcblx0ICovXG5cdG91dCgpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzLnJpZ2h0O1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXMubGVmdDtcblx0XHR0aGlzLnVwLmRvd24gPSB0aGlzLmRvd247XG5cdFx0dGhpcy5kb3duLnVwID0gdGhpcy51cDtcblx0XHR0aGlzLnVzZSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGVudGVyIGRhbmNlXG5cdCAqL1xuXHRpbigpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzO1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXM7XG5cdFx0dGhpcy51cC5kb3duID0gdGhpcztcblx0XHR0aGlzLmRvd24udXAgPSB0aGlzO1xuXHRcdHRoaXMudXNlID0gdHJ1ZTtcblx0fVxuXG5cdHRhcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRMaW5lKHRoaXMsIFwiZG93blwiLCBjb2xsZWN0aW9uID0+IHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaCh0aGlzLm91dExpbmUodGhpcy5kb3duLCBcInJpZ2h0XCIpKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gb3V0TGluZVxuXHQgKiBAZGVzY3JpcHRpb24gb3V0IG9mIGxpbmUocm93IG9yIGNvbClcblx0ICogQHBhcmFtIHsqfSBlbGVcblx0ICogQHBhcmFtIHsqfSBkaXJlY3Rpb25cblx0ICogQHBhcmFtIHsqfSBjYWxsYmFja1xuXHQgKiBAcmV0dXJuc1xuXHQgKi9cblx0b3V0TGluZShlbGUsIGRpcmVjdGlvbiwgY2FsbGJhY2spIHtcblx0XHRjb25zdCBjb2xsZWN0aW9uID0gW107XG5cdFx0Y29uc3QgbmV4dCA9IGVsZVtkaXJlY3Rpb25dO1xuXHRcdGlmICghZWxlLmNoZWNrKG5leHQpKSB7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhjb2xsZWN0aW9uKTtcblx0XHRcdG5leHQub3V0KCk7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV4dCk7XG5cdFx0XHR0aGlzLm91dExpbmUoZWxlLCBkaXJlY3Rpb24pO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBlbGVtZW50IGFjdGl2YXRlZFxuXHQgKi9cblx0YWN0aXZhdGUoKSB7XG5cdFx0dGhpcy52YWx1ZSA9IDE7XG5cdH1cblxuXHRjaGVjayhlbCkge1xuXHRcdGlmIChlbC54ID09PSB0aGlzLnggJiYgZWwueSA9PT0gdGhpcy55KSByZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50O1xuIiwiLypcbiAqIEBEZXNjcmlwdGlvbjpcbiAqIEBWZXJzaW9uOiAxLjAuMFxuICogQEF1dGhvcjogbGF4XG4gKiBARGF0ZTogMjAyMC0xMC0wOCAxOTozMTozNVxuICogQExhc3RFZGl0b3JzOiBsYXhcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDQtMTUgMDk6NTE6MTVcbiAqL1xuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoXCJAL0VsZW1lbnQuanNcIik7XG5jbGFzcyBTdGFnZSB7XG5cdGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuXHRcdC8vIOi3s+iInumTvuebmFxuXHRcdHRoaXMubWF0cml4ID0gbWF0cml4O1xuXHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5tYXRyaXgubGVuZ3RoICsgMTtcblx0XHR0aGlzLndpZHRoID0gdGhpcy5tYXRyaXhbMF0ucm93Lmxlbmd0aDtcblx0XHR0aGlzLmNoYWluID0gW107XG5cdFx0dGhpcy5yb3dzID0gW107XG5cdFx0dGhpcy5jb2xzID0gW107XG5cdFx0dGhpcy5pbml0KCk7XG5cdFx0Ly8gdGhpcy5oZWFkID0gdGhpcy5kYW5jZVswXVswXTtcblx0XHR0aGlzLmFucyA9IFtdO1xuXHR9XG5cblx0Y2FsY3VsYXRlKCkge1xuXHRcdHRoaXMuZGFuY2luZygpO1xuXHR9XG5cblx0ZGFuY2luZygpIHtcblx0XHQvLyDojrflj5ZoZWFkLnJpZ2h0XG5cdFx0Y29uc3QgbmV4dCA9IHRoaXMuaGVhZC5yaWdodDtcblx0XHRpZiAobmV4dC5jaGVjayh0aGlzLmhlYWQpKSByZXR1cm4gdHJ1ZTtcblxuXHRcdC8vIOagh+iusHJpZ2h0XG5cdFx0Y29uc3QgbmV4dFRhcHMgPSBuZXh0LnRhcCgpO1xuXHRcdGlmIChuZXh0LmNoZWNrKG5leHQuZG93bikpIHJldHVybiBmYWxzZTtcblxuXHRcdG5leHRUYXBzLm1hcChyb3cgPT4ge1xuXHRcdFx0Ly8g6I635Y+WcmlnaHTnrKzkuIDluo/liJdcblx0XHRcdGNvbnN0IG5leHRGaXJzdCA9IHJvd1swXTtcblxuXHRcdFx0Ly8g5qCH6K6w6K+l56ys5LiA5bqP5YiX5ZCM6KGM5YW25L2Z5YWD57Sg55qE5YiX6aaW5YWD57SgXG5cdFx0XHRjb25zdCBuZXh0Rmlyc3RUYXBzID0gdGhpcy50YXBCeVJvdyhuZXh0Rmlyc3QpO1xuXG5cdFx0XHQvLyDlvpfliLDlrZDot7PoiJ7pk77nm5hcblx0XHRcdGlmICh0aGlzLmRhbmNpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdC8vIOi/lOWbnuivpeWFg+e0oOWQjOihjOeahOWFtuS9meWFg+e0oOaJgOWcqOeahOWIl+mmluWFg+e0oFxuXHRcdFx0dGhpcy50YXBCYWNrKG5leHRGaXJzdFRhcHMpO1xuXHRcdFx0dGhpcy5hbnMucHVzaChuZXh0Rmlyc3QpO1xuXHRcdH0pO1xuXHRcdHRoaXMudGFwQmFjayhuZXh0VGFwcyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIOavj+S4quWFg+e0oOi9rOaNouS4uuWFg+e0oOWvueixoeW8leeUqOiHqui6q+WRqOWbtFxuXHQgKi9cblx0aW5pdCgpIHtcblx0XHR0aGlzLmNoYWluID0gdGhpcy5jcmVhdGVDaGFpbigpO1xuXHRcdHRoaXMucm93cyA9IHRoaXMuZ2V0Um93cygpO1xuXHRcdHRoaXMuY29scyA9IHRoaXMuZ2V0Q29scygpO1xuXHRcdHRoaXMubGlua0NoYWluKCk7XG5cdFx0Ly8gdGhpcy5jbGVhcigpO1xuXHR9XG5cblx0Y3JlYXRlQ2hhaW4oKSB7XG5cdFx0Y29uc3QgY2hhaW4gPSBbXS5jb25jYXQoXG5cdFx0XHR7IHJvdzogbmV3IEFycmF5KHRoaXMud2lkdGgpLmZpbGwoe30pIH0sXG5cdFx0XHR0aGlzLm1hdHJpeFxuXHRcdCk7XG5cdFx0cmV0dXJuIGNoYWluLm1hcCgocm93LCB4KSA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnJvdy5tYXAoKGVsLCB5KSA9PiB7XG5cdFx0XHRcdGlmIChlbCkgcmV0dXJuIG5ldyBFbGVtZW50KHsgeCwgeSwgcm93OiB4IH0pO1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRSb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLmNoYWluLm1hcChyb3cgPT4ge1xuXHRcdFx0cmV0dXJuIHJvdy5maWx0ZXIoZWwgPT4ge1xuXHRcdFx0XHRpZiAoZWwpIHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRDb2xzKCkge1xuXHRcdGNvbnN0IGNvbHMgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY29sID0gdGhpcy5jaGFpblxuXHRcdFx0XHQubWFwKHJvdyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJvd1tpXTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmZpbHRlcihlbCA9PiB7XG5cdFx0XHRcdFx0aWYgKGVsKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRjb2xzLnB1c2goY29sKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbHM7XG5cdH1cblxuXHRsaW5rQ2hhaW4oKSB7XG5cdFx0dGhpcy5yb3dzLm1hcCgocm93LCB4KSA9PiB7XG5cdFx0XHRyb3cubWFwKChlbGUsIHkpID0+IHtcblx0XHRcdFx0ZWxlLnR5cGUgPSB4ID09PSAwID8gKHkgPT09IDAgPyBcImhlYWRcIiA6IFwiY29sXCIpIDogXCJiYXNlXCI7XG5cdFx0XHRcdGVsZS5yaWdodCA9IHJvd1t5ID09PSByb3cubGVuZ3RoIC0gMSA/IDAgOiB5ICsgMV07XG5cdFx0XHRcdGVsZS5sZWZ0ID0gcm93W3kgPT09IDAgPyByb3cubGVuZ3RoIC0gMSA6IHkgLSAxXTtcblx0XHRcdFx0ZWxlLnVzZSA9IHRydWU7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHR0aGlzLmNvbHMubWFwKGNvbCA9PiB7XG5cdFx0XHRjb2wubWFwKChlbGUsIHgpID0+IHtcblx0XHRcdFx0ZWxlLnVwID0gY29sW3ggPT09IDAgPyBjb2wubGVuZ3RoIC0gMSA6IHggLSAxXTtcblx0XHRcdFx0ZWxlLmRvd24gPSBjb2xbeCA9PT0gY29sLmxlbmd0aCAtIDEgPyAwIDogeCArIDFdO1xuXHRcdFx0XHRlbGUuY29sID0gY29sWzBdO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog5riF6Zmk5omA5pyJ56m65a+56LGhXG5cdCAqL1xuXHRjbGVhcigpIHtcblx0XHR0aGlzLmRhbmNlLm1hcChyb3cgPT4ge1xuXHRcdFx0cm93Lm1hcChlbCA9PiB7XG5cdFx0XHRcdGlmICghZWwudXNlKSBlbC5vdXQoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIOagh+iusOivpeWFg+e0oOaJgOWcqOihjOWJqeS9meWFg+e0oOeahOmmluWIl+WFg+e0oFxuXHQgKiBAcGFyYW0geyp9IGZpcnN0XG5cdCAqL1xuXHR0YXBCeVJvdyhmaXJzdCkge1xuXHRcdHJldHVybiB0aGlzLm1hdHJpeFtmaXJzdC54XS5yZWR1Y2UoKGVsLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAobmV4dC55ICE9PSBmaXJzdC55KSB7XG5cdFx0XHRcdHJldHVybiBlbC5jb25jYXQodGhpcy50YXAobmV4dC55KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIOWbnuagh+WFg+e0oOmbhuWQiFxuXHQgKiBAcGFyYW0geyp9IGxpc3Rcblx0ICovXG5cdHRhcEJhY2soKSB7XG5cdFx0dGhpcy5saXN0Lm1hcChyb3cgPT4ge1xuXHRcdFx0cm93Lm1hcChlbCA9PiB7XG5cdFx0XHRcdGVsLmluKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxubW9kdWxlLmV4cG9ydHMgPSBTdGFnZTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==