(function(){

  var hub = new MiniEvent();

  test('Internals check',function(){

    var key;
    var isEmpty = true;
    
    ok(hub.on, 'Has on');
    strictEqual(typeof hub.on,'function','On is a function');

    ok(hub.emit, 'Has emit');
    strictEqual(typeof hub.emit,'function','Emit is a function');

    ok(hub.off, 'Has off');
    strictEqual(typeof hub.off,'function','Off is a function');

    ok(hub.events, 'Events collection exists');
    strictEqual(typeof hub.events, 'object', 'Events collection is an object');
    ok(!(hub.events instanceof Array), 'Events collection not an array');

    for(key in hub.events) {
      if(hub.events.hasOwnProperty(key)){
        isEmpty = false;
      }            
    }

    ok(isEmpty, 'Events list is empty');

  });
  
  test('on, emit and off',function(){

    var returnedChangeHandler1, returnedChangeHandler2, returnedReadyHandler;

    function changeHandler1(data1, data2){
      strictEqual(data1,'hello','data1 must be the first argument after the event name');
      strictEqual(data2,'world','data2 must be the next argument');
      start(1);
    }

    function changeHandler2(data1, data2){
      strictEqual(data1,'hello','data1 must be the first argument after the event name');
      strictEqual(data2,'world','data2 must be the next argument');
      start(1);
    }

    function readyHandler(data1, data2){
      strictEqual(data1,'foo','data1 must be the first argument after the event name');
      strictEqual(data2,'bar','data2 must be the next argument');
      start(1);
    }

    returnedChangeHandler1 = hub.on('change',changeHandler1);

    //check for returned reference
    strictEqual(returnedChangeHandler1,changeHandler1,'The returned referece must be to the passed handler');
    
    //check for the creation of the event list in the event object
    ok(hub.events.change, 'A change event should be registered in the events object');
    ok(hub.events.change instanceof Array, 'Registered event should be an array');

    //check added handlers
    strictEqual(hub.events.change.length, 1, 'Change event should contain 1 handler');
    strictEqual(hub.events.change[0], changeHandler1, 'First handler in the array should be the provided handler');

    //create another event handler
    returnedReadyHandler = hub.on('ready',readyHandler);

    //check for the other event
    ok(hub.events.ready, 'A ready event should be registered in the events object');
    ok(hub.events.ready instanceof Array, 'Registered event should be an array');

    //check added handlers
    strictEqual(hub.events.ready.length, 1, 'Ready event should contain 1 handler');
    strictEqual(hub.events.ready[0], readyHandler, 'First handler in the array should be the provided handler');

    //try appending to an existing event
    returnedChangeHandler2 = hub.on('change',changeHandler2);

    //check for the appended handler
    strictEqual(returnedChangeHandler2,changeHandler2,'The returned referece must be to the passed handler');
    strictEqual(hub.events.change.length, 2, 'There should now be 2 handlers for the change event');
    strictEqual(hub.events.change[1], changeHandler2, 'The second handler should be the second registered');

    //attach a duplicate handler
    hub.on('change',changeHandler1);
    strictEqual(hub.events.change.length, 3, 'There should now be 3 handlers for the change event');
    strictEqual(hub.events.change[2], changeHandler1, 'The third handler should be the third registered');
    strictEqual(hub.events.change[0], hub.events.change[2], 'The first and third handler should be the same');

    //should fire 3 change handlers
    stop(3);
    hub.emit('change','hello','world');

    //should fire 1 ready handler
    stop(1);
    hub.emit('ready','foo','bar');

    hub.off('change',returnedChangeHandler1);

    //should now contain only one handler now
    strictEqual(hub.events.change.length, 1, 'Change event should contain 1 handler');
    strictEqual(hub.events.change[0], returnedChangeHandler2, 'The remaining change handler should now be the second registered');

    hub.off('change',returnedChangeHandler2);
    strictEqual(hub.events.change.length, 0, 'There should be no more handlers for change');

    hub.off('ready',returnedReadyHandler);
    strictEqual(hub.events.ready.length, 0, 'There should be no more handlers for ready');

  });

}());