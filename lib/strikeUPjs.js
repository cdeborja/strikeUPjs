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

	window.$l = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	  var DOMNodeCollection = __webpack_require__(2);
	  var _docReadyCallbacks = [], _docReady = false;
	
	  function $l (arg) {
	    if (typeof arg === "string") {
	      var node = document.querySelectorAll(arg);
	      var nodeArray = [];
	      for (var i = 0; i < node.length; i++) {
	        nodeArray.push(node[i]);
	      }
	      var elList = new DOMNodeCollection(nodeArray);
	      return elList;
	    } else if (typeof arg === "function") {
	      registerDocReadyCallback(arg);
	    } else if (typeof arg === "object" && arg instanceof HTMLElement) {
	      var newEl = new DOMNodeCollection([arg]);
	      return newEl;
	    }
	  }
	
	  $l.extend = function(baseObj){
	    var otherObjs = Array.prototype.slice.call(arguments, 1);
	    otherObjs.forEach(function(obj){
	      for(var prop in obj){
	        if (obj.hasOwnProperty(prop)){
	          baseObj[prop] = obj[prop];
	        }
	      }
	    });
	    return baseObj;
	  };
	
	  $l.ajax = function(options){
	    var request = new XMLHttpRequest();
	    var defaults = {
	      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	      method: "GET",
	      url: "",
	      success: function(){},
	      error: function(){},
	      data: {},
	    };
	    options = $l.extend(defaults, options);
	
	    if (options.method.toUpperCase() === "GET"){
	    //data is query string for get
	      options.url += "?" + toQueryString(options.data);
	    }
	
	    request.open(options.method, options.url, true);
	    request.onload = function (e) {
	      //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };
	
	    request.send(JSON.stringify(options.data));
	  };
	
	  function toQueryString (obj){
	  var result = "";
	  for(var prop in obj){
	    if (obj.hasOwnProperty(prop)){
	      result += prop + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	  }
	
	  function registerDocReadyCallback (func){
	    if(!_docReady){
	      _docReadyCallbacks.push(func);
	    } else {
	      func();
	    }
	  }
	  //functions to play with on index.html
	
	  var stateList = ["Alabama",
	    "Alaska",
	    "Arizona",
	    "Arkansas",
	    "California",
	    "Colorado",
	    "Connecticut",
	    "Delaware",
	    "Florida",
	    "Georgia",
	    "Hawaii",
	    "Idaho",
	    "Illinois Indiana",
	    "Iowa",
	    "Kansas",
	    "Kentucky",
	    "Louisiana",
	    "Maine",
	    "Maryland",
	    "Massachusetts",
	    "Michigan",
	    "Minnesota",
	    "Mississippi",
	    "Missouri",
	    "Montana Nebraska",
	    "Nevada",
	    "New Hampshire",
	    "New Jersey",
	    "New Mexico",
	    "New York",
	    "North Carolina",
	    "North Dakota",
	    "Ohio",
	    "Oklahoma",
	    "Oregon",
	    "Pennsylvania",
	    "Rhode Island",
	    "South Carolina",
	    "South Dakota",
	    "Tennessee",
	    "Texas",
	    "Utah",
	    "Vermont",
	    "Virginia",
	    "Washington",
	    "West Virginia",
	    "Wisconsin",
	    "Wyoming"];
	
	  var remove = function(){
	    $l('li').remove();
	  };
	
	  var check = function () {
	    var $lis = $l('li');
	    $lis.each ( function ($li) {
	      if (stateList.includes($li.innerHTML)) {
	        $li.classList.add("green");
	      } else {
	        $li.classList.add("red");
	      }
	    });
	  };
	
	  var submit = function () {
	    var newItem = $l(".submit-field").nodes[0].value;
	    var length = $l("li").nodes.length - 1;
	    var mostRecentItem = parseInt($l("li").nodes[length].getAttribute("order")) + 1;
	    $l("ul").append("<li order=" + mostRecentItem.toString() + ">" + newItem + "</li>");
	    $l(".submit-field").nodes[0].value = "";
	  };
	
	  var clearAnswers = function () {
	    $l('li').removeClass();
	  };
	
	  var clearWrongAnswers = function () {
	    var $lis = $l('li');
	    $lis.each ( function ($li) {
	      if ($li.getAttribute("class") == "red") {
	        $li.remove();
	      }
	    });
	  };
	
	  $l(function(){
	    $l('button.clear-wrong-answers').on('click', clearWrongAnswers);
	    $l('button.clear-answers').on('click', clearAnswers);
	    $l('button.add').on('click', submit);
	    $l('button.check').on('click', check);
	  });
	
	
	  document.addEventListener('DOMContentLoaded', function () {
	    _docReady = true;
	    _docReadyCallbacks.forEach(function(func){ func(); });
	  });
	
	module.exports = $l;


/***/ },
/* 2 */
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
	      var inner = [];
	      for (i = 0; i < this.nodes.length; i++) {
	        inner.push(this.nodes[i].innerHTML);
	      }
	      return inner;
	    }
	  }
	};
	
	DOMNodeCollection.prototype.where = function (inner) {
	  this.each ( function (node) {
	    if (node.innerHTML === inner) {
	      return node.getAttribute("order");
	    }
	  });
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html('');
	};
	
	DOMNodeCollection.prototype.append = function (children) {
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
	  if (removingClass) {
	    this.each (function(node) {
	      node.classList.remove(removingClass);
	    });
	  } else {
	    this.each (function(node) {
	      node.removeAttribute('class');
	    });
	  }
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