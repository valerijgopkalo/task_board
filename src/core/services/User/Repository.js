export default class Repository {
    constructor() {
        /**
         * @property _items
         * @type {Array}
         * @private
         */
        this._items = this._buildDefaultUsers();
    }

    /**
     * @method _buildDefaultUsers
     * @returns {Array}
     * @private
     */
    _buildDefaultUsers() {
        return [
            {
                id: 1,
                name: "Stan",
            },
            {
                id: 2,
                name: "Helen",
            },
            {
                id: 3,
                name: "David"
            },
            {
                id: 4,
                name: "Nick"
            },
            {
                id: 5,
                name: "John"
            }
        ];
    }

    /**
     * @public
     * @method getTeamMembers
     * @returns {Promise<Array>}
     */
    getTeamMembers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._items);
            }, 500);
        });
    }
}
