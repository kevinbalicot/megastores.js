# MEGASTORES

Store manager with realtime exchanges between client and server

Tests : [![Build Status](https://travis-ci.org/kevinbalicot/megastores.js.svg?branch=master)](https://travis-ci.org/kevinbalicot/megastores.js)

## Dependances

* redux [https://github.com/reactjs/redux](https://github.com/reactjs/redux)
* engine.io [https://github.com/socketio/engine.io](https://github.com/socketio/engine.io)

## Requirement

* nodejs >= 4.0 for server only

## Installation

```
$ npm install --save megastores
```

## How to use it
### Server

```javascript
const { Store, Megastores } = require('megastores');

var myStore = new Store('my-store');
var megastores = new Megastores();

megastores.attach(myStore).listen(8080);

myStore.subscribe(state => {
    console.log('new state :', state);
});
```

### Client

```javascript
<script src="node_modules/megastores/dist/megastores-client.js">
<script>
    var store = new Store('my-store');
    var megastores = new Megastores();

    megastores.attach(store).connect('ws://localhost:8080');

    store.put({ text: 'Hello world!' });
</script>
```

## Features

* Realtime exchanges between client and server, every action dispatched is synchronized between server and client.
* Automatic reconnection and resynchronization if connection with server is lost
* Offline mode with local storage persistence


## Documentation
### Server

#### Events
 * `connection` (client) Called every time when client opens connection with server
 * `close ` Called every time when client loses connection with server
 * `message` (message) Called every time when client exchanges with server

```javascript
// Exemple
var megastores = new Megastores();
megastores.listen(8080).on('open', () => {
    console.log('New connection openned.');
});
```

#### Methods

* `()` Constructor, return an instance of `Megastores`
* `attach(store|[stores])` Attach a Store or a list of stores, also create `redux` store, so you need to attach all stores before starting server
* `listen(port)` Start server and listen on port `port`
* `on(event|custom-event, callback)` Listen event
* `send(custom-event, data, client = null)` Send event to one client or all of them

```javascript
// Exemple
var store1 = new Store('store1');
var store2 = new Store('store2');

var server = new Megastores();
server.attach([store1, store2]).listen(8080);

server.on('custom-event', message => {
    let client = message.client;
    let data = message.data;

    server.send('response-custom-event', 'hello world!', client);
});
```

### Server - Store

#### Property

* `items` Get data stored

#### Methods

* `(name, initialStore = [])` Constructor, return an instance of `Store`
    * `initialStore` can be an array or an Object
* `put(item|property)` Put an item or a property of Object into Store
* `update(index, item|property)` Update item or property at `index`
* `remove(index|property)` Remove item or property
* `use(callback)` Add middleware called every time when action is dispatching
    * `callback(action, oldState, newState, next)`
* `subscribe(callback)` Add listener called each time action is dispatched
    * `callback(items)` With `items` is the current state of Store

```javascript
// Exemple
var fruits = new Store('fruits', ['apple', 'lemon', 'cherry']);

var server = new Megastores();
server.attach(fruits).listen(8080);

fruits.subscribe((items) => {
    console.log(items); // display current state
});

fruits.use(() => console.log('juste say hello when state changes'));

fruits.put('raspberry');
fruits.update(1, 'strawberry'); // change lemon to strawberry
fruits.remove(0); // delete apple
```
-------------------

### Client

#### Events
 * `open` Called every time when connection with server is open
 * `close ` Called every time when client loses connection with server
 * `message` (message) Called every time when server exchanges with client

```javascript
// Exemple
var client = new Megastores();
client.connect('ws://localhost:8080').on('open', () => {
    console.log('Connected with server.');
});
```

#### Methods

* `()` Constructor, return an instance of `Megastores`
* `attach(store|[stores])` Attach a Store or a list of stores, also create `redux` store, so you need to attach all stores before starting a connection with server
* `connect(url, port)` Connect to server with `url` and `port`
* `on(event|custom-event, callback)` Listen event
* `send(custom-event, data)` Send event to server

### Client - Store

#### Properties

* `items` Get data stored

#### Methods

* `(name, initialStore = [], options = {})` Constructor, return an instance of `Store`
    * `initialStore` can be an array or an Object
    * `options` Object of options
        * `offline` Default `false`, enable offline mode, there are no exchanges with server, and data are stored into local storage
        * `enableCache` Default `true`, enable catching items when connection with server is lost
* `put(item|property)` Put an item or a property of Object into Store
* `update(index, item|property)` Update item or property at `index`
* `remove(index|property)` Remove item or property
* `use(callback)` Add middleware called every time when action is dispatching
    * `callback(action, oldState, newState, next)`
* `subscribe(callback)` Add listener called each time action is dispatched
    * `callback(items)` With `items` is the current state of Store

```javascript
// Exemple
var fruits = new Store('fruits', ['apple', 'lemon', 'cherry']);

var client = new Megastores();
client.attach(fruits).connect('ws://localhost:8080');

fruits.subscribe((items) => {
    console.log(items); // display current state
});

fruits.use(() => console.log('juste say hello when state changes'));

fruits.put('raspberry');
fruits.update(1, 'strawberry'); // change lemon to strawberry
fruits.remove(0); // delete apple
```
-----------

## Example

### Todolist client

```javascript
<script src="node_modules/megastores/dist/megastores-client.js">

<ul id="list">
</ul>
<form id="todo-form">
    <input type="text"/>
    <button type="submit">Envoyer</button>
</form>

<script>
    const form = document.querySelector('#todo-form');
    const list = document.querySelector('#list');

    const todoStore = new Store('todo');
    const client = new Megastores();

    const render = function(items) {
        list.innerHTML = '';
        items.forEach(function(item) {
            var li = document.createElement('li');
            li.innerHTML = item.do;
            list.appendChild(li);
        });
    }

    client.attach(todoStore).connect('ws://localhost:8080').on('open', function() {
        render(todoStore.items);
    });

    todoStore.subscribe(function(items) {
        render(items);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var input = form.querySelector('input');
        todoStore.put({ do: input.value });

        input.value = null;
    });
</script>
```

### Todolist server

```javascript
const { Store, Megastores } = require('megastores');

var items = [] // Get items from database

const todoStore = new Store('todo', items);
const server = new Megastores();

server.attach(todoStore).listen(8080);

todoStore.use((action, oldState, newState, next) => {
    // Persist data into database

    next();
});
```
---------------------

## License

[MIT](https://github.com/kevinbalicot/megastores.js/blob/master/LICENSE.md)

## Test

```
$ npm test
```

![Have fun](http://cataas.com/c/583e9cbe0f673a7dec2860de/s/have%20fun?t=sq)
