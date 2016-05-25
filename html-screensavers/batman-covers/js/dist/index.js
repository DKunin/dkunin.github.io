/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bricks = __webpack_require__(1);

	var _bricks2 = _interopRequireDefault(_bricks);

	var _arrayShuffle = __webpack_require__(2);

	var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sizes = [{ columns: 2, gutter: 0 }, // assumed to be mobile, because of the missing mq property
	{ mq: '768px', columns: 5, gutter: 0 }, { mq: '1024px', columns: 6, gutter: 0 }];

	// create an instance

	var instance = (0, _bricks2.default)({
	    container: '.grid',
	    packed: 'data-packed', // if not prefixed with 'data-', it will be added
	    sizes: sizes
	});

	// bind callbacks

	instance.on('pack', function () {
	    return console.log('ALL grid items packed.');
	}).on('update', function () {
	    return console.log('NEW grid items packed.');
	}).on('resize', function (size) {
	    return console.log('The grid has be re-packed to accommodate a new BREAKPOINT.');
	});

	// start it up, when the DOM is ready
	// note that if images are in the grid, you may need to wait for document.readyState === 'complete'

	function clearGrid(gridNode) {
	    while (gridNode.firstChild) {
	        gridNode.removeChild(gridNode.firstChild);
	    }
	}

	function imageItem(src) {
	    var newImage = document.createElement('img');
	    newImage.src = src;
	    return newImage;
	}

	function redraw() {
	    var grid = document.querySelector('.grid');
	    var images = Array.from(document.querySelectorAll('.js-data img'));
	    clearGrid(grid);
	    (0, _arrayShuffle2.default)(images).slice(0, 20).forEach(function (singleImage) {
	        grid.appendChild(imageItem(singleImage.src.replace(/.+ensaver\//g, '')));
	    });
	    instance.resize(true).pack();
	}

	document.addEventListener('DOMContentLoaded', function (event) {
	    setInterval(redraw, 30000);
	    redraw();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Bricks.js 1.3.0 - A blazing fast masonry layout generator for fixed width elements.
	 * Copyright (c) 2016 Michael Cavalea - https://github.com/callmecavs/bricks.js
	 * License: MIT
	 */
	!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):t.Bricks=n()}(this,function(){"use strict";var t={};t["extends"]=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t};var n=function(){function n(t,n){return u[t]=u[t]||[],u[t].push(n),this}function e(t,e){return e._once=!0,n(t,e),this}function i(t){var n=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return n?u[t].splice(u[t].indexOf(n),1):delete u[t],this}function r(t){for(var n=this,e=arguments.length,r=Array(e>1?e-1:0),o=1;e>o;o++)r[o-1]=arguments[o];var c=u[t]&&u[t].slice();return c&&c.forEach(function(e){e._once&&i(t,e),e.apply(n,r)}),this}var o=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],u={};return t["extends"]({},o,{on:n,once:e,off:i,emit:r})},e=function(){function t(t){t.forEach(function(t){return t()})}function e(t){return Array.prototype.slice.call(document.querySelectorAll(t))}function i(t){return Array.apply(null,Array(t)).map(function(){return 0})}function r(){return z.map(function(t){return t.mq&&window.matchMedia("(min-width: "+t.mq+")").matches}).indexOf(!0)}function o(){w=r()}function u(){A=-1===w?z[z.length-1]:z[w]}function c(){O=i(A.columns)}function a(){k=e(g?j["new"]:j.all)}function f(){0!==k.length&&(b=k[0].clientWidth,q=k.map(function(t){return t.clientHeight}))}function l(){k.forEach(function(t,n){var e=O.indexOf(Math.min.apply(Math,O));t.style.position="absolute",t.style.top=O[e]+"px",t.style.left=e*b+e*A.gutter+"px",t.setAttribute(M,""),O[e]+=q[n]+A.gutter})}function d(){E.style.position="relative",E.style.width=A.columns*b+(A.columns-1)*A.gutter+"px",E.style.height=Math.max.apply(Math,O)-A.gutter+"px"}function s(){x||(requestAnimationFrame(p),x=!0)}function p(){w!==r()&&(h(),_.emit("resize",A)),x=!1}function h(){return g=!1,t(L.concat(S)),_.emit("pack")}function v(){return g=!0,t(S),_.emit("update")}function m(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0],n=t?"addEventListener":"removeEventListener";return window[n]("resize",s),_}var y=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],g=void 0,x=void 0,w=void 0,A=void 0,O=void 0,k=void 0,b=void 0,q=void 0,E=document.querySelector(y.container),M=0===y.packed.indexOf("data-")?y.packed:"data-"+y.packed,z=y.sizes.slice().reverse(),j={all:y.container+" > *","new":y.container+" > *:not(["+M+"])"},L=[o,u,c],S=[a,f,l,d],_=n({pack:h,update:v,resize:m});return _};return e});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (arr) {
		if (!Array.isArray(arr)) {
			throw new TypeError('Expected an array');
		}

		var rand;
		var tmp;
		var len = arr.length;
		var ret = arr.slice();

		while (len) {
			rand = Math.floor(Math.random() * len--);
			tmp = ret[len];
			ret[len] = ret[rand];
			ret[rand] = tmp;
		}

		return ret;
	};


/***/ }
/******/ ]);