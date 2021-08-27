import { ref,onMounted,reactive } from 'vue'
import { useStore } from '@/store'
import { uuid } from "@/until/index"

export default () => {
    const store = useStore()
    const elementPositionRef = ref({
        width:0,
        height:0,
        x:0,
        y:0
    })
    const isStartRef = ref<boolean>(false)
    const el = reactive({
        x:0,
        y:0
    })
    const creatElementRef = ref<HTMLElement>()
    onMounted(() => {
        if (!creatElementRef.value) return
        const {x,y} = creatElementRef.value.getBoundingClientRect()
        el.x = Math.floor(x)
        el.y = Math.floor(y) 
    })  

    const createElement = (e:MouseEvent) => {
        isStartRef.value = true
        const clientX = e.clientX
        const clientY = e.clientY
        elementPositionRef.value.x = clientX - el.x
        elementPositionRef.value.y = clientY - el.y
        /**
         * 上下左右均可移动
         * 
        */
        document.onmousemove = (e:MouseEvent) => {
            elementPositionRef.value.width = Math.abs(e.clientX - clientX) 
            elementPositionRef.value.height = Math.abs(e.clientY - clientY) 
            if(e.clientX > clientX && e.clientY < clientY) {
              elementPositionRef.value.y = e.clientY - el.y
            }
            if(e.clientX < clientX && e.clientY > clientY) {
              elementPositionRef.value.x = e.clientX - el.x
            }
            if(e.clientX < clientX && e.clientY < clientY) {
              elementPositionRef.value.x = e.clientX - el.x
              elementPositionRef.value.y = e.clientY - el.y
            }
            if(e.clientX > clientX && e.clientY > clientY) {
              elementPositionRef.value.x = clientX - el.x
              elementPositionRef.value.y = clientY - el.y
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
            store.commit("CANCEL_CREATE_EL",false)
            const elementObj = {
              ...elementPositionRef.value,
              ...store.state.app.singleGraph,
              isSelect:true,
              id: uuid()
            }
            store.commit("SET_ELEMENT_SHAPE_ARR",elementObj)
        }
    }
    
    return {
        createElement,
        creatElementRef,
        elementPositionRef,
        isStartRef
    }
}