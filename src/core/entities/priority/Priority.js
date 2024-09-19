import _ from "lodash";

import Entity from "@core/entities/Entity";

export default class Priority extends Entity {
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
     * @return {Priority}
     */
    setName(value) {
        if (_.isString(value)) {
            this.entity.name = value;
        }

        return this;
    }
}