import { computed } from 'vue'
import { useStore } from '@/store'
import { ShapeObj } from '@/store/modules/type'
export default () => {
    const store = useStore()
    const changeShapEleSize = (e:MouseEvent,it: ShapeObj) => {
       
        const shapeItem = JSON.parse(JSON.stringify(it))
        const disX = e.clientX - shapeItem.x
        const disY = e.clientY - shapeItem.y
        document.onmousemove = (e:MouseEvent) => {
            it.x = e.clientX - disX
            it.y = e.clientY - disY
        }

        document.onmouseup = (e:MouseEvent) => {
            document.onmousemove = null
            document.onmouseup = null
            store.commit("UPDATE_ELEMENT_SHAPE",it)

        }
    }

    return {
        changeShapEleSize
    }
}