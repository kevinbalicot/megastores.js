'use strict';

const { combineReducers, createStore, applyMiddleware } = require('redux');
const EventEmitter = require('./eventEmitter');

class BaseMegastores extends EventEmitter {

    constructor () {
        super();
        this.reducers = {};
        this.stores = [];
        this.intialState = {};
        this.store = null;

        this.ERROR_INSTANTIATE = 'No store instantiated.';
    }

    /**
     * Subscribe to global store
     * @param callback
     */
    subscribe (callback) {
        this.store.subscribe(callback);
    }

    /**
     * Dispatch action into global store
     * @param action
     * @param client
     */
    dispatch (action, client = null) {
        this.store.dispatch(action);
    }

    /**
     * Get current state of global store
     */
    getState () {
        return this.store.getState();
    }

    /**
     * Add store or a list of stores into global store
     * @param store
     */
    attach (store) {
        if (Array.isArray(store)) {
            store.forEach(store => {
                this.stores.push(store);
                // For each store, get reducer and inisital state
                this.reducers[store.name] = store.reducer.bind(store);
                this.intialState[store.name] = store.intialState;
            });
        } else {
            this.stores.push(store);
            this.reducers[store.name] = store.reducer.bind(store);
            this.intialState[store.name] = store.intialState;
        }

        this.createStore();

        return this;
    }

    /**
     * Create global store
     */
    createStore () {
        this.store = createStore(combineReducers(this.reducers), this.intialState);
        this.stores.forEach(store => store.store = this);
    }
}

module.exports = BaseMegastores;
