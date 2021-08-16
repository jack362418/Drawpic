import { ref, onMounted } from 'vue'
import { useStore } from '@/store'

export default () => {
    const store = useStore()
    const viewportWidthRef = ref<number>(0)
    const viewportHeightRef = ref<number>(0)
    const getContentSize = () => {
        const contentWidth = store.state.app.layout.middleWidth
        viewportWidthRef.value = contentWidth * 0.8
        viewportHeightRef.value = window.innerHeight * 0.8
    }

    onMounted(() => {
        getContentSize()
    })

    return {
        viewportWidthRef,
        viewportHeightRef
    }
 }