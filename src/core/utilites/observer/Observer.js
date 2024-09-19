export default class Observer {
    constructor() {
        /**
         * @property _events
         * @type {Object}
         * @private
         */
        this._events = {};

        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
    }

    /**
     * @method on
     * @param eventName {string}
     * @param callback {Function}
     * @returns {Observer}
     */
    on(eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(callback);

        return this;
    }

    /**
     * @method off
     * @param eventName {string}
     * @param callback {Function}
     * @returns {Observer}
     */
    off(eventName, callback) {
        let event = this._events[eventName];

        if (event) {
            this._events[eventName] = event.filter((func) => func !== callback);
        }

        return this;
    }

    /**
     * @method trigger
     * @param eventNames {string}
     * @param args {*}
     * @returns {Observer}
     */
    trigger(eventNames, ...args) {
        eventNames.split(" ").forEach((eventName) => {
            if (this._events[eventName]) {
                this._events[eventName].forEach((callback) => callback(...args));
            }
        });

        return this;
    }

    /**
     * @method installTo
     * @param obj {Object}
     * @returns {Observer}
     */
    installTo(obj) {
        obj.on = this.on;
        obj.off = this.off;

        return this;
    }
}
