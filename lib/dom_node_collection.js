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
