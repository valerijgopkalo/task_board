import {reactive} from "vue";

import TaskList from "./taskList";
import TaskCreator from "./taskCreator";

export default {
    props: {
        /**
         * @public
         * @property Presenter
         * @type {Presenter}
         */
        Presenter: {
            type: Object,
            required: true
        },
        /**
         * @public
         * @property ModalDialogService
         * @type {ModalDialogService}
         */
        ModalDialogService: {
            type: Object,
            required: true
        },
        /**
         * @public
         * @property TaskService
         * @type {TaskService}
         */
        TaskService: {
            type: Object,
            required: true
        },
        /**
         * @public
         * @property StatusTypeEnum
         * @type {Enum}
         */
        StatusTypeEnum: {
            type: Object,
            required: true
        }
    },
    components: {
        TaskList
    },
    data() {
        return {
            /**
             * @private
             * @property _loading
             * @type {boolean}
             */
            _loading: true,
            /**
             * @private
             * @property _titles
             * @type {Object}
             */
            _titles: {
                todo: "Todo",
                inProgress: "In progress",
                done: "Done",
                ok: "Ok",
                cancel: "Cancel"
            },
            /**
             * @private
             * @property _classNames
             * @type {Object}
             */
            _classNames: {
                modalTaskCreator: "modal--task-creator"
            },
            /**
             * @private
             * @property _messages
             * @type {Object}
             */
            _messages: {
                deleteItem: "Are you sure you want to delete this item?"
            },
            /**
             * @public
             * @property items
             * @type {Task[]}
             */
            items: [],
            /**
             * @public
             * @property teamMembers
             * @type {User[]}
             */
            teamMembers: []
        };
    },
    setup(props) {
        return props
            .Presenter
            .getInitialData()
            .then((response) => reactive(response));
    },
    mounted() {
        this
            ._toggleLoader(false)
            .TaskService
            .on(this.TaskService.getEvents().toCreate, this._toCreateTask);
    },
    methods: {
        _isLoading() {
            return this._loading;
        },
        _toggleLoader(state) {
            this._loading = Boolean(state);

            return this;
        },
        _getTasks() {
            return this.items;
        },
        _setTasks(items) {
            this.items = items;

            return this;
        },
        _getTodoTasks() {
            return this.TaskService.filterItemsByType(this._getTasks(), this._getTodoType());
        },
        _getInProgressTasks() {
            return this.TaskService.filterItemsByType(this._getTasks(), this._getInProgressType());
        },
        _getDoneTasks() {
            return this.TaskService.filterItemsByType(this._getTasks(), this._getDoneType());
        },
        _getTodoListTitle() {
            return this._titles.todo;
        },
        _getInProgressListTitle() {
            return this._titles.inProgress;
        },
        _getDoneListTitle() {
            return this._titles.done;
        },
        _getTodoType() {
            return this.StatusTypeEnum.getTodoAsValue();
        },
        _getInProgressType() {
            return this.StatusTypeEnum.getInProgressAsValue();
        },
        _getDoneType() {
            return this.StatusTypeEnum.getDoneAsValue();
        },
        _toCreateTask(taskStatusType) {
            this._toShowTask({
                componentProps: {
                    taskStatusType,
                    teamMembers: this.teamMembers,
                    onCreate: this._createTask
                }
            });

            return this;
        },
        _toEditTask(task) {
            this._toShowTask({
                componentProps: {
                    task: task.copy(),
                    teamMembers: this.teamMembers,
                    onCreate: this._updateTask
                }
            });

            return this;
        },
        _toDeleteTask(task) {
            this.ModalDialogService.open({
                title: task.getTitle(),
                size: this.ModalDialogService.getSizes().getSm(),
                html: true,
                body: this._messages.deleteItem,
                confirm: {
                    title: this._titles.ok,
                    callback: () => {
                        this._deleteTask(task);
                    }
                },
                cancel: {
                    title: this._titles.cancel,
                    callback: () => this.ModalDialogService.close()
                }
            });

            return this;
        },
        _toShowTask(props) {
            this.ModalDialogService.open({
                className: this._classNames.modalTaskCreator,
                size: this.ModalDialogService.getSizes().getMd(),
                body: TaskCreator,
                ...props
            });

            return this;
        },
        _createTask(task) {
            this
                ._toggleLoader(true)
                .Presenter
                .createTask(task)
                .then(this._setTasks)
                .finally(() => this._toggleLoader(false).ModalDialogService.close());

            return this;
        },
        _updateItemAfterDropped(task, type) {
            this._updateTask(task.setStatus(this.TaskService.getStatusById(type)));

            return this;
        },
        _updateTask(task) {
            this
                ._toggleLoader(true)
                .Presenter
                .updateTask(task)
                .then(this._setTasks)
                .finally(() => this._toggleLoader(false).ModalDialogService.close());

            return this;
        },
        _deleteTask(task) {
            this
                ._toggleLoader(true)
                .Presenter
                .deleteTask(task)
                .then(this._setTasks)
                .finally(() => this._toggleLoader(false).ModalDialogService.close());

            return this;
        }
    }
};