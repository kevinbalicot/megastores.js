/**
 * Queue handle middlewares
 * @module compose
 */

 /**
  * @param {Object} action
  * @param {string} action.type
  * @param {Object} action.payload
  * @param {Array|Object} oldState
  * @param {Array|Object} newState
  * @param {Array<Object>} middlewares
  *
  * @return {*}
  *
  * @alias module:compose
  */
module.exports = (action, oldState, newState, middlewares) => {
    let next = () => {};
    let i = middlewares.length;

    while (i--) {
        next = middlewares[i].callback.bind(middlewares[i], action, oldState, newState, next);
    }

    return next;
};
