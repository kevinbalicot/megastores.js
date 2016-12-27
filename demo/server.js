'use strict';

const { Store, Megastores } = require('./../src/server');

let megastore = new Megastores();
let todoStore = new Store('todo', [
    { text: 'toto' }
]);

todoStore.use((action, oldState, newState, next) => {
    console.log('middleware');
    console.log(action, oldState, newState);
    next();
});

megastore.attach(todoStore).listen(8081);

todoStore.subscribe(items => console.log(items));
