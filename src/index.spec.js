/* eslint-env qunit */
import { MiniEvent } from './index'

QUnit.test('Initialization', assert => {
  const hub = new MiniEvent()

  assert.expect(5)

  assert.strictEqual(typeof hub.on, 'function', 'On is a function.')
  assert.strictEqual(typeof hub.emit, 'function', 'Emit is a function.')
  assert.strictEqual(typeof hub.off, 'function', 'Off is a function.')
  assert.ok(hub.events, 'Events collection exists.')
  assert.strictEqual(Object.keys(hub.events).length, 0, 'Event collection starts empty.')
})

QUnit.test('on', assert => {
  assert.expect(1)

  const hub = new MiniEvent()
  const returned = hub.on('registeredevent', () => { assert.ok('true', 'Handler was invoked') })

  assert.strictEqual(returned, undefined, 'hub.on returns undefined.')
})

QUnit.test('emit', assert => {
  assert.expect(4)

  const hub = new MiniEvent()

  hub.on('registeredevent', () => { assert.ok(true, 'Handler was invoked') })
  hub.on('eventwithargs', (arg1, arg2, arg3) => {
    assert.strictEqual(arg1, 'foo', 'arg1 is foo.')
    assert.strictEqual(arg2, 'bar', 'arg2 is bar.')
    assert.strictEqual(arg3, 'baz', 'arg3 is baz.')
  })

  hub.emit('registeredevent')
  hub.emit('unregisteredevent')
  hub.emit('eventwithargs', 'foo', 'bar', 'baz')
})

QUnit.test('off', assert => {
  assert.expect(0)

  const hub = new MiniEvent()
  const handler = () => { assert.notOk(true, 'Handler was invoked') }

  hub.on('registeredevent', handler)
  hub.off('registeredevent', handler)
  hub.emit('registeredevent')
})
