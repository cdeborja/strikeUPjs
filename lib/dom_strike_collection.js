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

DOMstrikecollection.prototype.where = function (inner) {
  this.each ( function (strikeUp) {
    if (strikeUp.innerHTML === inner) {
      return strikeUp.getAttribute("order");
    }
  });
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
  var foundNodes = [];
  this.each (function(strikeUp) {
    var nodeList = strikeUp.querySelectorAll(selected);
    foundNodes = foundNodes.concat([].slice.call(nodeList));
  });
  return new DOMstrikecollection(foundNodes);
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
