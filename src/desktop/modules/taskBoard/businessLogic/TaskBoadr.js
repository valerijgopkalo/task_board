export default class TaskBoard {
    constructor(props) {
        /**
         * @private
         * @property _Repository
         * @type {Repository}
         */
        this._Repository = props.dependencies.Repository;

        /**
         * @property _UserService
         * @type {UserService}
         * @private
         */
        this._UserService = props.dependencies.UserService;

        /**
         * @private
         * @property _TaskEntity
         * @type {Task}
         */
        this._TaskEntity = props.dependencies.TaskEntity;

        this._buildTasks = this._buildTasks.bind(this);
    }

    /**
     * @public
     * @method _buildTasks
     * @param items {Array}
     * @returns {Task[]}
     * @private
     */
    _buildTasks(items) {
        return items.map((item) => new this._TaskEntity(item));
    }

    /**
     * @public
     * @method getInitialData
     * @returns {Promise<{items: Task[], teamMembers: User[]}>}
     */
    getInitialData() {
        return Promise
            .allSettled(
                [
                    this.getTasks(),
                    this._UserService.getTeamMembers()
                ]
            )
            .then((results) => {
                let [
                        tasksResponse,
                        TeamResponse
                    ] = results;

                return {
                    items: tasksResponse.value || [],
                    teamMembers: TeamResponse.value || []
                }
            });
    }

    /**
     * @public
     * @method getTasks
     * @returns {Promise<Task[]>}
     */
    getTasks() {
        return this
            ._Repository
            .getTasks()
            .then(this._buildTasks);
    }

    /**
     * @public
     * @method createTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    createTask(task) {
        return this
            ._Repository
            .createTask(task.getEntity())
            .then(this._buildTasks);
    }

    /**
     * @public
     * @method updateTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    updateTask(task) {
        return this
            ._Repository
            .updateTask(task.getEntity())
            .then(this._buildTasks);
    }

    /**
     * @public
     * @method deleteTask
     * @param task {Task}
     * @returns {Promise<Task[]>}
     */
    deleteTask(task) {
        return this
            ._Repository
            .deleteTask(task.getEntity())
            .then(this._buildTasks);
    }
}
