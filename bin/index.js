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
 * @LastEditTime: 2021-04-14 18:25:46
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
 * @LastEditTime: 2021-04-14 19:35:26
 */
const Element = __webpack_require__(/*! @/Element.js */ "./src/Element.js");
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
		// this.linkChain();
		// this.clear();
	}

	createChain() {
		const chain = [].concat(
			{ row: new Array(this.width).fill(null) },
			this.matrix
		);
		return chain.map(row => {
			return row.row.map(() => {
				return new Element();
			});
		});
	}

	linkChain() {
		this.chain.map((row, x, arr) => {
			row.row.map((ele, y) => {
				ele.type = x === 0 ? (y === 0 ? "head" : "col") : "base";
				ele.right = row[y === row.length - 1 ? 0 : y + 1];
				ele.left = row[y === 0 ? row.length - 1 : y - 1];
				ele.up = arr[x === 0 ? arr.length - 1 : x - 1][y];
				ele.down = arr[x === arr.length - 1 ? 0 : x + 1][y];
				ele.row = x;
				ele.col = arr[0][y];
				ele.use = x === 0 ? true : ele === 1;
				ele.x = x;
				ele.y = y;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TdGFnZS8uL3NyYy9FbGVtZW50LmpzIiwid2VicGFjazovL1N0YWdlLy4vc3JjL1N0YWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1N0YWdlLmpzXCIpO1xuIiwiLypcbiAqIEBEZXNjcmlwdGlvbjpcbiAqIEBWZXJzaW9uOiAxLjAuMFxuICogQEF1dGhvcjogbGF4XG4gKiBARGF0ZTogMjAyMC0xMC0wOCAxOToyNDozN1xuICogQExhc3RFZGl0b3JzOiBsYXhcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjEtMDQtMTQgMTg6MjU6NDZcbiAqL1xuY2xhc3MgRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKHAgPSB7fSkge1xuXHRcdC8vIGxpbmsgZWxlbWVudFxuXHRcdHRoaXMucmlnaHQgPSBwLnJpZ2h0IHx8IG51bGw7XG5cdFx0dGhpcy5sZWZ0ID0gcC5sZWZ0IHx8IG51bGw7XG5cdFx0dGhpcy51cCA9IHAudXAgfHwgbnVsbDtcblx0XHR0aGlzLmRvd24gPSBwLmRvd24gfHwgbnVsbDtcblx0XHR0aGlzLmNvbCA9IHAuY29sIHx8IG51bGw7XG5cdFx0dGhpcy5yb3cgPSBwLnJvdyB8fCBudWxsO1xuXG5cdFx0Ly8gbWF0cml4IDAvMVxuXHRcdHRoaXMudmFsdWUgPSBwLnZhbHVlIHx8IDA7XG5cblx0XHQvLyBoZWFkL2Jhc2UvY29sXG5cdFx0dGhpcy50eXBlID0gcC50eXBlIHx8IFwiYmFzZVwiO1xuXHRcdC8vIGNoZWNrIHVzZWRcblx0XHR0aGlzLnVzZSA9IHAudXNlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHAudXNlO1xuXHRcdHRoaXMubmFtZSA9IHAubmFtZSB8fCBcIlwiO1xuXG5cdFx0Ly8gcG9pbnQgeCx5XG5cdFx0dGhpcy54ID0gcC54IHx8IG51bGw7XG5cdFx0dGhpcy55ID0gcC55IHx8IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogZHJvcCBlbGVtZW50IGZyb20gZGFuY2Vcblx0ICovXG5cdG91dCgpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzLnJpZ2h0O1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXMubGVmdDtcblx0XHR0aGlzLnVwLmRvd24gPSB0aGlzLmRvd247XG5cdFx0dGhpcy5kb3duLnVwID0gdGhpcy51cDtcblx0XHR0aGlzLnVzZSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGVudGVyIGRhbmNlXG5cdCAqL1xuXHRpbigpIHtcblx0XHR0aGlzLmxlZnQucmlnaHQgPSB0aGlzO1xuXHRcdHRoaXMucmlnaHQubGVmdCA9IHRoaXM7XG5cdFx0dGhpcy51cC5kb3duID0gdGhpcztcblx0XHR0aGlzLmRvd24udXAgPSB0aGlzO1xuXHRcdHRoaXMudXNlID0gdHJ1ZTtcblx0fVxuXG5cdHRhcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5vdXRMaW5lKHRoaXMsIFwiZG93blwiLCBjb2xsZWN0aW9uID0+IHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaCh0aGlzLm91dExpbmUodGhpcy5kb3duLCBcInJpZ2h0XCIpKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb24gb3V0TGluZVxuXHQgKiBAZGVzY3JpcHRpb24gb3V0IG9mIGxpbmUocm93IG9yIGNvbClcblx0ICogQHBhcmFtIHsqfSBlbGUgXG5cdCAqIEBwYXJhbSB7Kn0gZGlyZWN0aW9uIFxuXHQgKiBAcGFyYW0geyp9IGNhbGxiYWNrIFxuXHQgKiBAcmV0dXJucyBcblx0ICovXG5cdG91dExpbmUoZWxlLCBkaXJlY3Rpb24sIGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGNvbnN0IG5leHQgPSBlbGVbZGlyZWN0aW9uXTtcblx0XHRpZiAoIWVsZS5jaGVjayhuZXh0KSkge1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soY29sbGVjdGlvbik7XG5cdFx0XHRuZXh0Lm91dCgpO1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5leHQpO1xuXHRcdFx0dGhpcy5vdXRMaW5lKGVsZSwgZGlyZWN0aW9uKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHQvKipcblx0ICogZWxlbWVudCBhY3RpdmF0ZWRcblx0ICovXG5cdGFjdGl2YXRlKCkge1xuXHRcdHRoaXMudmFsdWUgPSAxO1xuXHR9XG5cblx0Y2hlY2soZWwpIHtcblx0XHRpZiAoZWwueCA9PT0gdGhpcy54ICYmIGVsLnkgPT09IHRoaXMueSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcbiIsIi8qXG4gKiBARGVzY3JpcHRpb246XG4gKiBAVmVyc2lvbjogMS4wLjBcbiAqIEBBdXRob3I6IGxheFxuICogQERhdGU6IDIwMjAtMTAtMDggMTk6MzE6MzVcbiAqIEBMYXN0RWRpdG9yczogbGF4XG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTA0LTE0IDE5OjM1OjI2XG4gKi9cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKFwiQC9FbGVtZW50LmpzXCIpO1xuY2xhc3MgU3RhZ2Uge1xuXHRjb25zdHJ1Y3RvcihtYXRyaXgpIHtcblx0XHQvLyDot7PoiJ7pk77nm5hcblx0XHR0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblx0XHR0aGlzLmhlaWdodCA9IHRoaXMubWF0cml4Lmxlbmd0aCArIDE7XG5cdFx0dGhpcy53aWR0aCA9IHRoaXMubWF0cml4WzBdLnJvdy5sZW5ndGg7XG5cdFx0dGhpcy5kYW5jZSA9IFtdO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHRcdC8vIHRoaXMuaGVhZCA9IHRoaXMuZGFuY2VbMF1bMF07XG5cdFx0dGhpcy5hbnMgPSBbXTtcblx0fVxuXG5cdGNhbGN1bGF0ZSgpIHtcblx0XHR0aGlzLmRhbmNpbmcoKTtcblx0fVxuXG5cdGRhbmNpbmcoKSB7XG5cdFx0Ly8g6I635Y+WaGVhZC5yaWdodFxuXHRcdGNvbnN0IG5leHQgPSB0aGlzLmhlYWQucmlnaHQ7XG5cdFx0aWYgKG5leHQuY2hlY2sodGhpcy5oZWFkKSkgcmV0dXJuIHRydWU7XG5cblx0XHQvLyDmoIforrByaWdodFxuXHRcdGNvbnN0IG5leHRUYXBzID0gbmV4dC50YXAoKTtcblx0XHRpZiAobmV4dC5jaGVjayhuZXh0LmRvd24pKSByZXR1cm4gZmFsc2U7XG5cblx0XHRuZXh0VGFwcy5tYXAocm93ID0+IHtcblx0XHRcdC8vIOiOt+WPlnJpZ2h056ys5LiA5bqP5YiXXG5cdFx0XHRjb25zdCBuZXh0Rmlyc3QgPSByb3dbMF07XG5cblx0XHRcdC8vIOagh+iusOivpeesrOS4gOW6j+WIl+WQjOihjOWFtuS9meWFg+e0oOeahOWIl+mmluWFg+e0oFxuXHRcdFx0Y29uc3QgbmV4dEZpcnN0VGFwcyA9IHRoaXMudGFwQnlSb3cobmV4dEZpcnN0KTtcblxuXHRcdFx0Ly8g5b6X5Yiw5a2Q6Lez6Iie6ZO+55uYXG5cdFx0XHRpZiAodGhpcy5kYW5jaW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHQvLyDov5Tlm57or6XlhYPntKDlkIzooYznmoTlhbbkvZnlhYPntKDmiYDlnKjnmoTliJfpppblhYPntKBcblx0XHRcdHRoaXMudGFwQmFjayhuZXh0Rmlyc3RUYXBzKTtcblx0XHRcdHRoaXMuYW5zLnB1c2gobmV4dEZpcnN0KTtcblx0XHR9KTtcblx0XHR0aGlzLnRhcEJhY2sobmV4dFRhcHMpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDmr4/kuKrlhYPntKDovazmjaLkuLrlhYPntKDlr7nosaHlvJXnlKjoh6rouqvlkajlm7Rcblx0ICovXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5jaGFpbiA9IHRoaXMuY3JlYXRlQ2hhaW4oKTtcblx0XHQvLyB0aGlzLmxpbmtDaGFpbigpO1xuXHRcdC8vIHRoaXMuY2xlYXIoKTtcblx0fVxuXG5cdGNyZWF0ZUNoYWluKCkge1xuXHRcdGNvbnN0IGNoYWluID0gW10uY29uY2F0KFxuXHRcdFx0eyByb3c6IG5ldyBBcnJheSh0aGlzLndpZHRoKS5maWxsKG51bGwpIH0sXG5cdFx0XHR0aGlzLm1hdHJpeFxuXHRcdCk7XG5cdFx0cmV0dXJuIGNoYWluLm1hcChyb3cgPT4ge1xuXHRcdFx0cmV0dXJuIHJvdy5yb3cubWFwKCgpID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBFbGVtZW50KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpbmtDaGFpbigpIHtcblx0XHR0aGlzLmNoYWluLm1hcCgocm93LCB4LCBhcnIpID0+IHtcblx0XHRcdHJvdy5yb3cubWFwKChlbGUsIHkpID0+IHtcblx0XHRcdFx0ZWxlLnR5cGUgPSB4ID09PSAwID8gKHkgPT09IDAgPyBcImhlYWRcIiA6IFwiY29sXCIpIDogXCJiYXNlXCI7XG5cdFx0XHRcdGVsZS5yaWdodCA9IHJvd1t5ID09PSByb3cubGVuZ3RoIC0gMSA/IDAgOiB5ICsgMV07XG5cdFx0XHRcdGVsZS5sZWZ0ID0gcm93W3kgPT09IDAgPyByb3cubGVuZ3RoIC0gMSA6IHkgLSAxXTtcblx0XHRcdFx0ZWxlLnVwID0gYXJyW3ggPT09IDAgPyBhcnIubGVuZ3RoIC0gMSA6IHggLSAxXVt5XTtcblx0XHRcdFx0ZWxlLmRvd24gPSBhcnJbeCA9PT0gYXJyLmxlbmd0aCAtIDEgPyAwIDogeCArIDFdW3ldO1xuXHRcdFx0XHRlbGUucm93ID0geDtcblx0XHRcdFx0ZWxlLmNvbCA9IGFyclswXVt5XTtcblx0XHRcdFx0ZWxlLnVzZSA9IHggPT09IDAgPyB0cnVlIDogZWxlID09PSAxO1xuXHRcdFx0XHRlbGUueCA9IHg7XG5cdFx0XHRcdGVsZS55ID0geTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIOa4hemZpOaJgOacieepuuWvueixoVxuXHQgKi9cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5kYW5jZS5tYXAocm93ID0+IHtcblx0XHRcdHJvdy5tYXAoZWwgPT4ge1xuXHRcdFx0XHRpZiAoIWVsLnVzZSkgZWwub3V0KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDmoIforrDor6XlhYPntKDmiYDlnKjooYzliankvZnlhYPntKDnmoTpppbliJflhYPntKBcblx0ICogQHBhcmFtIHsqfSBmaXJzdFxuXHQgKi9cblx0dGFwQnlSb3coZmlyc3QpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXRyaXhbZmlyc3QueF0ucmVkdWNlKChlbCwgbmV4dCkgPT4ge1xuXHRcdFx0aWYgKG5leHQueSAhPT0gZmlyc3QueSkge1xuXHRcdFx0XHRyZXR1cm4gZWwuY29uY2F0KHRoaXMudGFwKG5leHQueSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDlm57moIflhYPntKDpm4blkIhcblx0ICogQHBhcmFtIHsqfSBsaXN0XG5cdCAqL1xuXHR0YXBCYWNrKCkge1xuXHRcdHRoaXMubGlzdC5tYXAocm93ID0+IHtcblx0XHRcdHJvdy5tYXAoZWwgPT4ge1xuXHRcdFx0XHRlbC5pbigpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==