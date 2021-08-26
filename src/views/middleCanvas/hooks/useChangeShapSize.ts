import { useStore } from '@/store'
import { ShapeObj } from '@/store/modules/type'
export default () => {
    const store = useStore()
    /**
     * 移动改变位置
     */
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

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            store.commit("UPDATE_ELEMENT_SHAPE",it)

        }
    }
    /**
     * 改变形状
     */
    const operateUpdateShapeEle = (e:MouseEvent,item:any,selectShapeRef: ShapeObj) => {
        const clientX = e.clientX
        const clientY = e.clientY
        const orginShap = JSON.parse(JSON.stringify(selectShapeRef))
        document.onmousemove = (e:MouseEvent) => {
            const differenceX = Math.abs(e.clientX - clientX)
            const differenceY = Math.abs(e.clientY - clientY)
            if(item.type == 'right') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width - differenceX : orginShap.width + differenceX
            }
            if(item.type == 'left') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width + differenceX : orginShap.width - differenceX
                selectShapeRef.x = e.clientX <= clientX ? orginShap.x - differenceX : orginShap.x + differenceX
            }
            if(item.type == 'top') {
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height + differenceY : orginShap.height - differenceY
                selectShapeRef.y = e.clientY <= clientY ? orginShap.y - differenceY : orginShap.y + differenceY
            }
            if(item.type == 'bottom') {
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height - differenceY : orginShap.height + differenceY
            }
            if(item.type == 'right-bottom') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width - differenceX : orginShap.width + differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height - differenceY : orginShap.height + differenceY
            }
            if(item.type == 'left-top') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width + differenceX : orginShap.width - differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height + differenceY : orginShap.height - differenceY
                selectShapeRef.x = e.clientX <= clientX ? orginShap.x - differenceX : orginShap.x + differenceX
                selectShapeRef.y = e.clientY <= clientY ? orginShap.y - differenceY : orginShap.y + differenceY
            }
            if(item.type == 'right-top') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width - differenceX : orginShap.width + differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height + differenceY : orginShap.height - differenceY
                selectShapeRef.y = e.clientY <= clientY ? orginShap.y - differenceY : orginShap.y + differenceY
            }
            if(item.type == 'left-bottom') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width + differenceX : orginShap.width - differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height - differenceY : orginShap.height + differenceY
                selectShapeRef.x = e.clientX <= clientX ? orginShap.x - differenceX : orginShap.x + differenceX
            }
            if(selectShapeRef.height <= 20) {
                selectShapeRef.height = 20
                return
            }
            if(selectShapeRef.width <= 20) {
                selectShapeRef.width = 20
                return
            }
            store.commit("UPDATE_ELEMENT_SHAPE",selectShapeRef)
        }

        

        document.onmouseup = (e:MouseEvent) => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    

    return {
        changeShapEleSize,
        operateUpdateShapeEle
    }
}