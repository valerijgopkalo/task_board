export default class Repository {
    constructor() {
        /**
         * @property _items
         * @type {Array}
         * @private
         */
        this._items = this._buildDefaultTasks();
    }

    /**
     * @method _buildDefaultTasks
     * @returns {Array}
     * @private
     */
    _buildDefaultTasks() {
        let result = [];

        for (let i = 1; i <= 10; i++) {
            result.push({
                id: i,
                title: `Task ${i}`,
                description: "task description",
                status: {
                    id: 1,
                    name: "Todo"
                },
                priority: {
                    id: 1,
                    name: "Low"
                }
            });
        }

        for (let i = 11; i <= 15; i++) {
            result.push({
                id: i,
                title: `Task ${i}`,
                description: "task description",
                status: {
                    id: 2,
                    name: "InProgress"
                },
                priority: {
                    id: 2,
                    name: "High"
                }
            });
        }

        for (let i = 16; i <= 23; i++) {
            result.push({
                id: i,
                title: `Task ${i}`,
                description: "task description",
                status: {
                    id: 3,
                    name: "Done"
                },
                priority: {
                    id: 3,
                    name: "Highest"
                }
            });
        }

        return result;
    }

    /**
     * @method _updateTask
     * @param task {Object}
     * @returns {Array}
     * @private
     */
    _updateTask(task) {
        this._items = this._items.reduce((items, item) => {
            let result = item;

            if (item.id === task.id) {
                result = task;
            }

            items.push(result);

            return items;
        }, []);

        return this._items;
    }

    /**
     * @method _deleteTask
     * @param task {Object}
     * @returns {Array}
     * @private
     */
    _deleteTask(task) {
        this._items = this._items.filter((item) => item.id !== task.id);

        return this._items;
    }

    /**
     * @private
     * @method _buildAsyncProcess
     * @param callback {Function}
     * @returns {Promise<Array>}
     */
    _buildAsyncProcess(callback) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                callback(resolve, reject);
            }, 1000);
        });
    }

    /**
     * @public
     * @method getTask
     * @returns {Promise<Array>}
     */
    getTasks() {
        return this._buildAsyncProcess((resolve) => {
            resolve(this._items);
        });
    }

    /**
     * @public
     * @method createTask
     * @param task {Object}
     * @returns {Promise<Array>}
     */
    createTask(task) {
        return this._buildAsyncProcess((resolve) => {
            task.id = this._items.length + 1;

            this._items.push(task);

            resolve(this._items);
        });
    }

    /**
     * @public
     * @method updateTask
     * @param task {Object}
     * @returns {Promise<Array>}
     */
    updateTask(task) {
        return this._buildAsyncProcess((resolve) => {
            resolve(this._updateTask(task));
        },);
    }

    /**
     * @public
     * @method deleteTask
     * @param task {Object}
     * @returns {Promise<Array>}
     */
    deleteTask(task) {
        return this._buildAsyncProcess((resolve) => {
            resolve(this._deleteTask(task));
        });
    }
}