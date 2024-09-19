export default {
    props: {
        /**
         * @public
         * @property item
         * @type {Task}
         */
        item: {
            type: Object,
            default: null
        }
    },
    emits: ["edit", "delete"],
    data() {
        return {};
    },
    methods: {
        _dragStart(e) {
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.effectAllowed = "move";

            e.dataTransfer.setData("item", this.item.getEntity(true))

            return this;
        },
        _edit() {
            this.$emit("edit", this.item);

            return this;
        },
        _delete() {
            this.$emit("delete", this.item);

            return this;
        }
    }
};
