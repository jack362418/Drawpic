import { useStore } from '@/store'
import {ElementPosition} from '@/hooks/useCommCreateElement'
export default () => {
    const store = useStore()
    const selectShapAreaLight = (elementPosition:ElementPosition) => {
        console.log("执行数据",elementPosition)
    }

    return {
        selectShapAreaLight
    }
}