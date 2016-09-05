const assert = require('assert');
const Store = require('./../src/common/store');
const Megastores = require('./../src/common/megastores');

describe('Common API', () => {

    describe('Base', () => {

        describe('Create new store named toto', () => {
            it('should have store with name toto', () => {
                let store = new Store('toto');
                assert.equal(store.name, 'toto');
            });
        });

        describe('Attach stores to megastores', () => {
            it('should have stores into megastores', () => {
                let store = new Store('toto');
                let store2 = new Store('tata');
                let megastores = new Megastores();

                megastores.attach([store, store2]);

                assert.deepEqual(megastores.stores, [store, store2]);
            });
        });

        describe('Create new store with initial data', () => {
            it('should have store with intial data', () => {
                let initial = [1, 2, 3];
                let store = new Store('foo', initial);
                let megastores = new Megastores();

                megastores.attach(store);
                assert.deepEqual(store.items, initial);

                initial = { text: 'foo', state: 0 };
                store = new Store('foo', initial);
                megastores = new Megastores();

                megastores.attach(store);
                assert.deepEqual(store.items, initial);
            });
        });

        describe('Subscribe to store', () => {
            it('should have callback called after dispatch action', () => {
                let expected = { text: 'toto' };
                store = new Store('foo');
                megastores = new Megastores();

                megastores.attach(store);

                store.subscribe(items => {
                    assert.deepEqual(items, [expected]);
                });

                store.put(expected);
            });
        });

        describe('Add midleware to store', () => {
            it('should have callback called after dispatch action with new and old state', () => {
                let expected = { text: 'toto' };
                let store = new Store('foo');
                let megastores = new Megastores();

                megastores.attach(store);

                store.use((action, oldState, newState) => {
                    assert.equal(action.type, store.ADD_ITEM);
                    assert.deepEqual(oldState, []);
                    assert.deepEqual(newState, [expected]);
                });

                store.put(expected);
            });
        });

        describe('Dispatch action before attach store to megastores', () => {
            it('should have exceptions', () => {
                let store = new Store('foo');
                assert.throws(() => store.put({ something: 'toto' }), Error);
                assert.throws(() => store.update(0, { something: 'toto' }), Error);
                assert.throws(() => store.remove(0), Error);
                assert.throws(() => store.subscribe(() => {}), Error);
            });
        });
    });

    describe('Items is an array', () => {

        let store, megastores = null;

        before(() => {
            store = new Store('my-store');
            megastores = new Megastores();
            megastores.attach(store);
        });

        describe('Put something into store', () => {
            it('should have something into store', () => {
                let expected = { item: 'something' };
                store.put(expected);
                assert.equal(store.items.length, 1);
                assert.deepEqual(store.items[0], expected);
            });
        });

        describe('Remove item at index 0', () => {
            it('should have empty store', () => {
                store.remove(0);
                assert.equal(store.items.length, 0);
                assert.equal(store.items[0], undefined);
            });
        });

        describe('Update item', () => {
            it('should have same item after edition', () => {
                let initial = { text: 'toto', state: 0 };
                store.put(initial);
                assert.equal(store.items.length, 1);
                assert.deepEqual(store.items[0], initial);

                let updated = { text: 'tata', state: 0 };
                store.update(0, updated);
                assert.deepEqual(store.items[0], updated);

                store.remove(0);
            });
        });

        describe('Find items', () => {
            it('should find items', () => {
                let items = [
                    { text: 'foo', state: 0 },
                    { text: 'bar', state: 1 },
                    { text: 'toto', state: 2 },
                    { text: 'tata', state: 0 }
                ];

                store.put(items[0]);
                store.put(items[1]);
                store.put(items[2]);
                store.put(items[3]);

                assert.deepEqual(store.find('text', 'foo'), [items[0]]);
                assert.deepEqual(store.find('text', 'bar'), [items[1]]);
                assert.deepEqual(store.find('text', 'toto'), [items[2]]);
                assert.deepEqual(store.find('text', 'tata'), [items[3]]);

                assert.deepEqual(store.find('state', 0), [items[0], items[3]]);

                assert.deepEqual(store.find('foo', 'bar'), []);
            });
        });
    });

    describe('Items is a object', () => {

        let store, megastores = null;

        before(() => {
            store = new Store('my-store', {});
            megastores = new Megastores();
            megastores.attach(store);
        });

        describe('Put object into store', () => {
            it('should have same object into store', () => {
                let expected = { name: 'toto', state: 0, items: [1, 2, 4], useless: true };
                store.put(expected);
                assert.deepEqual(store.items, expected);
            });
        });

        describe('Remove property', () => {
            it('should have object without property', () => {
                store.remove('useless');
                assert.deepEqual(store.items, { name: 'toto', state: 0, items: [1, 2, 4] });
            });
        });

        describe('Update object', () => {
            it('should have object updated after edition', () => {
                store.update('removed', true);
                assert.deepEqual(store.items, { name: 'toto', state: 0, items: [1, 2, 4], removed: true });
            });
        });

        describe('Find property', () => {
            it('should find value of property', () => {
                assert.deepEqual(store.find('items'), [1, 2, 4]);
                assert.deepEqual(store.find('name'), 'toto');
                assert.deepEqual(store.find('state'), 0);
                assert.deepEqual(store.find('removed'), true);
                assert.deepEqual(store.find('unknown'), null);
            });
        });
    });
});
