# MiniEvent

Yet another EventEmitter in JavaScript.

## Usage

    const hub = new MiniEvent();

### hub.on(eventName,handler([arg1,arg2,...,argN]))

Attaches a handler function to an event.

- `eventName` - The name of the event.
- `handler(arg1,arg2,...,argN)` - The event handler.

Returns `undefined`.

### hub.emit(eventName[,arg1,arg2,...,argN])

Invoke the handlers for a specified event.

- `eventName` - The name of the event.
- `arg1,arg2,...,argN` - The arguments to pass to the handlers.

Returns `undefined`.

### hub.off(eventName,handler)

Removes a handler from a specified event.

- `eventName` - The name of the event.
- `handler` - A reference to the handler to be removed.

Returns `undefined`.