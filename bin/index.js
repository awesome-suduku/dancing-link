module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./src/Stage.js")}({"./src/Element.js":
/*!************************!*\
  !*** ./src/Element.js ***!
  \************************/
/*! no static exports found */function(t,e){t.exports=class{constructor(t={}){this.right=t.right||null,this.left=t.left||null,this.up=t.up||null,this.down=t.down||null,this.col=null,this.value=t.value,this.type=t.type||"base",this.use=void 0!==t.use&&t.use,this.name=t.name||"",this.x=t.x,this.y=t.y}out(){this.left.right=this.right,this.right.left=this.left,this.up.down=this.down,this.down.up=this.up,this.use=!1}in(){this.left.right=this,this.right.left=this,this.up.down=this,this.down.up=this,this.use=!0}tap(){const t=this.getCols().map(t=>{const e=t.getRows().concat([t]);return console.log(`mark index: ${t.x},count: ${e.length}`),{index:t.x,rows:e}}),e=t.reduce((t,e)=>t.concat(e.rows),[]).concat([this]);return e.map(t=>{t.out()}),{marks:t,drops:e}}getCols(){return this.get("down",[])}getRows(){return this.get("right",[])}get(t,e,n=this){const o=n[t];return this.check(o)||(e.push(o),this.get(t,e,o)),e}outLine(t,e,n,o){const s=Math.random(1,100),i=t[e];console.log(`id:${s} start to drop, direction: ${e} by: ${t.getCoordinate()} `);const r=!t.check(i);return console.log("this is not origin "+r),r&&(o&&o(n),i.out(),n.push(i),console.log("drop: "+i.getCoordinate()),console.log("drop collection has : "+n.length),this.outLine(t,e,n,o)),console.log(`id:${s} drop end `),n}check(t){return t.x===this.x&&t.y===this.y}getCoordinate(){return`[${this.x},${this.y}]`}}},"./src/Stage.js":
/*!**********************!*\
  !*** ./src/Stage.js ***!
  \**********************/
/*! no static exports found */function(t,e,n){const o=n(/*! @/Element.js */"./src/Element.js");t.exports=class{constructor(t){this.matrix=t,this.height=this.matrix.length+1,this.width=this.matrix[0].row.length,this.chain=[],this.rows=[],this.cols=[],this.head=null,this.ans=[],this.plan=[],this.init()}calculate(){if(this.dancing())return this.getResult()}dancing({id:t}={id:"0000"}){const e=(new Date).getMilliseconds();t=`${t}-${e}`,console.log("dancing... "+t);const n=this.head.right;console.log("get next: "+n.getCoordinate());const o=this.head.check(n);if(console.log("check next is head: "+o),o)return console.log("find plan: "+this.plan),console.log("dancing end "+t),this.ans.push(this.plan.concat()),!0;console.log("next tap");const{marks:s,drops:i}=n.tap();if(console.log("next tap count: "+s.length),s.length||console.log("dancing end "+t),!s.length)return!1;const r=s.map((e,n)=>{console.log("try select "+n),this.plan.push(e.index),console.log(`tap select ${n} col as same row`);const o=e.rows.map(t=>t.col.tap().drops);console.log("redoCollection: "),console.log(o);const s=this.dancing({id:t});return this.redo(o),console.log("redo: "+this.plan),s});return console.log(i),this.redo(i),console.log("result "+r.includes(!0)),!!r.includes(!0)}getResult(){return this.ans.map(t=>t.map(t=>this.matrix[t-1]))}init(){this.chain=this.createChain(),this.cols=this.getCols(),this.head=this.getHead(),this.rows=this.getRows(),this.linkChain()}createChain(){return[].concat({row:new Array(this.width).fill({})},this.matrix).map((t,e)=>t.row.map((t,n)=>{if(t)return new o({x:e,y:n,row:e})}))}getHead(){return new o({x:-1,y:-1})}getRows(t=this.chain,e=this.head){return t.map((t,n)=>[].concat(0===n?[e]:[],t.filter(t=>{if(t)return!0})))}getCols(t=this.chain,e=this.width){const n=[];for(let o=0;o<e;o++){const e=t.map(t=>t[o]).filter(t=>{if(t)return!0});n.push(e)}return n}linkChain(){this.rows.map((t,e)=>{t.map((n,o)=>{n.type=0===e?0===o?"head":"col":"base",n.right=t[o===t.length-1?0:o+1],n.left=t[0===o?t.length-1:o-1],n.use=!0})}),this.cols.map(t=>{t.map((e,n)=>{e.up=t[0===n?t.length-1:n-1],e.down=t[n===t.length-1?0:n+1],e.col=t[0],e.value=1,e.name=`[up[${e.up.x},${e.up.y}],down[${e.down.x},${e.down.y}],left[${e.left.x},${e.left.y}],right[${e.right.x},${e.right.y}]]`})})}redo(t){t.map(t=>{t instanceof Array?t.map(t=>{t.in()}):t.in()}),this.plan.pop()}}}});