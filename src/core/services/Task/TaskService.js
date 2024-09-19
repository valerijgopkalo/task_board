export default class TaskService {
    constructor(props) {
        /**
         * @property _events
         * @type {{toCreate: string}}
         * @private
         */
        this._events = {
            toCreate: "toCreate"
        };

        /**
         * @private
         * @property _observer
         * @type {Observer}
         */
        this._observer = new props.dependencies.Observer().installTo(this);

        /**
         * @private
         * @property StatusEntity
         * @type {Status}
         */
        this._StatusEntity = props.dependencies.StatusEntity;

        /**
         * @private
         * @property StatusEntity
         * @type {Priority}
         */
        this._PriorityEntity = props.dependencies.PriorityEntity;

        /**
         * @private
         * @property _statusNameEnum
         * @type {Enum}
         */
        this._statusNameEnum = props.dependencies.StatusNameEnum;

        /**
         * @private
         * @property _statusTypeEnum
         * @type {Enum}
         */
        this._statusTypeEnum = props.dependencies.StatusTypeEnum;

        /**
         * @private
         * @property _priorityNameEnum
         * @type {Enum}
         */
        this._priorityNameEnum = props.dependencies.PriorityNameEnum;

        /**
         * @private
         * @property _priorityTypeEnum
         * @type {Enum}
         */
        this._priorityTypeEnum = props.dependencies.PriorityTypeEnum;
    }

    /**
     * @public
     * @method getEvents
     * @return {{toCreate: string}}
     */
    getEvents() {
        return {...this._events};
    }

    /**
     * @public
     * @method getAllStatuses
     * @returns {Status[]}
     */
    getAllStatuses() {
        return [
            new this._StatusEntity()
                .setId(this._statusTypeEnum.getTodoAsValue())
                .setName(this._statusNameEnum.getTodoAsValue()),

            new this._StatusEntity()
                .setId(this._statusTypeEnum.getInProgressAsValue())
                .setName(this._statusNameEnum.getInProgressAsValue()),

            new this._StatusEntity()
                .setId(this._statusTypeEnum.getDoneAsValue())
                .setName(this._statusNameEnum.getDoneAsValue())
        ];
    }

    /**
     * @public
     * @method getAllPriorities
     * @returns {Priority[]}
     */
    getAllPriorities() {
        return [
            new this._PriorityEntity()
                .setId(this._priorityTypeEnum.getLowAsValue())
                .setName(this._priorityNameEnum.getLowAsValue()),

            new this._PriorityEntity()
                .setId(this._priorityTypeEnum.getHighAsValue())
                .setName(this._priorityNameEnum.getHighAsValue()),

            new this._PriorityEntity()
                .setId(this._priorityTypeEnum.getHighestAsValue())
                .setName(this._priorityNameEnum.getHighestAsValue())
        ];
    }

    /**
     * @public
     * @method getStatusById
     * @param id {string|number}
     * @returns {Status|undefined}
     */
    getStatusById(id) {
        return this.getAllStatuses().find((item) => item.getId() === id);
    }

    /**
     * @public
     * @method getPriorityById
     * @param id {string|number}
     * @returns {Priority|undefined}
     */
    getPriorityById(id) {
        return this.getAllPriorities().find((item) => item.getId() === id);
    }

    /**
     * @public
     * @method filterItemsByType
     * @param items {Task[]}
     * @param type {string|number}
     * @returns {Task[]}
     */
    filterItemsByType(items = [], type = 0) {
        return items.filter((item) => item.getStatusId() === type);
    }

    /**
     * @public
     * @method toCreateTask
     * @param [type] {string|number}
     * @returns {TaskService}
     */
    toCreateTask(type) {
        this._observer.trigger(this.getEvents().toCreate, type || this._statusTypeEnum.getTodoAsValue());

        return this;
    }
}
