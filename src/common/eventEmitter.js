/**
 * EventEmitter module
 * @module EventEmitter
 */
class EventEmitter {
    constructor() {
        this.listeners = [];
    }

    /**
     * Add event listener
     * @param {string} event
     * @param {Callable} callback
     * @param {*} context
     *
     * @return {EventEmitter}
     *
     * @alias module:EventEmitter
     */
    on(event, callback, context) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push({ once: false, callback, context });

        return this;
    }

    /**
     * Add event listener will call one time
     * @param {string} event
     * @param {Callable} callback
     * @param {*} context
     *
     * @return {EventEmitter}
     *
     * @alias module:EventEmitter
     */
    once(event, callback, context) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push({ once: true, callback, context });

        return this;
    }

    /**
     * Delete event listeners
     * @param {string} event
     *
     * @return {EventEmitter}
     *
     * @alias module:EventEmitter
     */
    off(event) {
        if (!!this.listeners[event]) {
            delete this.listeners[event];
        }

        return this;
    }

    /**
     * Call every listener for event
     * @param {string} event
     * @param {Object} [data={}]
     *
     * @return {EventEmitter}
     *
     * @alias module:EventEmitter
     */
    trigger(event, data = {}) {
        if (!!this.listeners[event]) {
            let i = 0;
            this.listeners[event].forEach(listener => {
                listener.callback.call(listener.context || this, data);

                if (listener.once) {
                    this.listeners[event].splice(i, 1);
                }

                i++;
            });
        }

        return this;
    }
}

module.exports = EventEmitter;
