import { h } from 'vue'

export default {
    props: {
        component: {
            type: Object,
            required: true
        },
        props: {
            type: Object,
            default: () => ({})
        }
    },
    render () {
        return h(this.component, {...this.props});
    }
};