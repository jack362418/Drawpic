import { ElementPosition } from '@/hooks/useCommCreateElement'
import { State } from '@/store/modules/type'
export default () => {
    const selectShapAreaLight = (elementSelectPosition:ElementPosition,shapeElementList:State['elementShapeArr']) => {
        const maxX = elementSelectPosition.x + elementSelectPosition.width
        const maxY = elementSelectPosition.y + elementSelectPosition.height
        const x = elementSelectPosition.x
        const y = elementSelectPosition.y
        const newSelectShape:State['elementShapeArr'] = []
        shapeElementList.forEach(item => {
            if(maxX > (item.x+item.width) && maxY > (item.y+item.height) && x < item.x && y < item.y) {
                newSelectShape.push(item)
            }
           
        })
        return newSelectShape
    }   

    return {
        selectShapAreaLight
    }
}