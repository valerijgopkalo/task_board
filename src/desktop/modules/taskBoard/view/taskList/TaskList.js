import TaskEntity from "@core/entities/task/Task";

import Item from "./item";

export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        type: {
            type: Number,
            default: ""
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    components: {
        Item
    },
    emits: ["create", "editItem", "updateItemAfterDropped", "deleteItem"],
    data() {
        return {
            _activeDragZone: false
        };
    },
    methods: {
        _hasTasks() {
            return Boolean(this._getItems().length);
        },
        _isActiveDragZone() {
            return this._activeDragZone;
        },
        _toggleDragZone(state) {
            this._activeDragZone = Boolean(state);

            return this;
        },
        _getTitle() {
            return this.title;
        },
        _getTaskCount() {
            return this._getItems().length;
        },
        _getItems() {
            return this.items;
        },
        _toDrop(e) {
            try {
                this.$emit(
                    "updateItemAfterDropped",
                    new TaskEntity(JSON.parse(e.dataTransfer.getData("item"))),
                    this.type
                );

                this._toggleDragZone(false);
            } catch {
                this._toggleDragZone(false);
            }

            return this;
        },
        _toDragEnter(e) {
            this._toggleDragZone(true);

            return this;
        },
        _toDragLeave(e) {
            if (!this.$refs.rootList.contains(e.relatedTarget)) {
                this._toggleDragZone(false);
            }

            return this;
        },
        _toDragEnd(e) {
            this._toggleDragZone(false);

            return this;
        },
        _editItem(item) {
            this.$emit("editItem", item);

            return this;
        },
        _deleteItem(item) {
            this.$emit("deleteItem", item);

            return this;
        },
        _toCreateItem() {
            this.$emit("create", this.type);

            return this;
        }
    }
};
