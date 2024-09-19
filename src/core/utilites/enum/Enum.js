export default function Enum(opts) {
    let self = this,
        /**
         * @property prefixes
         * @type {{is: string, getter: string}}
         */
        prefixes = {
            is: "is",
            getter: "get"
        },
        /**
         * @property postfixes
         * @type {{asValue: string}}
         */
        postfixes = {
            asValue: "AsValue"
        },
        /**
         * @property enumListByKeys
         * @type {Object}
         */
        enumListByKeys = {},
        /**
         * @property enumListByValues
         * @type {Object}
         */
        enumListByValues = {};

    /**
     * @private
     * @method initEnumList
     * @returns {void}
     */
    function initEnumList() {
        opts.fields.forEach(function (field) {
            enumListByKeys[field.key] = field.value;
            enumListByValues[field.value] = field.key;
        });
    }

    /**
     * @private
     * @method toUpperCaseFirstChar
     * @param value {string}
     * @returns {string}
     */
    function toUpperCaseFirstChar(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     * @private
     * @method createMethodName
     * @param name {string}
     * @param prefix {string}
     * @param [postfix] {string}
     * @returns {string}
     */
    function createMethodName(name, prefix, postfix) {
        return prefix + toUpperCaseFirstChar(name) + (postfix || "");
    }

    /**
     * @private
     * @method createMethods
     * @returns {void}
     */
    function createMethods() {
        opts.fields.forEach(function (field) {
            let key = field.key;

            self[createMethodName(key, prefixes.is)] = function (value) {
                return field.value === value;
            };

            self[createMethodName(key, prefixes.getter, postfixes.asValue)] = function () {
                return field.value;
            };
        });
    }

    /**
     * @public
     * @method getKeyByValue
     * @param value {string|number}
     * @returns {*}
     */
    this.getKeyByValue = function (value) {
        return enumListByValues[value];
    };

    /**
     * @public
     * @method getValueByKey
     * @param key {string|number}
     * @returns {*}
     */
    this.getValueByKey = function (key) {
        return enumListByKeys[key];
    };

    /**
     * @public
     * @method getValues
     * @returns {Array}
     */
    this.getValues = function () {
        return opts.fields.map(function (field) {
            return field.value;
        });
    };

    /**
     * @public
     * @method hasValue
     * @param value {*}
     * @returns {boolean}
     */
    this.hasValue = function (value) {
        return this.getValues().includes(value);
    };

    /**
     * @method init
     * @return {void}
     */
    (function init() {
        initEnumList();
        createMethods();
    }());
}
