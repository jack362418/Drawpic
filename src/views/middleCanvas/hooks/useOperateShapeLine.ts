import { computed } from 'vue'
import { ShapeObj } from '@/store/modules/type'
import { OperateResizeHandlers,OperateResizeBorder } from '@/types/shape'
export default (selectShapeRef:ShapeObj) => {
    const elementBorderRef = computed(() => {
        return [
            {type: OperateResizeBorder.TOP,style:{top:-2,width:selectShapeRef.width}},
            {type: OperateResizeBorder.BOTTOM,style:{top:selectShapeRef.height,width:selectShapeRef.width}},
            {type: OperateResizeBorder.RIGHT,style:{top:0,left: selectShapeRef.width,height: selectShapeRef.height}},
            {type: OperateResizeBorder.LEFT,style:{top:0,left:-2,height: selectShapeRef.height}}
        ]
    })
    const elementSpotRef = computed(() => {
        return [
            {type: OperateResizeHandlers.LEFT_TOP,style:{top:0,left:-2}},
            {type: OperateResizeHandlers.TOP,style:{left: selectShapeRef.width / 2}},
            {type: OperateResizeHandlers.RIGHT_TOP,style:{left: selectShapeRef.width + 2}},
            {type: OperateResizeHandlers.LEFT,style:{top: selectShapeRef.height / 2,left: -2}},
            {type: OperateResizeHandlers.RIGHT,style:{left: selectShapeRef.width + 2,top: selectShapeRef.height / 2}},
            {type: OperateResizeHandlers.LEFT_BOTTOM,style:{top: selectShapeRef.height,left: -2}},
            {type: OperateResizeHandlers.RIGHT_BOTTOM,style:{top: selectShapeRef.height,left: selectShapeRef.width + 2}},
            {type: OperateResizeHandlers.BOTTOM,style:{top: selectShapeRef.height+2,left: selectShapeRef.width / 2}}
        ]
    }) 
   
    return {
        elementBorderRef,
        elementSpotRef
    }
}