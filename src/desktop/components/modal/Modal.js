import _ from "lodash";

import ModalDialog from "@core/services/modalDialog";

import BodyComponent from "./bodyComponent";

export default {
    components: {
        BodyComponent
    },
    data() {
        return {
            _isOpenModalDialog: false,
            _config: {
                title: "",
                className: "",
                size: "",
                html: false,
                body: null,
                componentProps: {},
                confirm: {
                    title: "",
                    callback: () => {}
                },
                cancel: {
                    title: "",
                    callback: () => {}
                }
            },
            /**
             * @property _modalDialogService
             * @type {ModalDialogService}
             */
            _modalDialogService: ModalDialog.getInstance()
        };
    },
    mounted() {
        this
            ._modalDialogService
            .on(this._modalDialogService.getEvents().open, this._openDialog)
            .on(this._modalDialogService.getEvents().close, this._closeDialog);
    },
    methods: {
        _hasCallback(callback) {
            return Boolean(callback && callback.title && _.isFunction(callback.callback));
        },
        _hasConfirmAction() {
            return this._hasCallback(this._config.confirm);
        },
        _hasCancelAction() {
            return this._hasCallback(this._config.cancel);
        },
        _hasFooter() {
            return this._hasCancelAction() || this._hasConfirmAction();
        },
        _isHTML() {
            return this._config.html;
        },
        _isOpen() {
            return this._isOpenModalDialog;
        },
        _getClassNames() {
            return {
                [this._config.className]: Boolean(this._config.className),
                [`modal-${this._config.size}`]: Boolean(this._config.size)
            };
        },
        _getTitle() {
            return this._config.title;
        },
        _getBody() {
            return this._config.body;
        },
        _getComponentProps() {
            return this._config.componentProps;
        },
        _getTitleOfConfirmAction() {
            return this._config.confirm.title;
        },
        _getTitleOfCancelAction() {
            return this._config.cancel.title;
        },
        _openDialog(opts) {
            this._config = opts;
            this._isOpenModalDialog = true;

            return this;
        },
        _closeDialog() {
            this._isOpenModalDialog = false;

            this._config = {};

            return this;
        },
        _closeDialogByEvent() {
            this._modalDialogService.close();

            return this;
        },
        _closeDialogByOverlay() {
            this._closeDialogByEvent();

            return this;
        },
        _toConfirm() {
            if (this._hasConfirmAction()) {
                this._config.confirm.callback();
            }

            this._closeDialogByEvent();

            return this;
        },
        _toCancel() {
            if (this._hasCancelAction()) {
                this._config.cancel.callback();
            }

            this._closeDialogByEvent();

            return this;
        }
    }
};
