define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://unpkg.com/jupyterlab_table@0.0.1/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Entry point for the unpkg bundle containing custom model definitions.
	//
	// It differs from the notebook bundle in that it does not need to define a
	// dynamic baseURL for the static assets and may load some css that would
	// already be loaded by the notebook otherwise.
	
	module.exports['version'] = __webpack_require__(1).version;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"name": "jupyterlab_table_nbextension",
		"version": "0.0.1",
		"description": "A Jupyter Notebook extension for rendering JSONTable",
		"author": "Grant Nestor",
		"main": "lib/index.js",
		"keywords": [
			"jupyter",
			"jupyterlab",
			"jupyterlab extension"
		],
		"scripts": {
			"build": "webpack",
			"watch": "watch \"npm run build\" src --wait 10 --ignoreDotFiles",
			"prepublish": "npm run build",
			"extension:install": "jupyter nbextension install --symlink --py --sys-prefix notebook_json",
			"extension:uninstall": "jupyter nbextension uninstall --py --sys-prefix notebook_json",
			"extension:enable": "jupyter nbextension enable --py --sys-prefix notebook_json",
			"extension:disable": "jupyter nbextension disable --py --sys-prefix notebook_json"
		},
		"dependencies": {
			"react": "^15.3.2",
			"react-data-grid": "^1.0.66",
			"react-dom": "^15.3.2",
			"underscore": "^1.8.3"
		},
		"devDependencies": {
			"babel-core": "^6.18.2",
			"babel-loader": "^6.2.7",
			"babel-preset-latest": "^6.16.0",
			"babel-preset-react": "^6.16.0",
			"babel-preset-stage-0": "^6.16.0",
			"css-loader": "^0.25.0",
			"json-loader": "^0.5.4",
			"style-loader": "^0.13.1",
			"watch": "^1.0.1",
			"webpack": "^1.12.14"
		}
	};

/***/ }
/******/ ])});;
//# sourceMappingURL=index.js.map