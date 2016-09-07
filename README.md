# MEGASTORES.JS

`megastores` is a store manager with realtime echanges between client and server

## Dependances

* redux https://github.com/reactjs/redux
* engine.io https://github.com/socketio/engine.io

## Requirement

* nodejs >= 4.0 for server only

## How to use
### Server

```
const { Store, Megastores } = require('megastores.js');

var myStore = new Store('my-store');
var megastores = new Megastores();

megastores.attach(myStore).listen(8080);

myStore.subscribe(state => {
    console.log('new state :', state);
});
```

### Client

```
<script src="lib/megastores-client.js">
<script>
    var store = new Store('my-store');
    var megastores = new Megastores();

    megastores.attach(store).connect('http://localhost', 8080);

    store.put({ text: 'Hello world!' });
</script>
```

## Features

* Realtime echanges between client and server, every action dispatched is synchronize between server and client.
* Automatic reconnection if connection with server was lost and resynchronization
* Offline mode with local storage persistence


## API References
### Server - Megastores

#### Events
 * `open` Called every time when client opens connection with server
 * `close ` Called every time when client loses connection with server
 * `message` Called every time when client echanges with server

```
// Exemple
var megastores = new Megastores();
megastores.listen(8080).on('open', () => {
    console.log('New connection openned.');
});
```

#### Methods

* `()` Constructor, return an instance of `Megastores`
* `attach(store|[stores])` Attach a store or a list of stores, also create `redux` store, so you need to attach all stores before start server
* `listen(port)` Start server and listen on port `port`

```
// Exemple
var store1 = new Store('store1');
var store2 = new Store('store2');

var megastores = new Megastores();
megastores.attach([store1, store2]).listen(8080);
```

### Server - Store

#### Property

* `items` Get data stored

#### Methods

* `(name, initialStore = [])` Constructor, return an instance of `Store`
    * `initialStore` can be an array or a Object
* `put(item|property)` Put into store a item or a property of Object
* `update(index, item|property)` Update item or property at `index`
* `remove(index|property)` Remove item or property
* `use(callback)` Add middelware called every time action is dispatching
    * `callback(action, oldState, newState, next)`
* `subscribe(callback)` Add listener called each time action is dispatched
    * `callback(items)` With `items` is the current state of store

-------------------

### Client - Megastores

#### Events
 * `open` Called every time when connection with server is open
 * `close ` Called every time when client loses connection with server
 * `message` Called every time when server echanges with client

```
// Exemple
var megastores = new Megastores();
megastores.connect('http://localhost', 8080).on('open', () => {
    console.log('Connected with server.');
});
```

#### Methods

* `()` Constructor, return an instance of `Megastores`
* `attach(store|[stores])` Attach a store or a list of stores, also create `redux` store, so you need to attach all stores before start connection with server
* `connect(url, port)` Connect to server with `url` and `port`

### Client - Store

#### Properties

* `items` Get data stored

#### Methods

* `(name, initialStore = [], options = {})` Constructor, return an instance of `Store`
    * `initialStore` can be an array or a Object
    * `options` Object of options
        * `offline` Default `false`, enable offline mode, there are no echanges with server, and data are store into local storage
        * `enableSynchronize` Default `true`, enable caching items when connection with server lost
* `put(item|property)` Put into store a item or a property of Object
* `update(index, item|property)` Update item or property at `index`
* `remove(index|property)` Remove item or property
* `use(callback)` Add middelware called every time action is dispatching
    * `callback(action, oldState, newState, next)`
* `subscribe(callback)` Add listener called each time action is dispatched
    * `callback(items)` With `items` is the current state of store

-----------

## Example

### Todolist client

```
<script src="lib/megastores-client.js">

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
    const megastores = new Megastores();

    const render = function(items) {
        list.innerHTML = '';
        items.forEach(function(item) {
            var li = document.createElement('li');
            li.innerHTML = item.do;
            list.appendChild(li);
        });
    }

    megastores.attach(todoStore).connect('http://localhost', 8080).on('open', function() {
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

```
const { Store, Megastores } = require('megastores.js');

var items = [] // Get items from database

const todoStore = new Store('todo', items);
const megastores = new Megastores();

megastores.attach(todoStore).listen(8080);

todoStore.use(function(action, oldState, newState, next) {
    // Persist data into database

    next(action, oldState, newState);
});

```

---------------------

## License

MIT

## Test

```
$ npm test
```

![Have fun](http://cataas.com/cat/says/have%20fun?type=sq)
