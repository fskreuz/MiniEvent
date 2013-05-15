function MiniEvent() {
  this.events = {};
}
MiniEvent.prototype.on = function (event, handler) {
  (this.events[event] || (this.events[event] = [])).push(handler);
  return handler;
};
MiniEvent.prototype.off = function (event, handler) {
  var handlers, i;
  if(!((handlers = this.events[event]) && (i = handlers.length))) return;
  while(i--) if(handlers[i] === handler) handlers.splice(i, 1);
};
MiniEvent.prototype.emit = function (event) {
  var handlers, length, i = 0,
    slice = Array.prototype.slice;
  if(!((handlers = this.events[event]) && (length = handlers.length))) return;
  while(i < length) handlers[i++].apply(this, slice.call(arguments, 1));
};
