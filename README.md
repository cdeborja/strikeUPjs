#strikeUPjs

strikeUPjs is a lite replication of the jQuery library functionality using javascript and the native DOM API built in the browser. strikeUPjs contains methods that allow the adding or removing of classes to HTML elements and adding or removing event listeners.

Try out a quick 50 states quiz game using strikeUPjs [here](http://www.christopherdeborja.com/strikeUPjs)

###Technical Details
* strikeUPjs is a lite library that coerces HTML elements to behave like arrays by creating them into instance variables. The elements are kept in an object called DOMstrikecollection which has multiple public APIs which can be used to manipulate the DOM.
* $su can be used with selectors of either strings, HTML element objects, or functions to create a new DOMstrikecollection. Functions will be registered and called as soon as the document is ready, or immediately if document is already ready.

Example:
```
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

function registerDocReadyCallback (func){
  if(!_docReady){
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  _docReady = true;
  _docReadyCallbacks.forEach(function(func){ func(); });
});

```
###Public API

* `$su(arg)` - Create a new DOMstrikecollection or append a callback to be called on DOM ready.
  * `$su.extend(baseObject[,object1]...[objectN])` - merge one or more objects into the base object.
  * `$su.ajax([options])` - Asynchronus XMLHttpRequest

* `DOMstrikecollection.prototype`
  * `html` - takes a string as an argument and sets the innerHTML of each strikeUP object. If no string is given, it will return all the innerHTMLs of all objects in given collection
  * `empty` - clears out the html of the collection
  * `append` - inserts content, specified by the parameter, to the end of each element in the set of matched elements
  * `attr` - giving a key as an argument will return the first attribute of the first element in your collection. Giving it a key and el as arguments, it will strikeUP each argument with an attribute of that key with the el as the attribute
  * `addClass` - passing a string as an argument will add a class to all objects in the collection
  * `removeClass` - like addClass, but the argument passed in will remove the class name from the list. If no arguments are passed, all classes in that collection are removed
  * `children` - will give all strikeUP object children
  * `parent` - will give all strikeUP object parents
  * `find` - will search for a give strikeUP object
  * `remove` - will remove all children of all strikeUP objects in collection.
  * `on` - adds an add event listener on a given event, and then calls a given callback upon execution of event name
  * `off` - removes the event listener if one is already attached
