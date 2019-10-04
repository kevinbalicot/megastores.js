const BaseMegastores = require('./../common/megastores');

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
     * @param {string} uri - Server URI
     *
     * @return {Megastores}
     *
     * @alias module:ClientMegastores
     */
    connect(uri) {
        if (this.store == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        if (!!this.connected) {
            return this;
        }

        clearInterval(this.connecting);
        this.listenNewConnection(uri);

        // Connect to server
        this.connection = new WebSocket(uri);
        this.connection.onopen = () => {

            this.connected = true;
            this.emit('open', this.connection);

            if (!!this.connecting) {
                clearInterval(this.connecting);
                this.connecting = null;
                this.synchronize();
            }

            // Receive message from server, dispatch to store
            this.connection.onmessage = message => {
                const action = JSON.parse(message.data);
                this.emit('message', action);

                if (!!action.event) {
                    this.emit(action.event, action.data);
                } else {
                    this.store.dispatch(action);
                }
            };

            // Lost connection with server, try to reconnect
            this.connection.onclose = () => {
                this.connected = false;
                this.emit('close');
                this.listenNewConnection(uri);
            };
        };

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
        if (!!this.connection && !!this.connected && !store.options.offline) {
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
