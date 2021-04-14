/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-10 17:07:52
 * @LastEditors: lax
 * @LastEditTime: 2021-04-13 15:30:49
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
	extends: ["airbnb-base/legacy","plugin:prettier/recommended"],
	plugins:["prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"array-callback-return": "off",
		"consistent-return": "off",
		"no-plusplus": "off",
		"func-names": "off",
		"no-param-reassign": "off"
	},
	globals: {
		logger: true,
	},
	overrides: [
		{
			files: [
				"**/__test__/*.{j,t}s?(x)",
				"**/test/unit/**/*.test.{j,t}s?(x)",
			],
			env: {
				jest: true,
			},
		},
	],
};
