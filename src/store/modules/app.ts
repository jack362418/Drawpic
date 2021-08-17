import { State } from './type'
import { Module } from 'vuex'
const app:Module<State, any> = {
    state:{
        layout:{
            graphicWidth: 260,
            middleWidth: 0,
            toolsWidth: 260
        },
        singleGraph:{
            path:""
        },
        isCreatElement: false
    },  
    getters:{
        layout:(state) => {
            state.layout.middleWidth = window.innerWidth - state.layout.graphicWidth - state.layout.toolsWidth
            return state.layout
        },
        getSingPath: (state) => {
            return state.singleGraph
        }
    },
    mutations: {
        SET_SIZE: (state,layout:State['layout']) => {
            state.layout = layout
        },
        SET_SIGN_PATH: (state,singleGraph:State['singleGraph']) => {
            state.singleGraph = singleGraph
            state.isCreatElement = true
        },
        CANCEL_CREATE_EL: (state,isCreatElement: State['isCreatElement']) => {
            state.isCreatElement = isCreatElement
        }
    },
    actions: {
        setSize({commit},layout: State['layout']) {
            commit('SET_SIZE',layout)
        }
    }
}


export default app
