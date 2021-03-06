import { useStore } from '@/store'
import { ShapeObj } from '@/store/modules/type'
import { viewPosition } from "@/types/shape"

export default (setShapeHtml?:() => void) => {
    const store = useStore()
    
    /**
     * 移动改变位置
     */
    const changeShapEleSize = (e:MouseEvent,it: ShapeObj) => {
        if(setShapeHtml) {
            setShapeHtml()
        }
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
            /** 是否处于编辑文字中 */
            if(it.isDbclick) return 
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
        const maxX = orginShap.x + (orginShap.width - 20)
        const maxY = orginShap.y + (orginShap.height - 20)
        const minX = orginShap.x 
        const minY = orginShap.y
        document.onmousemove = (e:MouseEvent) => {
            const differenceX = Math.abs(e.clientX - clientX)
            const differenceY = Math.abs(e.clientY - clientY)
            if(item.type == 'right') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width - differenceX : orginShap.width + differenceX
            }
            if(item.type == 'left') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width + differenceX : orginShap.width - differenceX
                selectShapeRef.x = e.clientX <= clientX ? orginShap.x - differenceX : orginShap.x + differenceX
                if(selectShapeRef.width <= 20) {
                    selectShapeRef.x = maxX
                }
            }
            if(item.type == 'top') {
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height + differenceY : orginShap.height - differenceY
                selectShapeRef.y = e.clientY <= clientY ? orginShap.y - differenceY : orginShap.y + differenceY
                if(selectShapeRef.height <= 20) {
                    selectShapeRef.y = maxY
                }
            }
            if(item.type == 'bottom') {
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height - differenceY : orginShap.height + differenceY
                if(selectShapeRef.height <= 20) {
                    selectShapeRef.y = minY
                }
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
                if(selectShapeRef.height <= 20) {
                    selectShapeRef.y = maxY
                }
                if(selectShapeRef.width <= 20) {
                    selectShapeRef.x = maxX
                }
            }
            if(item.type == 'right-top') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width - differenceX : orginShap.width + differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height + differenceY : orginShap.height - differenceY
                selectShapeRef.y = e.clientY <= clientY ? orginShap.y - differenceY : orginShap.y + differenceY
                if(selectShapeRef.height <= 20) {
                    selectShapeRef.y = maxY
                }
                if(selectShapeRef.width <= 20) {
                    selectShapeRef.x = minX
                }
            }
            if(item.type == 'left-bottom') {
                selectShapeRef.width = e.clientX <= clientX ? orginShap.width + differenceX : orginShap.width - differenceX
                selectShapeRef.height = e.clientY <= clientY ? orginShap.height - differenceY : orginShap.height + differenceY
                selectShapeRef.x = e.clientX <= clientX ? orginShap.x - differenceX : orginShap.x + differenceX
                if(selectShapeRef.height <= 20) {
                    selectShapeRef.y = minY
                }
                if(selectShapeRef.width <= 20) {
                    selectShapeRef.x = maxX
                }
            }
            if(selectShapeRef.height <= 20) {
                selectShapeRef.height = 20

            }
            if(selectShapeRef.width <= 20) {
                selectShapeRef.width = 20
            }
            store.commit("UPDATE_ELEMENT_SHAPE",selectShapeRef)
        }
        document.onmouseup = (e:MouseEvent) => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    /**
     * 改变旋转度数
     */
    const operateUpdateShapeRotate = (e:MouseEvent,selectShapeRef: ShapeObj,viewportObjRef:viewPosition) => {
        const centerX = selectShapeRef.x + selectShapeRef.width / 2 
        const centerY = selectShapeRef.y + selectShapeRef.height / 2 
        document.onmousemove = (e:MouseEvent) => {
            const mouseX = e.pageX - viewportObjRef.x
            const mouseY = e.pageY - viewportObjRef.y
            const x = mouseX - centerX
            const y = centerY - mouseY
            let angle = 180 / Math.PI * (Math.atan2(x,y))
            const sorptionRange = 5
            if ( Math.abs(angle) <= sorptionRange ) angle = 0
            else if ( angle > 0 && Math.abs(angle - 45) <= sorptionRange ) angle -= (angle - 45)
            else if ( angle < 0 && Math.abs(angle + 45) <= sorptionRange ) angle -= (angle + 45)
            else if ( angle > 0 && Math.abs(angle - 90) <= sorptionRange ) angle -= (angle - 90)
            else if ( angle < 0 && Math.abs(angle + 90) <= sorptionRange ) angle -= (angle + 90)
            else if ( angle > 0 && Math.abs(angle - 135) <= sorptionRange ) angle -= (angle - 135)
            else if ( angle < 0 && Math.abs(angle + 135) <= sorptionRange ) angle -= (angle + 135)
            else if ( angle > 0 && Math.abs(angle - 180) <= sorptionRange ) angle -= (angle - 180)
            else if ( angle < 0 && Math.abs(angle + 180) <= sorptionRange ) angle -= (angle + 180)
            selectShapeRef.rotate = angle
            store.commit("UPDATE_ELEMENT_SHAPE",selectShapeRef)
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    return {
        changeShapEleSize,
        operateUpdateShapeEle,
        operateUpdateShapeRotate
    }
}