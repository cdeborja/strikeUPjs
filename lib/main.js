(function (root) {

  var DOMNodeCollection = require('./dom_node_collection.js');
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
