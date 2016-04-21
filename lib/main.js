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
