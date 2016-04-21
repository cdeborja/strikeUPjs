#strikeUPjs

strikeUPjs is a lite replication of the jQuery library functionality using javascript and the native DOM API built in the browser.

Try out a quick quiz game using strikeUPjs [here][50stateQuiz]

[50stateQuiz]: www.christopherdeborja.com/strikeUPjs

## Features

With the strikeUP collection, they are many strikeUP objects that you can `strike` with the following commands:

- html: takes a string as an argument and sets the innerHTML of each strikeUP object. If no string is given, it will return all the innerHTMLs of all objects in given collection

- empty: clears out the html of the collection

- append: inserts content, specified by the parameter, to the end of each element in the set of matched elements

- attr: giving a key as an argument will return the first attribute of the first element in your collection. Giving it a key and el as arguments, it will strikeUP each argument with an attribute of that key with the el as the attribute

- addClass: passing a string as an argument will add a class to all objects in the collection

- removeClass: like addClass, but the argument passed in will remove the class name from the list. If no arguments are passed, all classes in that collection are removed

- children: will give all strikeUP object children

- parent: will give all strikeUP object parents

- find: will search for a give strikeUP object

- remove: will remove all children of all strikeUP objects in collection.

- on: adds an add event listener on a given event, and then calls a given callback upon execution of event name

- off: removes the event listener if one is already attached
