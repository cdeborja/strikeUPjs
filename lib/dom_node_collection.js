function DOMNodeCollection(nodes){
  // We will push our array-like objects, ie the nodes, into Arrays because
  // NodeList has no #forEach method. We will be able to count on the type of
  // `nodes` so that we can prevent TypeErrors later on.
  this.nodes = Array.prototype.slice.call(nodes);
}

module.exports = DOMNodeCollection;
