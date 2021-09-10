import { computed,reactive } from 'vue'
import { useStore } from '@/store'
import { ShapeObj } from '@/store/modules/type'
import { OperateResizeStraight,viewPosition } from '@/types/shape'
export default (selectShapeRef:ShapeObj,viewportObjRef:viewPosition) => {
    const store = useStore()
    const updateStraightLine =  (e:MouseEvent,item:any) => {
        const originSelectShape = JSON.parse(JSON.stringify(selectShapeRef))
        let originX = originSelectShape.x + viewportObjRef.x
        let originY = originSelectShape.y + viewportObjRef.y 
        if(item.type == OperateResizeStraight.START) {
            if(selectShapeRef.lineShape.quadrant == 4 || selectShapeRef.lineShape.quadrant == 8) {
                originX = originSelectShape.x + viewportObjRef.x + originSelectShape.width
                originY = originSelectShape.y + viewportObjRef.y + originSelectShape.height
            }else if(selectShapeRef.lineShape.quadrant == 3 || selectShapeRef.lineShape.quadrant == 7) {
                originX = originSelectShape.x + viewportObjRef.x + originSelectShape.width
            }else if(selectShapeRef.lineShape.quadrant == 1 || selectShapeRef.lineShape.quadrant == 5) {
                originY = originSelectShape.y + viewportObjRef.y + originSelectShape.height
            }
        }else {
            if(selectShapeRef.lineShape.quadrant == 1 || selectShapeRef.lineShape.quadrant == 5) {
                originX = originSelectShape.x + viewportObjRef.x + originSelectShape.width
            }else if(selectShapeRef.lineShape.quadrant == 2 || selectShapeRef.lineShape.quadrant == 6) {
                originX = originSelectShape.x + viewportObjRef.x + originSelectShape.width
                originY = originSelectShape.y + viewportObjRef.y + originSelectShape.height
            }else if(selectShapeRef.lineShape.quadrant == 3 || selectShapeRef.lineShape.quadrant == 7) {
                originY = originSelectShape.y + viewportObjRef.y + originSelectShape.height
            }
        }
        document.onmousemove = (e:MouseEvent) => {
            const differenceW = Math.abs(e.clientX - originX)
            const differenceH = Math.abs(e.clientY - originY)
            selectShapeRef.width = differenceW
            selectShapeRef.height = differenceH 
            if(e.clientX > originX && e.clientY < originY) {
                selectShapeRef.y = e.clientY - viewportObjRef.y
                if(item.type == OperateResizeStraight.START) {
                    selectShapeRef.path = `M0,${selectShapeRef.height} L${selectShapeRef.width},0`
                    selectShapeRef.lineShape.quadrant = 1
                }else {
                    selectShapeRef.path = `M${selectShapeRef.width},0 L0,${selectShapeRef.height}`
                    selectShapeRef.lineShape.quadrant = 3
                }
            }
            if(e.clientX > originX && e.clientY > originY) {
                if(item.type == OperateResizeStraight.START) {
                    selectShapeRef.path = `M0,0 L${selectShapeRef.width},${selectShapeRef.height}`
                    selectShapeRef.lineShape.quadrant = 2
                }else {
                    selectShapeRef.path = `M${selectShapeRef.width},${selectShapeRef.height} L0,0`
                    selectShapeRef.lineShape.quadrant = 4
                }
            }
            if(e.clientX < originX && e.clientY > originY) {
                selectShapeRef.x = e.clientX - viewportObjRef.x
                if(item.type == OperateResizeStraight.START) {
                    selectShapeRef.path = `M${selectShapeRef.width},0 L0,${selectShapeRef.height}`
                    selectShapeRef.lineShape.quadrant = 3
                }else{
                    selectShapeRef.path = `M0,${selectShapeRef.height} L${selectShapeRef.width},0`
                    selectShapeRef.lineShape.quadrant = 1
                }
            }
            if(e.clientX < originX && e.clientY < originY) {
                selectShapeRef.x = e.clientX - viewportObjRef.x
                selectShapeRef.y = e.clientY - viewportObjRef.y
                if(item.type == OperateResizeStraight.START) {
                    selectShapeRef.path = `M${selectShapeRef.width},${selectShapeRef.height} L0,0`
                    selectShapeRef.lineShape.quadrant = 4
                }else {
                    selectShapeRef.path = `M0,0 L${selectShapeRef.width},${selectShapeRef.height}`
                    selectShapeRef.lineShape.quadrant = 2
                }
            }
            if(e.clientX == originX && e.clientY < originY) {
                selectShapeRef.path = `M0,${selectShapeRef.height} L0,0`
                selectShapeRef.lineShape.quadrant = 5
            }
            if(e.clientY == originY && e.clientX >= originX) {
                selectShapeRef.path = `M0,0 L${selectShapeRef.width},0`
                selectShapeRef.lineShape.quadrant = 6
            }
            if(e.clientX == originX && e.clientY > originY) {
                selectShapeRef.path = `M0,0 L0,${selectShapeRef.height}`
                selectShapeRef.lineShape.quadrant = 7
            }
            if(e.clientY == originY && e.clientX <= originX) {
                selectShapeRef.path = `M${selectShapeRef.width},0 L0,0`
                selectShapeRef.lineShape.quadrant = 8
            }
            if(e.clientX == originX) {
                selectShapeRef.x = originX - viewportObjRef.x
            }
            if(e.clientY == originY) {
                selectShapeRef.y = originY - viewportObjRef.y
            }
            store.commit("UPDATE_ELEMENT_SHAPE",selectShapeRef)
        }
        document.onmouseup = (e:MouseEvent) => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    const elementSpotRef = computed(() => {
        const lineStart = reactive({
            top:0,
            left:0
        })
        const lineEnd = reactive({
            top:0,
            left:0
        })
        if(selectShapeRef.lineShape.quadrant == 1) {
            lineStart.top = 0
            lineEnd.top = selectShapeRef.height
            lineStart.left = selectShapeRef.width
            lineEnd.left = 0
        }else if(selectShapeRef.lineShape.quadrant == 2) {
            lineStart.top = selectShapeRef.height
            lineEnd.top = 0
            lineStart.left = selectShapeRef.width
            lineEnd.left = 0
        }else if(selectShapeRef.lineShape.quadrant == 3) {
            lineStart.top = selectShapeRef.height
            lineEnd.top = 0
            lineStart.left = 0
            lineEnd.left = selectShapeRef.width
        }else if(selectShapeRef.lineShape.quadrant == 4) {
            lineStart.top = 0
            lineEnd.top = selectShapeRef.height
            lineStart.left = 0
            lineEnd.left = selectShapeRef.width
        }else if(selectShapeRef.lineShape.quadrant == 5) {
            lineStart.top = 0
            lineEnd.top = selectShapeRef.height
            lineStart.left = 0
            lineEnd.left = 0
        }else if(selectShapeRef.lineShape.quadrant == 6 || selectShapeRef.lineShape.quadrant == 8) {
            lineStart.top = 0
            lineEnd.top = 0
            lineStart.left = selectShapeRef.width
            lineEnd.left = 0
        }else if(selectShapeRef.lineShape.quadrant == 7) {
            lineStart.top = selectShapeRef.height
            lineEnd.top = 0
            lineStart.left = 0
            lineEnd.left = 0
        }

        return [
            {type: OperateResizeStraight.START,style:{top:lineStart.top,left:lineStart.left}},
            {type: OperateResizeStraight.END,style:{top: lineEnd.top,left: lineEnd.left}},
        ]
       
    }) 


    return {
        elementSpotRef,
        updateStraightLine
    }
}