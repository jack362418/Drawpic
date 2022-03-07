<template>
  <div>
   <a-popover v-model:visible="lineColorPicker"  trigger="click" :destroyTooltipOnHide='true'>
        <template #content>
            <ColorPicker @changePickerColorBen="changePickerColorLine" :color="lineColor" />
        </template>
        <a-tooltip placement="bottom" title="线条颜色">
            <edit theme="filled" size="14" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,watch,computed } from 'vue'
import { useStore } from '@/store'
import { Edit } from '@icon-park/vue-next';
import ColorPicker from '@/components/colorPicker/index.vue'
export default defineComponent({
  name: 'delete',
  components:{
      Edit,
      ColorPicker
  },
  setup() {
    const store = useStore()
    const lineColorPicker = ref<boolean>(false); 
    const lineColor = ref("") 
    const closeAllPop = computed(() => { return store.state.app.closeAllPop })
    const currentSelectShap = computed(() => {
        return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
    }) 
    const changePickerColorLine = (color:string) => { 
        if(currentSelectShap.value) {
            store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, lineColor: color})
        }
    } 

    watch(() => lineColorPicker.value,() => {
        if(!lineColorPicker.value) return 
        currentSelectShap.value ? lineColor.value = currentSelectShap.value.lineColor : lineColor.value = '409EFF' 
    }) 


    watch(() => closeAllPop.value,() => { 
            lineColorPicker.value =  (lineColorPicker.value && closeAllPop.value) ? false : !!lineColorPicker.value
    }) 
    return { 
        lineColorPicker,
        lineColor,
        changePickerColorLine
    }
  },
})
</script>
<style lang="scss" scoped> 

</style>