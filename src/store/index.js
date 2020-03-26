import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        visibility: "all",
    },
    actions: {
        updateLoading(context, status) {
            context.commit("LOADING", status);
        },
        visibility(context, cat) {
            context.commit("VISIBILITY", cat);
        },
    },
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        VISIBILITY(state, cat) {
            state.visibility = cat;
        },
    },
    modules: {},
})