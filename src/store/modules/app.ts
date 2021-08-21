import { State,ShapeObj } from './type'
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
        isCreatElement: false,
        elementShapeArr:[]
    },  
    getters:{
        layout:(state) => {
            state.layout.middleWidth = window.innerWidth - state.layout.graphicWidth - state.layout.toolsWidth
            return state.layout
        },
        getSingPath: (state) => {
            return state.singleGraph
        },
        getElementShape: (state) => {
            return state.elementShapeArr
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
        },
        SET_ELEMENT_SHAPE_ARR:  (state,elementShape:ShapeObj) => {
            state.elementShapeArr.forEach(item => {
                item.isSelect = false
            })
            const addShape:State['elementShapeArr'] = state.elementShapeArr 
            addShape.push(elementShape)
            state.elementShapeArr = addShape
        }
    },
    actions: {
        setSize({commit},layout: State['layout']) {
            commit('SET_SIZE',layout)
        }
    }
}


export default app
