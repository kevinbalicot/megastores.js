'use strict';

const engine = require('engine.io');
const BaseMegastores = require('./../common/megastores');

class Megastores extends BaseMegastores {

    constructor () {
        super();
        this.server = null;
    }

    /**
     * Listen on port
     * @param port
     */
    listen (port = 8080) {

        if (this.store == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        // Listen on port
        this.server = engine.listen(port);
        this.server.on('connection', client => {
            this.trigger('open');
            this.synchronize(client);

            // Receive message from clients, dispatch to store
            client.on('message', action => {
                this.trigger('message');
                this.dispatch(JSON.parse(action), client);
            });

            client.on('close', () => {
                this.trigger('close');
            });
        });

        return this;
    }

    /**
     * Synchronize stores with clients
     * @param client
     */
    synchronize (client) {
        this.stores.forEach(store => {
            let data = { type: store.SYNCHRONIZE_ALL_ITEMS, payload: store.items };
            client.send(JSON.stringify(data));
        });
    }

    /**
     * Broadcast client actions dispatched
     * @param action
     * @param client
     * @throw Error
     */
    broadcast (action, client = null) {

        if (this.server == null) {
            throw new Error(this.ERROR_INSTANTIATE);
        }

        for (let key in this.server.clients) {
            if (client !== null && key === client.id) {
                continue;
            }

            this.server.clients[key].send(JSON.stringify(action));
        };
    }

    /**
     * Dispatch action into global store and broadcast it
     * @param action
     * @param client
     */
    dispatch (action, client = null) {
        if (!!this.server) {
            this.broadcast(action, client);
        }

        this.store.dispatch(action);
    }
}

module.exports = Megastores;
