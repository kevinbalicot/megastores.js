'use strict';

class BaseStore {

    /**
     * Base store
     * @param name
     * @param initialState
     * @param options
     */
    constructor (name, intialState = [], options = {}) {
        this.name = name;
        this.options = options;
        this.store = null;
        this.intialState = intialState;
        this.middelwares = [];

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
     * @param state
     * @param action
     */
    reducer (state = [], action) {
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
     * @param state
     */
    createNewState (state) {
        if (Array.isArray(state)) {
            return [].concat(state);
        }

        return Object.assign({}, state);
    }

    /**
     * Private method to merge item or property into state
     * @param state
     * @param item
     */
    merge (state, item) {
        if (Array.isArray(state)) {
            return state.concat(item);
        }

        return Object.assign(state, item);
    }

    /**
     * Private method to update item or property of state
     * @param state
     * @param index
     * @param item
     */
    edit (state, index, item) {
        state[index] = item;
        return state;
    }

    /**
     * Private method to delete item or property of state
     * @param state
     * @param index
     */
    delete (state, index) {
        if (Array.isArray(state)) {
            state.splice(index, 1);
        } else {
            delete state[index];
        }

        return state;
    }

    /**
     * Dispatch action at middelwares
     * @param action
     * @param oldState
     * @param newState
     */
    dispatchMiddelwares (action, oldState, newState) {
        if (this.middelwares.length > 0) {
            let firstMiddelware = this.middelwares[0];
            firstMiddelware.callback(action, oldState, newState, firstMiddelware.next);
        }
    }

    /**
     * Add middleware
     * @param callback
     */
    use (callback) {
        // Last middelware next to this middelware
        if (this.middelwares.length > 0) {
            this.middelwares[this.middelwares.length - 1].next = callback;
        }

        this.middelwares.push({ callback, next: () => {} });
    }

    /**
     * Put item or property
     * @param item
     * @throw Error
     */
    put (item) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        return this.store.dispatch({ type: this.ADD_ITEM, payload: item }, this);
    }

    /**
     * Find item by key, value or find property by key
     * @param key
     * @param value
     * @throw Error
     */
    find (key, value = null) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (Array.isArray(this.items)) {
            return this.items.filter(item => item[key] == value);
        }

        return this.items[key] == undefined ? null : this.items[key];
    }

    /**
     * Update item or property
     * @param index
     * @param item
     * @throw Error
     */
    update (index, item) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        return this.store.dispatch({ type: this.UPDATE_ITEM, payload: item, index: index }, this);
    }

    /**
     * Remove item or property
     * @param index
     * @param item
     * @throw Error
     */
    remove (index) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        return this.store.dispatch({ type: this.DELETE_ITEM, index: index }, this);
    }

    /**
     * Subscribe to state changes
     * @param callback
     * @throw Error
     */
    subscribe (callback) {
        if (!this.store) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        return this.store.subscribe(() => {
            callback(this.items);
        });
    }

    /**
     * Get store's state
     */
    get items () {
        if (!!this.store) {
            return this.store.getState()[this.name];
        }

        return [];
    }
}

module.exports = BaseStore;
