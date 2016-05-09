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

	  var DOMstrikecollection = __webpack_require__(2);
	  var _docReadyCallbacks = [], _docReady = false;
	
	  function $su (arg) {
	    if (typeof arg === "string") {
	      var strikeUp = document.querySelectorAll(arg);
	      var strikeArray = [];
	      for (var i = 0; i < strikeUp.length; i++) {
	        strikeArray.push(strikeUp[i]);
	      }
	      var elList = new DOMstrikecollection(strikeArray);
	      return elList;
	    } else if (typeof arg === "function") {
	      registerDocReadyCallback(arg);
	    } else if (typeof arg === "object" && arg instanceof HTMLElement) {
	      var newEl = new DOMstrikecollection([arg]);
	      return newEl;
	    }
	  }
	
	  $su.extend = function(baseObj){
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
	
	  $su.ajax = function(options){
	    var request = new XMLHttpRequest();
	    var defaults = {
	      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	      method: "GET",
	      url: "",
	      success: function(){},
	      error: function(){},
	      data: {},
	    };
	    options = $su.extend(defaults, options);
	
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
	    "Illinois",
	    "Indiana",
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
	    "Montana",
	    "Nebraska",
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
	
	  var check = function () {
	    var $sus = $su('li');
	    $sus.each ( function ($su) {
	      if (stateList.includes($su.innerHTML)) {
	        $su.classList.add("green");
	      } else {
	        $su.classList.add("red");
	      }
	    });
	  };
	
	  var clearWrongAnswers = function () {
	    var $sus = $su('li');
	    $sus.each ( function ($su) {
	      if (!stateList.includes($su.innerHTML)) {
	        $su.remove();
	      }
	    });
	  };
	
	  var handleSubmit = function (e) {
	    var key = e.keycode;
	    var click = e.CLICK;
	    if ($su(".submit-field").strikeUps[0].value !== "" && (key === 13 || click === 64)) {
	      var newItem = $su(".submit-field").strikeUps[0].value;
	      var length = $su("li").strikeUps.length - 1;
	      var mostRecentItem = parseInt($su("li").strikeUps[length].getAttribute("order")) + 1;
	      if ($su('li').html().includes(newItem)){
	        $su(".error").removeClass("hidden");
	        $su(".submit-field").strikeUps[0].value = "";
	      } else {
	        $su(".error").addClass("hidden");
	        $su("ul").append("<li order=" + mostRecentItem.toString() + ">" + newItem + "</li>");
	        $su(".submit-field").strikeUps[0].value = "";
	      }
	    }
	  };
	  //
	  // var enterSubmit = function (e) {
	  //   var key = e.keyCode;
	  //   if ($su(".submit-field").strikeUps[0].value !== "" && key === 13) {
	  //     var newItem = $su(".submit-field").strikeUps[0].value;
	  //     var length = $su("li").strikeUps.length - 1;
	  //     var mostRecentItem = parseInt($su("li").strikeUps[length].getAttribute("order")) + 1;
	  //     if ($su('li').html().includes(newItem)){
	  //       $su(".error").removeClass("hidden");
	  //       $su(".submit-field").strikeUps[0].value = "";
	  //     } else {
	  //       $su(".error").addClass("hidden");
	  //       $su("ul").append("<li order=" + mostRecentItem.toString() + ">" + newItem + "</li>");
	  //       $su(".submit-field").strikeUps[0].value = "";
	  //     }
	  //   }
	  // };
	
	  var clearColors = function () {
	    $su('li').removeClass();
	  };
	
	  $su(function(){
	    $su('button.clear-wrong-answers').on('click', clearWrongAnswers);
	    $su('button.clear-answers').on('click', clearColors);
	    $su('button.add').on('click', handleSubmit);
	    $su('.submit-field').on('keypress', handleSubmit);
	    $su('button.check').on('click', check);
	  });
	
	
	  document.addEventListener('DOMContentLoaded', function () {
	    _docReady = true;
	    _docReadyCallbacks.forEach(function(func){ func(); });
	  });
	
	module.exports = $su;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function DOMstrikecollection(strikeUps) {
	  // We will push our array-like objects into Arrays. Unfortunately,
	  // there is no #forEach method. We will be able to count on the type of
	  // `strikeUps` so that we can prevent TypeErrors later on, so let's create our own
	  // each method so that we can apply it to our strikeUps!
	  this.strikeUps = Array.prototype.slice.call(strikeUps);
	}
	
	DOMstrikecollection.prototype.each = function (callback) {
	  this.strikeUps.forEach(callback);
	};
	
	DOMstrikecollection.prototype.html = function (html) {
	  if (typeof html === "string") {
	    this.each (function (strikeUp) {
	      strikeUp.innerHTML = html;
	    });
	  } else {
	    if (this.strikeUps.length > 0) {
	      var inner = [];
	      for (i = 0; i < this.strikeUps.length; i++) {
	        inner.push(this.strikeUps[i].innerHTML);
	      }
	      return inner;
	    }
	  }
	};
	
	DOMstrikecollection.prototype.empty = function () {
	  this.html('');
	};
	
	DOMstrikecollection.prototype.append = function (children) {
	  if (typeof children === 'object' && !(children instanceof DOMstrikecollection)) {
	    children = root.$l(children);
	  }
	
	  if (typeof children === "string") {
	    this.each (function (strikeUp) {
	      strikeUp.innerHTML += children;
	    });
	  } else if (children instanceof DOMstrikecollection) {
	    var strikeUp = this.strikeUps[0];
	    children.each (function (childNode) {
	      strikeUp.appendChild(childNode);
	    });
	  }
	};
	
	DOMstrikecollection.prototype.attr = function (key, el) {
	  if (typeof el === "string") {
	    this.each (function(strikeUp) {
	      strikeUp.setAttribute(key, el);
	    });
	  } else {
	    return this.strikeUps[0].getAttribute(key);
	  }
	};
	
	DOMstrikecollection.prototype.addClass = function (newClass) {
	  this.each (function(strikeUp) {
	    strikeUp.classList.add(newClass);
	  });
	};
	
	DOMstrikecollection.prototype.removeClass = function (removingClass) {
	  if (removingClass) {
	    this.each (function(strikeUp) {
	      strikeUp.classList.remove(removingClass);
	    });
	  } else {
	    this.each (function(strikeUp) {
	      strikeUp.removeAttribute('class');
	    });
	  }
	};
	
	DOMstrikecollection.prototype.children = function () {
	  var childNodes = [];
	  this.each (function(strikeUp) {
	    //call it recursively on a strikeUp
	    var childNodeList = strikeUp.children;
	    childNodes = childNodes.concat([].slice.call(childNodeList));
	  });
	  return new DOMstrikecollection(childNodes);
	};
	
	DOMstrikecollection.prototype.parent = function () {
	  var parentNodes = [];
	  this.each (function(strikeUp) {
	    parentNodes.push(strikeUp.parentNode);
	  });
	  return new DOMstrikecollection(parentNodes);
	};
	
	DOMstrikecollection.prototype.find = function (selected) {
	  var foundStrikeUps = [];
	  this.each (function(strikeUp) {
	    var nodeList = strikeUp.querySelectorAll(selected);
	    foundStrikeUps = foundStrikeUps.concat([].slice.call(nodeList));
	  });
	  return new DOMstrikecollection(foundStrikeUps);
	};
	
	DOMstrikecollection.prototype.remove = function () {
	  this.each (function(strikeUp) {
	    strikeUp.parentNode.removeChild(strikeUp);
	  });
	};
	
	DOMstrikecollection.prototype.on = function (eventName, callback) {
	  this.each (function(strikeUp) {
	    strikeUp.addEventListener(eventName, callback);
	    var eventKey = "strikeUpevent-" + eventName;
	    if (typeof strikeUp[eventKey] === "undefined") {
	      strikeUp[eventKey] = [];
	    }
	    strikeUp[eventKey].push(callback);
	  });
	};
	
	DOMstrikecollection.prototype.off = function (eventName) {
	  this.each (function(strikeUp) {
	    var eventKey = "strikeUpevent-" + eventName;
	    if (strikeUp[eventKey]) {
	      strikeUp[eventKey].each(function(callback) {
	        strikeUp.removeEventListener(eventName, callback);
	      });
	    }
	    strikeUp[eventKey] = [];
	  });
	};
	
	module.exports = DOMstrikecollection;


/***/ }
/******/ ]);
//# sourceMappingURL=strikeUPjs.js.map