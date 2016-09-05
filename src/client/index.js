const Store = require('./store');
const Megastores = require('./megastores');

window.Store = Store;
window.Megastores = Megastores;

module.exports = {
    Store: Store,
    Megastores: Megastores
};
