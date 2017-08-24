const engine = require('engine.io-client');
const BaseMegastores = require('./../common/megastores');
const EventEmitter = require('./../common/eventEmitter');

/**
 * ClientMegastores module
 * @module ClientMegastores
 */
class Megastores extends BaseMegastores {
    /**
     * @extends BaseMegastores
     *
     * @alias module:ClientMegastores
     */
    constructor() {
        super();

        this.connection = null;
        this.connecting = null;
        this.connected = false;
    }

    /**
     * Connect to server
     * @param {string} url - Server URI
     * @param {string|number} [port=8080] - Server uri port
     *
     * @return {Megastores}
     *
     * @alias module:ClientMegastores
     */
    connect(url, port = 8080) {
        if (this.store == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (!!this.connected) {
            return this;
        }

        clearInterval(this.connecting);
        this.listenNewConnection(url, port);

        // Connect to server
        this.connection = new engine.Socket(`${url}:${port}`);
        this.connection.on('open', () => {

            this.connected = true;
            this.trigger('open', this.connection);

            if (!!this.connecting) {
                clearInterval(this.connecting);
                this.connecting = null;
                this.synchronize();
            }

            // Receive message from server, dispatch to store
            this.connection.on('message', message => {
                const action = JSON.parse(message);
                this.trigger('message', action);

                if (!!action.event) {
                    this.trigger(action.event, action.data);
                } else {
                    this.store.dispatch(action);
                }
            });

            // Lost connection with server, try to reconnect
            this.connection.on('close', () => {
                this.connected = false;
                this.trigger('close');
                this.listenNewConnection(url, port);
            });
        });

        return this;
    }

    /**
     * Dispatch action
     * @param {string} action
     * @param {Store} store
     *
     * @alias module:ClientMegastores
     */
    dispatch(action, store) {
        // Don't send to server if offline mode or no connection
        if (!!this.connection && !store.options.offline) {
            this.connection.send(JSON.stringify(action));
        }

        this.store.dispatch(action);
    }

    /**
     * Synchronize data with server when reconnection
     *
     * @alias module:ClientMegastores
     */
    synchronize() {
        this.stores.forEach(store => {
            // Use store cache
            store.cache.forEach(action => this.connection.send(JSON.stringify(action)));
        });
    }

    /**
     * Send message at server
     * @param {string} event
     * @param {Object} data
     *
     * @alias module:ClientMegastores
     */
    send(event, data) {
        this.connection.send(JSON.stringify({ event, data }));
    }

    /**
     * Try to reconnecte
     * @param {string} url
     * @param {port} port
     *
     * @alias module:ClientMegastores
     */
    listenNewConnection(url, port) {
        this.connecting = setInterval(() => {
            this.connect(url, port);
        }, 10000);
    }
}

module.exports = Megastores;
