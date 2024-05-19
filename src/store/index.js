import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        HomeWork: [],
        NotHomwWork:[],
    },
    mutations: {
        add(state, value) {
            state.HomeWork = value
        },
        addNotHomework(state,value){
            state.NotHomwWork=value
        }
    },
    actions: {
        add(context, value) {
            context.commit('add', value)
            console.log(context, value)
        },
        addNotHomework(context,value){
            context.commit('addNotHomework',value)
        }
    },
    modules: {}
})
