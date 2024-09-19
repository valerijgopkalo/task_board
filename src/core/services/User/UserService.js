export default class UserService {
    constructor(props) {
        /**
         * @property _events
         * @type {{}}
         * @private
         */
        this._events = {};

        /**
         * @private
         * @property _observer
         * @type {Observer}
         */
        this._observer = new props.dependencies.Observer().installTo(this);

        /**
         * @private
         * @property _Repository
         * @type {Repository}
         */
        this._Repository = props.dependencies.Repository;

        /**
         * @private
         * @property UserEntity
         * @type {User}
         */
        this._UserEntity = props.dependencies.UserEntity;
    }

    /**
     * @public
     * @method getEvents
     * @return {{}}
     */
    getEvents() {
        return {...this._events};
    }

    /**
     * @public
     * @method getTeamMembers
     * @returns {Promise<User[]>}
     */
    getTeamMembers() {
        return this
            ._Repository
            .getTeamMembers()
            .then(
                (items) => items.map((item) => new this._UserEntity(item)),
                () => []
            )
    }
}

