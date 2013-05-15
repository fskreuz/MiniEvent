#MiniEvent

MiniEvent is yet another pub-sub library which, as always, aims to be the lightest and most flexible of it's kind. 

##API

###Class : MiniEvent

The class from which you create instances of `MiniEvent`.

Example:

    var hub = new MiniEvent();


###.on()

Attaches a handler function for an event.

    .on(eventName,handler([arg1,arg2,...,argN]));

- `eventName`

  The name of the event

- `handler(arg1,arg2,...,argN)`

  The function that executes when the event is triggered. It accepts `N` arguments, optinally provided from the `emit` method in the order they are passed after the event name.

- `return : function`: 

  Reference to the handler that was attached.

Example:

    //Adding a function that fires during the "change" event
    var changeHandler = hub.on('change',function(hello,world){
      console.log(hello,world);
    });

###.emit()

Executes the handlers for the specified event.

    .emit(eventName[,arg1,arg2,...,argN]);

- `eventName`

  The name of the event

- `arg1,arg2,...,argN`

  `N` optional arguments that will be passed into each executed handler.

- `return : undefined`

Example:

    //Execute all change handlers, passing in "hello" and "world"
    hub.emit('change','hello','world');

###.off()

Removes a handler from the specified event.

    .off(eventName,handler);


- `eventName`

  The name of the event

- `handler`

  Reference to the handler that is to be removed

- `return : undefined`

Example:

    //Removes the handler referenced by changeHandler from the change event
    hub.off('change',changeHandler);

##License

The MIT License (MIT)

Copyright (c) 2013 Joseph Ammil Descalzota

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.