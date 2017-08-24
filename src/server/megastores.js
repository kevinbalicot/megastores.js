const engine = require('engine.io');
const BaseMegastores = require('./../common/megastores');

/**
 * ServerMegastores module
 * @module ServerMegastores
 */
class Megastores extends BaseMegastores {
    /**
     * @extends BaseMegastores
     *
     * @alias module:ServerMegastores
     */
    constructor () {
        super();
        this.server = null;
    }

    /**
     * Listen on port
     * @param {number|string} [port=8080]
     *
     * @return {Megastores}
     *
     * @alias module:ServerMegastores
     */
    listen(port = 8080) {
        if (this.store == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        // Listen on port
        this.server = engine.listen(port);
        this.server.on('connection', client => {
            this.trigger('open', client);
            this.synchronize(client);

            // Receive message from clients, dispatch to store
            client.on('message', message => {
                const action = JSON.parse(message);
                this.trigger('message', action);

                if (!!action.event) {
                    this.trigger(action.event, { data: action.data, client: client });
                } else {
                    this.dispatch(action, client);
                }
            });

            client.on('close', () => {
                this.trigger('close', client);
            });
        });

        return this;
    }

    /**
     * Synchronize stores with clients
     * @param {Object} client
     *
     * @alias module:ServerMegastores
     */
    synchronize(client) {
        this.stores.forEach(store => {
            const data = { type: store.SYNCHRONIZE_ALL_ITEMS, payload: store.items };
            client.send(JSON.stringify(data));
        });
    }

    /**
     * Broadcast client actions dispatched
     * @param {string} action
     * @param {Object} [fromClient=null]
     * @throw Error
     *
     * @alias module:ServerMegastores
     */
    broadcast(action, fromClient = null) {
        if (this.server == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        for (let key in this.server.clients) {
            if (fromClient !== null && key === fromClient.id) {
                continue;
            }

            this.server.clients[key].send(JSON.stringify(action));
        };
    }

    /**
     * Dispatch action into global store and broadcast it
     * @param {string} action
     * @param {Object} [client=null]
     *
     * @alias module:ServerMegastores
     */
    dispatch(action, client = null) {
        if (!!this.server) {
            this.broadcast(action, client);
        }

        this.store.dispatch(action);
    }

    /**
     * Send message to client or all client
     * @param {string} event
     * @param {Object} data
     * @param {Object} [client=null]
     *
     * @alias module:ServerMegastores
     */
    send(event, data, client = null) {
        if (!!client) {
            client.send(JSON.stringify({ event, data }));
        } else {
            this.broadcast({ event, data });
        }
    }
}

module.exports = Megastores;
