const compose = require('./compose');
const uuid = require('uuid');

/**
 * BaseStore module
 * @module BaseStore
 */
class BaseStore {

    /**
     * Base store
     * @param {string} name
     * @param {Array} [initialState=[]]
     * @param {Object} [options={}]
     *
     * @alias module:BaseStore
     */
    constructor(name, intialState = [], options = {}) {
        this.name = name;
        this.options = options;
        this.store = null;
        this.intialState = intialState;
        this.middlewares = [];

        // Reducer events
        this.ADD_ITEM = `add_item_into_${this.name}`;
        this.UPDATE_ITEM = `update_item_into_${this.name}`;
        this.DELETE_ITEM = `delete_item_into_${this.name}`;
        this.SYNCHRONIZE_ALL_ITEMS = `synchronize_all_items_into_${this.name}`;

        // Error message
        this.ERROR_INSTANTIATE = 'No store instantiated.';
    }

    /**
     * Reducer, modify current state depends of action
     * @param {Array} [state=[]]
     * @param {Object} [action={}]
     * @param {string} [action.type]
     * @param {Object} [action.payload]
     *
     * @return {*}
     *
     * @alias module:Store
     */
    reducer(state = [], action = {}) {
        let newState = this.createNewState(state);
        let edited = false;

        switch (action.type) {
            case this.ADD_ITEM:
                newState = this.merge(newState, action.payload);
                edited = true;
                break;
            case this.UPDATE_ITEM:
                newState = this.edit(newState, action.index, action.payload);
                edited = true;
                break;
            case this.DELETE_ITEM:
                newState = this.delete(newState, action.index);
                edited = true;
                break;
            case this.SYNCHRONIZE_ALL_ITEMS:
                edited = true;
                break;
        }

        if (edited) {
            this.dispatchMiddelwares(action, state, newState);
        }

        return newState;
    }

    /**
     * Private method to create new state from a state
     * @protected
     * @param {Object} state
     *
     * @return {Array|Object}
     *
     * @alias module:BaseStore
     */
    createNewState(state) {
        if (Array.isArray(state)) {
            return [].concat(state);
        }

        return Object.assign({}, state);
    }

    /**
     * Private method to merge item or property into state
     * @param {Object} state
     * @param {Object} item
     *
     * @return {Array|Object}
     *
     * @alias module:BaseStore
     */
    merge(state, item) {
        if (Array.isArray(state)) {
            return state.concat(item);
        }

        return Object.assign(state, item);
    }

    /**
     * Private method to update item or property of state
     * @param {Object} state
     * @param {number} index
     * @param {Object} item
     *
     * @return {Object} state
     *
     * @alias module:BaseStore
     */
    edit(state, index, item) {
        state[index] = item;

        return state;
    }

    /**
     * Private method to delete item or property of state
     * @param {Object} state
     * @param {number} index
     *
     * @return {Object} state
     *
     * @alias module:BaseStore
     */
    delete(state, index) {
        if (Array.isArray(state)) {
            state.splice(index, 1);
        } else {
            delete state[index];
        }

        return state;
    }

    /**
     * Dispatch action at middelwares
     * @param {Object} [action={}]
     * @param {string} [action.type]
     * @param {Object} [action.payload]
     * @param {Object} oldState
     * @param {Object} newState
     *
     * @alias module:BaseStore
     */
    dispatchMiddelwares(action, oldState, newState) {
        compose(action, oldState, newState, this.middlewares)();
    }

    /**
     * Add middleware
     * @param {Callable} callback
     *
     * @alias module:BaseStore
     */
    use(callback) {
        this.middlewares.push({ callback });
    }

    /**
     * Put item or property
     * @param {Object} item
     * @throw Error
     *
     * @return {*}
     *
     * @alias module:BaseStore
     */
    put(item) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (!!this.options.autoIndex) {
            item._id = uuid.v4();
        }

        return this.store.dispatch({ type: this.ADD_ITEM, payload: item }, this);
    }

    /**
     * Find item by key, value or find property by key
     * @param {string} key
     * @param {*} value
     * @throw Error
     *
     * @return {Object|array|null}
     *
     * @alias module:BaseStore
     */
    find(key, value = null) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (Array.isArray(this.items)) {
            return this.items.filter(item => item[key] === value);
        }

        return this.items[key] == undefined ? null : this.items[key];
    }

    /**
     * Find one item by key, value or find property by key
     * @param {string} key
     * @param {*} value
     * @throw Error
     *
     * @return {Object|null}
     *
     * @alias module:BaseStore
     */
    findOne(key, value = null) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (Array.isArray(this.items)) {
            return this.items.find(item => item[key] === value);
        }

        return this.items[key] == undefined ? null : this.items[key];
    }

    /**
     * Update item or property
     * @param {number|Object} index
     * @param {Object} [item=null]
     * @throw Error
     *
     * @return {*}
     *
     * @alias module:BaseStore
     */
    update(index, item = null) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (!!this.options.autoIndex && !!index._id) {
            item = index;
            index = this.items.findIndex(el => el._id === index._id);
        }

        return this.store.dispatch({ type: this.UPDATE_ITEM, payload: item, index }, this);
    }

    /**
     * Remove item or property
     * @param {number|string|Object} index
     * @throw Error
     *
     * @return {*}
     *
     * @alias module:BaseStore
     */
    remove(index) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (!!this.options.autoIndex && !!index._id) {
            index = this.items.findIndex(el => el._id === index._id);
        }

        return this.store.dispatch({ type: this.DELETE_ITEM, index }, this);
    }

    /**
     * Subscribe to state changes
     * @param {Callable} callback
     * @throw Error
     *
     * @return {*}
     *
     * @alias module:BaseStore
     */
    subscribe(callback) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        return this.store.subscribe(() => callback(this.items));
    }

    /**
     * Get store's state
     *
     * @return {Object|Array}
     *
     * @alias module:BaseStore
     */
    get items() {
        if (!!this.store) {
            return this.store.getState()[this.name];
        }

        return [];
    }
}

module.exports = BaseStore;
