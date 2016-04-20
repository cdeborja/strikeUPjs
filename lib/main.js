  var DOMNodeCollection = require('./dom_node_collection.js');
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
  var func = function(){
    $l('.first-item').remove();
  };

  var submit = function () {
    newItem = $l(".submit-field").nodes[0].value;
  };

  $l(function(){
    $l('.first-item').on('click', func);
    $l('button').on('click', submit);
  });


  document.addEventListener('DOMContentLoaded', function () {
    _docReady = true;
    _docReadyCallbacks.forEach(function(func){ func(); });
  });

module.exports = $l;
