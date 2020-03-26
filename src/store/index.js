import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        visibility: "all",
    },
    actions: {
        visibility(context, cat) {
            context.commit("VISIBILITY", cat);
        },
    },
    mutations: {
        VISIBILITY(state, cat) {
            state.visibility = cat;
        },
    },
    modules: {},
})