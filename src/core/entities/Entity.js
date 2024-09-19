import _ from "lodash";

export default class Entity {
    constructor(entity) {
        this.entity = _.cloneDeep(entity || {});

        this.TargetConstructor = new.target;
    }

    /**
     * @public
     * @method getId
     * @returns {string|number}
     */
    getId() {
        return this.entity.id ?? "";
    }

    /**
     * @public
     * @method setId
     * @param value {string|number}
     * @returns {Entity}
     */
    setId(value) {
        if (_.isString(value) || _.isNumber(value)) {
            this.entity.id = value;
        }

        return this;
    }

    /**
     * @public
     * @method copy
     * @returns {Object}
     */
    copy() {
        return new this.TargetConstructor(this.entity);
    }

    /**
     * @public
     * @method getEntity
     * @param [toJson] {boolean}
     * @returns {string|Object}
     */
    getEntity(toJson) {
        return toJson ? JSON.stringify(this.entity) : _.cloneDeep(this.entity);
    }
}
