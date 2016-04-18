/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function (root) {
	
	  var DOMNodeCollection = __webpack_require__(1);
	  var _docReadyCallbacks = [], _docReady = false;
	  
	  window.$l = function (arg) {
	    if (typeof arg === "string") {
	      var node = document.querySelectorAll(arg);
	      var nodeArray = [];
	      for (var i = 0; i < node.length; i++) {
	        nodeArray.push(node[i]);
	      }
	      var elList = new DOMNodeCollection(nodeArray);
	      return elList;
	    } else if (typeof arg === "function") {
	      if (readyStateChange()) {
	        readyList.push(arg);
	        ready();
	      }
	    } else if (typeof arg === "object" && arg instanceof HTMLElement) {
	      var newEl = new DOMNodeCollection([arg]);
	      return newEl;
	    }
	
	  };
	
	  document.addEventListener('DOMContentLoaded', function () {
	    _docReady = true;
	    _docReadyCallbacks.forEach(function(func){ func(); });
	  });
	})(this);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(nodes) {
	  // We will push our array-like objects, ie the nodes, into Arrays. Unfortunately,
	  // NodeList has no #forEach method. We will be able to count on the type of
	  // `nodes` so that we can prevent TypeErrors later on, so let's create our own
	  // each method so that we can apply it to our nodes!
	  this.nodes = Array.prototype.slice.call(nodes);
	}
	
	DOMNodeCollection.prototype.each = function (callback) {
	  this.nodes.forEach(callback);
	};
	
	DOMNodeCollection.prototype.html = function (html) {
	  if (typeof html === "string") {
	    this.each (function (node) {
	      node.innerHTML = html;
	    });
	  } else {
	    if (this.nodes.length > 0) {
	      return this.nodes[0].innerHTML;
	    }
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html('');
	};
	//Why isn't append working?//
	DOMNodeCollection.prototype.append = function (children) {
	  if (this.nodes.length > 0) return;
	  if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
	    children = root.$l(children);
	  }
	
	  if (typeof children === "string") {
	    this.each (function (node) {
	      node.innerHTML += children;
	    });
	  } else if (children instanceof DOMNodeCollection) {
	    var node = this.nodes[0];
	    children.each (function (childNode) {
	      node.appendChild(childNode);
	    });
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (key, el) {
	  if (typeof el === "string") {
	    this.each (function(node) {
	      node.setAttribute(key, el);
	    });
	  } else {
	    return this.nodes[0].getAttribute(key);
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (newClass) {
	  this.each (function(node) {
	    node.classList.add(newClass);
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (removingClass) {
	  this.each (function(node) {
	    node.classList.remove(removingClass);
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var childNodes = [];
	  this.each (function(node) {
	    //call it recursively on a node
	    var childNodeList = node.children;
	    childNodes = childNodes.concat([].slice.call(childNodeList));
	  });
	  return new DOMNodeCollection(childNodes);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parentNodes = [];
	  this.each (function(node) {
	    parentNodes.push(node.parentNode);
	  });
	  return new DOMNodeCollection(parentNodes);
	};
	
	DOMNodeCollection.prototype.find = function (selected) {
	  var foundNodes = [];
	  this.each (function(node) {
	    var nodeList = node.querySelectorAll(selected);
	    foundNodes = foundNodes.concat([].slice.call(nodeList));
	  });
	  return new DOMNodeCollection(foundNodes);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  this.each (function(node) {
	    node.parentNode.removeChild(node);
	  });
	};
	//NEED TO DOUBLECHECK THIS IF WORKING//
	DOMNodeCollection.prototype.on = function (eventName, callback) {
	  this.each (function(node) {
	    node.addEventListener(eventName, callback);
	    var eventKey = "strikeUpevent-" + eventName;
	    if (typeof node[eventKey] === "undefined") {
	      node[eventKey] = [];
	    }
	    node[eventKey].push(callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (eventName) {
	  this.each (function(node) {
	    var eventKey = "strikeUpevent-" + eventName;
	    if (node[eventKey]) {
	      node[eventKey].each(function(callback) {
	        node.removeEventListener(eventName, callback);
	      });
	    }
	    node[eventKey] = [];
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=strikeUPjs.js.map