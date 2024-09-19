import TaskService from "@core/services/Task";

export default {
    data() {
        return {
            taskService: TaskService.getInstance()
        };
    },
    methods: {
        _toCreateItem() {
            this.taskService.toCreateTask();

            return this;
        }
    }
};