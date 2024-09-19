import _ from "lodash";

import Entity from "@core/entities/Entity";

export default class Status extends Entity {
    /**
     * @public
     * @method getName
     * @return {string}
     */
    getName() {
        return this.entity.name || "";
    }
    /**
     * @public
     * @method setName
     * @return {Status}
     */
    setName(value) {
        if (_.isString(value)) {
            this.entity.name = value;
        }

        return this;
    }
}