export default class ModalDialogService {
    constructor(props) {
        /**
         * @property _events
         * @type {{close: string, open: string}}
         * @private
         */
        this._events = {
            open: "open",
            close: "close"
        };

        /**
         * @property _sizes
         * @type {{md: string, sm: string, lg: string}}
         * @private
         */
        this._sizes = {
            sm: "sm",
            md: "md",
            lg: "lg"
        };

        /**
         * @property _observer
         * @type {Observer}
         * @private
         */
        this._observer = new props.dependencies.Observer().installTo(this);
    }

    /**
     * @public
     * @method getEvents
     * @return {{close: string, open: string}}
     */
    getEvents() {
        return {...this._events};
    }

    /**
     * @public
     * @method getSizes
     * @returns {{getMd(): string, getLg(): string, getSm(): string}}
     */
    getSizes() {
        let sizes = this._sizes;

        return {
            getSm() {
                return sizes.sm;
            },
            getMd() {
                return sizes.md;
            },
            getLg() {
                return sizes.lg;
            }
        };
    }

    /**
     * @example
     *
     * opts = {
     *     title: string,
     *     className: string,
     *     size: string,
     *     html: boolean,
     *     body: Vue.Component,
     *     componentProps: Object,
     *     confirm: {
     *         title: string,
     *         callback: Function
     *     },
     *     cancel: {
     *         title: string,
     *         callback: Function
     *     }
     * }
     *
     * @public
     * @method open
     * @param opts {Object}
     * @returns {ModalDialogService}
     */
    open(opts) {
        opts.size = opts.size || this.getSizes().getMd();

        this._observer.trigger(this.getEvents().open, opts);

        return this;
    }

    /**
     * @public
     * @method close
     * @returns {ModalDialogService}
     */
    close() {
        this._observer.trigger(this.getEvents().close);

        return this;
    }
}