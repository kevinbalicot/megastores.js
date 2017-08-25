const { combineReducers, createStore, applyMiddleware } = require('redux');
const EventEmitter = require('events');

/**
 * BaseMegastores module
 * @module BaseMegastores
 */
class BaseMegastores extends EventEmitter {

    /**
     * @extends EventEmitter
     *
     * @alias module:BaseMegastores
     */
    constructor() {
        super();

        this.reducers = {};
        this.stores = [];
        this.intialState = {};
        this.store = null;

        this.ERROR_INSTANTIATE = 'No store instantiated.';
    }

    /**
     * Subscribe to global store
     * @param {Callable} callback
     *
     * @return {Callable}
     *
     * @alias module:BaseMegastores
     */
    subscribe(callback) {
        return this.store.subscribe(callback);
    }

    /**
     * Dispatch action into global store
     * @param {Object} action
     * @param {Object} [client=null]
     *
     * @alias module:BaseMegastores
     */
    dispatch(action, client = null) {
        this.store.dispatch(action);
    }

    /**
     * Get current state of global store
     *
     * @return {Object}
     *
     * @alias module:BaseMegastores
     */
    getState() {
        return this.store.getState();
    }

    /**
     * Add store or a list of stores into global store
     * @param {Array<Store>|Store} store
     *
     * @return {BaseMegastores}
     *
     * @alias module:BaseMegastores
     */
    attach(store) {
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
     *
     * @alias module:BaseMegastores
     */
    createStore() {
        this.store = createStore(combineReducers(this.reducers), this.intialState);
        this.stores.forEach(store => store.store = this);
    }
}

module.exports = BaseMegastores;
