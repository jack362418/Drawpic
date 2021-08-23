import { computed } from 'vue'
import { useStore } from '@/store'
import { ShapeObj } from '@/store/modules/type'
export default () => {
    const store = useStore()
    const changeShapEleSize = (e:MouseEvent,it: ShapeObj) => {
        if(!it.isSelect) {
            document.onmousemove = null
            document.onmouseup = null
            it.isSelect = true
            store.commit("CANCEL_SELECT_SHAPE",it)
        }
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

    const operateUpdateShapeEle = (e:MouseEvent,item:any,selectShapeRef: ShapeObj) => {
        console.log(selectShapeRef)
    }

    return {
        changeShapEleSize,
        operateUpdateShapeEle
    }
}