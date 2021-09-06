import { computed } from 'vue'
import { useStore } from '@/store'
import { ShapeObj,State } from '@/store/modules/type'
export default () => { 
    const store = useStore()
    const moveAreaShape = (e:MouseEvent,maxAreaShapRef:ShapeObj) => {
        const multipleShapeArr = computed<State['multipleShapeArr']>(() => store.state.app.multipleShapeArr)
        const cloneShapeArr:State['multipleShapeArr'] = JSON.parse(JSON.stringify(multipleShapeArr.value))
        const originMaxShape = JSON.parse(JSON.stringify(maxAreaShapRef))
        const disX = e.clientX - originMaxShape.x
        const disY = e.clientY - originMaxShape.y
        document.onmousemove = (e:MouseEvent) => {
            maxAreaShapRef.x = e.clientX - disX
            maxAreaShapRef.y = e.clientY - disY
            const x = maxAreaShapRef.x - originMaxShape.x
            const y = maxAreaShapRef.y - originMaxShape.y
            multipleShapeArr.value.forEach(item => {
                const originItem = JSON.parse(JSON.stringify(cloneShapeArr.filter(it => it.id == item.id)?.[0]))
                item.x = originItem.x + x
                item.y = originItem.y + y

                store.commit("UPDATE_ELEMENT_SHAPE",item)
            })
            
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    return {
        moveAreaShape
    }
}