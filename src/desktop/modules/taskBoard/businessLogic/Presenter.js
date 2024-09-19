export default class Presenter {
    constructor(props) {
        /**
         * @private
         * @property _Model
         * @type {TaskBoard}
         */
        this._Model = props.dependencies.Model;
    }

    /**
     * @public
     * @method getInitialData
     * @returns {Promise<{items: Task[], teamMembers: User[]}>}
     */
    getInitialData() {
        return this._Model.getInitialData();
    }

    /**
     * @public
     * @method createTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    createTask(task) {
        let result = null;

        if (task) {
            result = this._Model.createTask(task);
        } else {
            result = Promise.reject();
        }

        return result;
    }

    /**
     * @public
     * @method updateTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    updateTask(task) {
        let result = null;

        if (task) {
            result = this._Model.updateTask(task);
        } else {
            result = Promise.reject();
        }

        return result;
    }

    /**
     * @public
     * @method deleteTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    deleteTask(task) {
        let result = null;

        if (task) {
            result = this._Model.deleteTask(task);
        } else {
            result = Promise.reject();
        }

        return result;
    }
}