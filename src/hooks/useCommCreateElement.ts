import { ref,onMounted,reactive,nextTick } from 'vue'
import { useStore } from '@/store'
import { uuid } from "@/until/index"
import useSelectDrawArea from "@/views/middleCanvas/hooks/useSelectDrawArea" 

export interface ElementPosition { 
    width: number,
    height: number,
    x: number,
    y:number
}

export default (isCreateNode:boolean,cancelSelectElement?:() => void) => {
    const store = useStore()
    const linePathRef = ref("M0,0 L0,0")
    const elementPositionRef = ref<ElementPosition>({
        width:0,
        height:0,
        x:0,
        y:0
    })
    const svgStyleRef = ref({
      width:24,
      height:24,
    })
    const isStartRef = ref<boolean>(false)
    const el = reactive({
        x:0,
        y:0
    })
    const creatElementRef = ref<HTMLElement>()
    onMounted(() => {
        nextTick(() => {
            if (!creatElementRef.value) return
            const {x,y} = creatElementRef.value.getBoundingClientRect()
            el.x = Math.floor(x)
            el.y = Math.floor(y) 
        })
    })  

    const createElement = (e:MouseEvent) => {
        isStartRef.value = true
        const clientX = e.clientX
        const clientY = e.clientY
        elementPositionRef.value.x = clientX - el.x
        elementPositionRef.value.y = clientY - el.y
        if(cancelSelectElement) {
          cancelSelectElement()
        }
        store.commit("CANCEL_ALL_SELECT_SHAPE")
        
        /**
         * 上下左右均可移动
         * 
        */
        document.onmousemove = (e:MouseEvent) => {
            elementPositionRef.value.width = Math.abs(e.clientX - clientX) 
            elementPositionRef.value.height = Math.abs(e.clientY - clientY) 
            svgStyleRef.value.width = elementPositionRef.value.width >= 24 ? elementPositionRef.value.width: 24
            svgStyleRef.value.height = elementPositionRef.value.height >= 24 ? elementPositionRef.value.height: 24
            if(e.clientX > clientX && e.clientY < clientY) {
              elementPositionRef.value.y = e.clientY - el.y
              linePathRef.value = `M0,${elementPositionRef.value.height} L${elementPositionRef.value.width},0`
            }
            if(e.clientX < clientX && e.clientY > clientY) {
              elementPositionRef.value.x = e.clientX - el.x
              linePathRef.value = `M${elementPositionRef.value.width},0 L0,${elementPositionRef.value.height}`
            }
            if(e.clientX < clientX && e.clientY < clientY) {
              elementPositionRef.value.x = e.clientX - el.x
              elementPositionRef.value.y = e.clientY - el.y
              linePathRef.value = `M${elementPositionRef.value.width},${elementPositionRef.value.height} L0,0`
            }
            if(e.clientX > clientX && e.clientY > clientY) {
              elementPositionRef.value.x = clientX - el.x
              elementPositionRef.value.y = clientY - el.y
              linePathRef.value = `M0,0 L${elementPositionRef.value.width},${elementPositionRef.value.height}`
            }
            if(e.clientX == clientX && e.clientY < clientY) {
              linePathRef.value = `M0,${elementPositionRef.value.height} L0,0`
            }
            if(e.clientX == clientX && e.clientY > clientY) {
              linePathRef.value = `M0,0 L0,${elementPositionRef.value.height}`
            }
            if(e.clientY == clientY && e.clientX <= clientX) {
              linePathRef.value = `M${elementPositionRef.value.width},0 L0,0`
            }
            if(e.clientY == clientY && e.clientX >= clientX) {
              linePathRef.value = `M0,0 L${elementPositionRef.value.width},0`
            }
            if(e.clientX == clientX) {
               elementPositionRef.value.x = clientX - el.x
            }
            if(e.clientY == clientY) {
              elementPositionRef.value.y = clientY - el.y
            }
        }
        document.onmouseup = (e:MouseEvent) => {
            document.onmousemove = null
            document.onmouseup = null
            const elementObj = {
              ...elementPositionRef.value,
              ...store.state.app.singleGraph,
              isSelect:true,
              id: uuid(),
              rotate:0,
              textShape:{
                text: "",
                fontSize: 12,
                color: "#000"
              }
            }
            if(isCreateNode) {
              store.commit("CANCEL_CREATE_EL",false)
              store.commit("SET_ELEMENT_SHAPE_ARR",elementObj)
              store.commit("SET_MULTIPLE_TYPE",false)
              store.commit("CANCEL_MULTIPLE_SHAPE")
            }else {
               const { selectShapAreaLight } = useSelectDrawArea()
               const elementSelectPosition = JSON.parse(JSON.stringify(elementPositionRef.value))
               elementPositionRef.value = {
                  width:0,
                  height:0,
                  x:0,
                  y:0
               }
               const shapeElementList = store.state.app.elementShapeArr
               const multipleSelectShape = selectShapAreaLight(elementSelectPosition,shapeElementList)
               store.commit("MULTIPLE_SELECT_SHAPE",multipleSelectShape)
            }
        }
    }
    
    return {
        createElement,
        creatElementRef,
        elementPositionRef,
        isStartRef,
        linePathRef,
        svgStyleRef
    }
}