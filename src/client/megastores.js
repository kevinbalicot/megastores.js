'use strict';

const engine = require('engine.io-client');
const BaseMegastores = require('./../common/megastores');
const EventEmitter = require('./../common/eventEmitter');

class Megastores extends BaseMegastores {

    constructor () {
        super();
        this.connection = null;
        this.connecting = null;
        this.connected = false;
    }

    /**
     * Connect to server
     * @param url
     * @param port
     */
    connect (url, port = 8080) {

        if (this.store == null) {
            throw new Error('No store instanciated.');
        }

        if (!!this.connected) {
            return this;
        }

        this.listenNewConnection(url, port);

        // Connect to server
        this.connection = new engine.Socket(`${url}:${port}`);
        this.connection.on('open', () => {

            this.connected = true;
            this.trigger('open');

            if (!!this.connecting) {
                clearInterval(this.connecting);
                this.connecting = null;
                this.synchronize();
            }

            // Receive message from server, dispatch to store
            this.connection.on('message', action => {
                this.trigger('message');
                this.store.dispatch(JSON.parse(action));
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
     * @param action
     * @param store
     */
    dispatch (action, store) {
        // Don't send to server if offline mode or no connection
        if (!!this.connection && !store.options.offline) {
            this.connection.send(JSON.stringify(action));
        }

        this.store.dispatch(action);
    }

    /**
     * Synchronize data with server when reconnection
     */
    synchronize () {
        this.stores.forEach(store => {
            // Use store cache
            store.cache.forEach(action => this.connection.send(JSON.stringify(action)));
            store.cache = [];
        });
    }

    /**
     * Try to reconnecte
     * @param url
     * @param port
     */
    listenNewConnection (url, port) {
        this.connecting = setInterval(() => {
            this.connect(url, port);
        }, 10000);
    }
}

module.exports = Megastores;
