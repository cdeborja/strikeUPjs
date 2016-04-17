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
	  
	  root.$l = function (arg) {
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
	
	  function DOMNodeCollection (array) {
	    this.array = array;
	  }
	
	  DOMNodeCollection.prototype.html = function (string) {
	    if (typeof string === "string") {
	      for (var i = 0; i < this.array.length; i++) {
	        this.array[i].innerHTML = string;
	      }
	    } else {
	      return this.array[0].innerHTML;
	    }
	  };
	
	  DOMNodeCollection.prototype.empty = function () {
	    for (var i = 0; i < this.array.length; i++) {
	      this.array[i].innerHTML = "";
	    }
	  };
	
	  DOMNodeCollection.prototype.append = function (arg) {
	    if (typeof arg === "string") {
	      for (var i = 0; i < this.array.length; i++) {
	        this.array[i].innerHTML = this.array[i].innerHTML + arg;
	      }
	    } else if (arg instanceof HTMLElement) {
	      for (var j = 0; j < this.array.length; j++) {
	        this.array[j].innerHTML = this.array[j].innerHTML + arg.outerHTML;
	      }
	    } else if (arg instanceof DOMNodeCollection) {
	      for (var k = 0; k < this.array.length; k++) {
	        this.array[k].innerHTML = this.array[k].innerHTML + arg.array[0].outerHTML;
	      }
	    }
	  };
	
	  DOMNodeCollection.prototype.attr = function (attributeName, value) {
	    if (typeof value !== "undefined") {
	      for (var i = 0; i < this.array.length; i++) {
	        this.array[i].setAttribute(attributeName, value);
	      }
	    } else {
	      for (var j = 0; j < this.array.length; j++) {
	        var firstEl = this.array[j].getAttribute(attributeName);
	        if (typeof firstEl !== "undefined") {
	          return firstEl;
	        }
	      }
	
	    }
	  };
	
	  DOMNodeCollection.prototype.addClass = function (name) {
	    for (var i = 0; i < this.array.length; i++) {
	      this.array[i].className += (" " + name);
	    }
	  };
	
	  DOMNodeCollection.prototype.removeClass = function (name) {
	    for (var i = 0; i < this.array.length; i ++) {
	      var index = this.array[i].className.split(" ").indexOf(name);
	      if (index > -1) {
	        var newArr = this.array[i].className.split(" ").slice();
	        newArr.splice(index, 1);
	        this.array[i].className = newArr.join(" ");
	      }
	
	    }
	  };
	
	  DOMNodeCollection.prototype.children = function () {
	    var childrenArray = [];
	    for (var i = 0 ; i < this.array.length; i ++) {
	      childrenArray.push(this.array[i].children);
	    }
	    var domChildrenArray = new DOMNodeCollection(childrenArray);
	    return domChildrenArray;
	  };
	
	  DOMNodeCollection.prototype.parent = function () {
	    var parentArray = [];
	    for (var i = 0 ; i < this.array.length; i ++) {
	      parentArray.push(this.array[i].parentElement);
	    }
	    var domParentArray = new DOMNodeCollection(parentArray);
	    return domParentArray;
	  };
	
	  DOMNodeCollection.prototype.find = function (selector) {
	    var selectedList = this.querySelectorAll(selector);
	    var newEl = new DOMNodeCollection(selectedList);
	    return newEl;
	  };
	
	  DOMNodeCollection.prototype.remove = function () {
	    this.empty();
	    this.array = [];
	  };
	
	  DOMNodeCollection.prototype.on = function (eventName, fun) {
	    this.addEventListener(eventName, fun);
	  };
	
	  DOMNodeCollection.prototype.off = function (eventName, fun) {
	    this.removeEventListener(eventName, fun);
	  };
	
	  funcName = funcName || "docReady";
	  baseObj = baseObj || window;
	  var readyList = [];
	  var readyFired = false;
	  var readyEventHandlersInstalled = false;
	
	
	  function ready() {
	    if (!readyFired) {
	
	      readyFired = true;
	      for (var i = 0; i < readyList.length; i++) {
	        readyList[i].fn.call(window, readyList[i].ctx);
	      }
	      readyList = [];
	    }
	  }
	
	  function readyStateChange() {
	    if ( document.readyState === "complete" ) {
	      ready();
	    }
	  }
	
	  baseObj[funcName] = function(callback, context) {
	    if (readyFired) {
	      setTimeout(function() {callback(context);}, 1);
	      return;
	    } else {
	      readyList.push({fn: callback, ctx: context});
	    }
	    if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
	      setTimeout(ready, 1);
	    } else if (!readyEventHandlersInstalled) {
	      if (document.addEventListener) {
	        document.addEventListener("DOMContentLoaded", ready, false);
	        window.addEventListener("load", ready, false);
	      } else {
	        document.attachEvent("onreadystatechange", readyStateChange);
	        window.attachEvent("onload", ready);
	      }
	      readyEventHandlersInstalled = true;
	    }
	  };
	
	  DOMNodeCollection.prototype.extend  = function (){
	    for(var i = 1; i < arguments.length; i++) {
	      for(var key in arguments[i]) {
	        if(arguments[i].hasOwnProperty(key)){
	          arguments[0][key] = arguments[i][key];
	        }
	      }
	    }
	    return arguments[0];
	  };
	
	})(this);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(nodes) {
	  // We will push our array-like objects, ie the nodes, into Arrays because
	  // NodeList has no #forEach method. We will be able to count on the type of
	  // `nodes` so that we can prevent TypeErrors later on.
	  this.nodes = Array.prototype.slice.call(nodes);
	}
	
	DOMNodeCollection.prototype.html = function (html) {
	  if (typeof html === "string") {
	    this.forEach (function (node) {
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
	
	DOMNodeCollection.prototype.append = function (children) {
	  if (this.nodes.length > 0) return;
	  if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
	    children = root.$l(children);
	  }
	
	  if (typeof children === "string") {
	    this.forEach (function (node) {
	      node.innerHTML += children;
	    });
	  } else if (children instanceof DOMNodeCollection) {
	    var node = this.nodes[0];
	    children.forEach (function (childNode) {
	      node.appendChild(childNode);
	    });
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (key, el) {
	  if (typeof el === "string") {
	    this.forEach (function(node) {
	      node.setAttribute(key, el);
	    });
	  } else {
	    return this.nodes[0].getAttribute(key);
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (newClass) {
	  this.forEach (function(node) {
	    node.classList.add(newClass);
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (removingClass) {
	  this.forEach (function(node) {
	    node.classList.remove(removingClass);
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var childNodes = [];
	  this.forEach (function(node) {
	    //call it recursively on a node
	    var childNodeList = node.children;
	    childNodes = childNodes.concat([].slice.call(childNodeList));
	  });
	  return new DOMNodeCollection(childNodes);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parentNodes = [];
	  this.forEach (function(node) {
	    parentNodes.push(node.parentNode);
	  });
	  return new DOMNodeCollection(parentNodes);
	};
	
	DOMNodeCollection.prototype.find = function (selected) {
	  var foundNodes = [];
	  this.forEach (function(node) {
	    var nodeList = node.querySelectorAll(selected);
	    foundNodes = foundNodes.concat([].slice.call(nodeList));
	  });
	  return new DomNodeCollection(foundNodes);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  this.forEach (function(node) {
	    node.parentNode.removeChild(node);
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=strikeUPjs.js.map