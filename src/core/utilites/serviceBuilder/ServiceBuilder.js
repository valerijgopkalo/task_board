/**
 * @template T
 * @class ServiceBuilder
 */
export default class ServiceBuilder {
    /**
     * @public
     * @method constructor
     * @param Service {T}
     */
    constructor(Service) {
        /**
         * @property _Service
         * @type {T}
         * @private
         */
        this._Service = Service;
    }

    /**
     * @public
     * @method getInstance
     * @returns {T}
     */
    getInstance() {
        return this._Service;
    }
}