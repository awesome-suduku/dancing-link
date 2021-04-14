/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-10 17:07:52
 * @LastEditors: lax
 * @LastEditTime: 2021-04-14 17:28:35
 */
const collection = require("@test/data/index.js");
const Stage = require("@/Stage.js");
const expect = require("chai").expect;

describe("stage", function() {
	const stage = new Stage(collection);
	it("clear", () => {
		expect(stage.head.down).to.be.equals(stage.head);
	});
});

describe("tap", function() {
	const stage = new Stage(collection);
	const next = stage.head.right;
	const result = next.tap();
	// console.log(result);
});
