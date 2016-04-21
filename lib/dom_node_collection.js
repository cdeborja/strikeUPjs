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
