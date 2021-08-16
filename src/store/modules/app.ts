import { State } from './type'
import { Module } from 'vuex'
const app:Module<State, any> = {
    state:{
        layout:{
            graphicWidth: 260,
            middleWidth: 0,
            toolsWidth: 260
        }
    },  
    getters:{
        layout:(state) => {
            state.layout.middleWidth = window.innerWidth - state.layout.graphicWidth - state.layout.toolsWidth
            return state.layout
        }
    },
    mutations: {
        SET_SIZE: (state,layout:State['layout']) => {
            state.layout = layout
        },
    },
    actions: {
        setSize({commit},layout: State['layout']) {
            commit('SET_SIZE',layout)
        }
    }
}


export default app
