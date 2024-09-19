import Entity from "@core/entities/Entity";

export default class User extends Entity {
    /**
     * @public
     * @method getName
     * @return {string}
     */
    getName() {
        return this.entity.name || "";
    }
}