module.exports = (action, oldState, newState, middlewares) => {
    let next = () => {};
    let i = middlewares.length;

    while (i--) {
        next = middlewares[i].callback.bind(middlewares[i], action, oldState, newState, next);
    }

    return next;
};
