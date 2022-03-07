<template>
  <div>
    <a-popover v-model:visible="colorPicker"  trigger="click" :destroyTooltipOnHide='true'>
        <template #content>
            <ColorPicker @changePickerColorBen="changePickerColorBen" :color="bgColor" />
        </template>
        <a-tooltip placement="bottom" title="填充颜色">
            <background-color theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch } from 'vue'
import { useStore } from '@/store'
import { BackgroundColor } from '@icon-park/vue-next';
import ColorPicker from '@/components/colorPicker/index.vue'
export default defineComponent({
  name: 'delete',
  components:{
      BackgroundColor,
      ColorPicker
  },
  setup() {
    const store = useStore()
    const bgColor = ref("")  
    const colorPicker = ref<boolean>(false); 
    const currentSelectShap = computed(() => {
        return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
    })
    const closeAllPop = computed(() => { return store.state.app.closeAllPop })
    const changePickerColorBen = (color:string) => {   
        if(currentSelectShap.value) {
            store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, bgColor: color})
        }
    }

    watch(() => colorPicker.value,() => {
        if(!colorPicker.value) return 
        currentSelectShap.value ? bgColor.value = currentSelectShap.value.bgColor : bgColor.value = '409EFF' 
    }) 

    watch(() => closeAllPop.value,() => {
            colorPicker.value = (colorPicker.value && closeAllPop.value) ? false : !!colorPicker.value 
    }) 
    return {
        changePickerColorBen,
        bgColor,
        colorPicker
    }
  },
})
</script>
<style lang="scss" scoped> 

</style>