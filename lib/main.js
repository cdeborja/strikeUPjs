  var DOMstrikecollection = require('./dom_strike_collection.js');
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
