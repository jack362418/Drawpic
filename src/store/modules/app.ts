import { State,ShapeObj } from './type'
import { Module } from 'vuex'
const app:Module<State, any> = {
    state:{
        layout:{
            graphicWidth: 220,
            middleWidth: 0,
            toolsWidth: 260
        },
        singleGraph:{
            path:""
        },
        isCreatElement: false,
        elementShapeArr:[],
        multipleShapeArr:[],
        isMultiple: false
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
        },
        UPDATE_ELEMENT_SHAPE: (state,updataItem:ShapeObj) => {
            state.elementShapeArr = state.elementShapeArr.map(item => {
                let obj = item
                if(item.id == updataItem.id) {
                    obj = {...updataItem}
                }
                return obj
            })
        },
        CANCEL_SELECT_SHAPE: (state,selectObj:(ShapeObj | State['elementShapeArr'])) => {
            if(!Array.isArray(selectObj)) {
                state.elementShapeArr.forEach(item => {
                    if(item.id == selectObj.id) {
                        item.isSelect = selectObj.isSelect
                    }else {
                        item.isSelect = false
                    }
                })
            }
        },
        CANCEL_ALL_SELECT_SHAPE: (state) => {
            state.elementShapeArr = state.elementShapeArr.map(item => {
                return {...item,isSelect:false}
            })
        },
        MULTIPLE_SELECT_SHAPE: (state,multipleSelectShape:State['multipleShapeArr']) => {
            state.multipleShapeArr = []
            state.multipleShapeArr = multipleSelectShape?.map(item => {
                return {...item}
            })
        },
        CANCEL_MULTIPLE_SHAPE: (state) => {
            state.multipleShapeArr = []
        },
        SET_MULTIPLE_TYPE: (state,flag) => {
            state.isMultiple = flag
        }
    },
    actions: {
        setSize({commit},layout: State['layout']) {
            commit('SET_SIZE',layout)
        }
    }
}


export default app
