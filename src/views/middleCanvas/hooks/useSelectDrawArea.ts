import { useStore } from '@/store'
import {ElementPosition} from '@/hooks/useCommCreateElement'
export default () => {
    const store = useStore()
    const selectShapAreaLight = (elementSelectPosition:ElementPosition) => {
        console.log("执行数据",elementSelectPosition)
        
    }

    return {
        selectShapAreaLight
    }
}