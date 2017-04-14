const BaseStore = require('./../common/store');

/**
 * ServerStore module
 * @module ServerStore
 */
class Store extends BaseStore {
    /**
     * @extends BaseStore
     * @param {string} name
     * @param {Array} [initialState=[]]
     * @param {Object} [options={}]
     *
     * @alias module:ServerStore
     */
     constructor(name, intialState = [], options = {}) {
         super(name, intialState, options);
     }
}

module.exports = Store;
