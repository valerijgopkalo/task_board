import Task from "@core/entities/task/Task";

import TaskService from "@core/services/Task";

export default {
    props: {
        taskStatusType: {
            type: Number,
            default: 0
        },
        task: {
            type: Task,
            default: () => new Task()
        },
        teamMembers: {
            type: Array,
            default: () => []
        }
    },
    components: {},
    emits: ["create"],
    data() {
        return {
            /**
             * @private
             * @property _currentStatusId
             * @type {string|number}
             */
            _currentStatusId: this.taskStatusType || this.task.getStatusId(),
            /**
             * @private
             * @property _currentPriorityId
             * @type {string|number}
             */
            _currentPriorityId: this.task.getPriorityId(),
            /**
             * @private
             * @property _currentAssigneeId
             * @type {string|number}
             */
            _currentAssigneeId: this.task.getAssigneeId(),
            /**
             * @private
             * @property _currentExecutors
             * @type {Object}
             */
            _currentExecutors: Object.fromEntries(Object.entries(this.task.getExecutorsId())),
            /**
             * @private
             * @property _currentTitle
             * @type {string}
             */
            _currentTitle: this.task.getTitle(),
            /**
             * @private
             * @property _currentDescription
             * @type {string}
             */
            _currentDescription: this.task.getDescription(),
            /**
             * @private
             * @property _taskService
             * @type {TaskService}
             */
            _taskService: TaskService.getInstance()
        };
    },
    mounted() {
        this._changeStatus();
    },
    methods: {
        _hasExecutors(id) {
            return this.task.getExecutorsId().find((itemId) => itemId === id);
        },
        _getAllStatuses() {
            return this._taskService.getAllStatuses();
        },
        _getAllPriorities() {
            return this._taskService.getAllPriorities();
        },
        _getTeamMembers() {
            return this.teamMembers;
        },
        _getTeamMemberById(id) {
            return this.teamMembers.find((item) => item.getId() === id);
        },
        _getCurrentAssignee() {
            return this._getTeamMemberById(this._currentAssigneeId);
        },
        _changeStatus() {
            this.task.setStatus(this._taskService.getStatusById(this._currentStatusId));

            return this;
        },
        _changePriority() {
            this.task.setPriority(this._taskService.getPriorityById(this._currentPriorityId));

            return this;
        },
        _changeAssignee() {
            this.task.setAssignee(this._getCurrentAssignee());

            return this;
        },
        _changeExecutors() {
            this.task.setExecutors(
                Array.from(this._currentExecutors).map((item) => this._getTeamMemberById(item))
            );

            return this;
        },
        _changeTitle() {
            this.task.setTitle(this._currentTitle);

            return this;
        },
        _changeDescription() {
            this.task.setDescription(this._currentDescription);

            return this;
        },
        _create() {
            this.$emit("create", this.task);

            return this;
        }
    }
};
