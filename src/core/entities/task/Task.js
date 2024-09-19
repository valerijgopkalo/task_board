import _ from "lodash";

import Entity from "@core/entities/Entity";
import User from "@core/entities/user/User";
import Status from "@core/entities/status/Status";
import Priority from "@core/entities/priority/Priority";

export default class Task extends Entity {
    /**
     * @public
     * @method getName
     * @return {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method setTitle
     * @param value {string}
     * @returns {Task}
     */
    setTitle(value) {
        if (_.isString(value)) {
            this.entity.title = value;
        }

        return this;
    }

    /**
     * @public
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method setDescription
     * @param value {string}
     * @returns {Task}
     */
    setDescription(value) {
        if (_.isString(value)) {
            this.entity.description = value;
        }

        return this;
    }

    /**
     * @public
     * @method getStatusId
     * @returns {string|number}
     */
    getStatusId() {
        return new Status(this.entity.status).getId();
    }

    /**
     * @public
     * @method setStatus
     * @param value {Status}
     * @returns {Task}
     */
    setStatus(value) {
        if (value instanceof Status) {
            this.entity.status = value.getEntity();
        }

        return this;
    }

    /**
     * @public
     * @method getPriorityId
     * @returns {string|number}
     */
    getPriorityId() {
        return new Priority(this.entity.priority).getId();
    }

    /**
     * @public
     * @method setPriority
     * @param value {Priority}
     * @returns {Task}
     */
    setPriority(value) {
        if (value instanceof Priority) {
            this.entity.priority = value.getEntity();
        }

        return this;
    }

    /**
     * @public
     * @method getAssigneeId {string|number}
     * @returns {User}
     */
    getAssigneeId() {
        return new User(this.entity.assignee).getId();
    }

    /**
     * @public
     * @method setAssignee
     * @param value {User}
     * @returns {Task}
     */
    setAssignee(value) {
        if (value instanceof User) {
            this.entity.assignee = value.getEntity();
        }

        return this;
    }

    /**
     * @public
     * @method getExecutorsId
     * @returns {(string|number)[]}
     */
    getExecutorsId() {
        return (this.entity.executors || []).map((item) => new User(item).getId());
    }

    /**
     * @public
     * @method setExecutors
     * @param items {User[]}
     * @returns {Task}
     */
    setExecutors(items) {
        if (Array.isArray(items)) {
            this.entity.executors = items.map((item) => item.getEntity());
        }

        return this;
    }
}
