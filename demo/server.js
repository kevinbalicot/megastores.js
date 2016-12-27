'use strict';

const { Store, Megastores } = require('./src/server');

let megastore = new Megastores();
let todoStore = new Store('todo', [
    { text: 'toto' }
]);

megastore.attach(todoStore).listen(8081);

todoStore.subscribe(items => console.log(items));
//todoStore2.subscribe(items => console.log('list2', items));


console.log(todoStore.items);
setInterval(() => {
    //todoStore.put({ text: 'aaa' });
    //todoStore2.put({ text: 'bbb' });
}, 5000);
