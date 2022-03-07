<template>
  <div>
   <a-popover v-model:visible="textColorPicker"  trigger="click" :destroyTooltipOnHide='true'>
        <template #content>
            <ColorPicker @changePickerColorBen="changePickerColorText" :color="textColor" />
        </template>
        <a-tooltip placement="bottom" title="文本颜色"> 
            <text-style-one theme="filled" size="14" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,watch,computed } from 'vue'
import { useStore } from '@/store'
import { TextStyleOne } from '@icon-park/vue-next';
import ColorPicker from '@/components/colorPicker/index.vue'
export default defineComponent({
  name: 'delete',
  components:{
      TextStyleOne,
      ColorPicker
  },
  setup() {
    const store = useStore()
    const textColorPicker = ref<boolean>(false); 
    const textColor = ref("") 
    const closeAllPop = computed(() => { return store.state.app.closeAllPop })
    const currentSelectShap = computed(() => {
        return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
    }) 
    const changePickerColorText = (color:string) => { 
        if(currentSelectShap.value) {
            store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, textShape: {...currentSelectShap.value.textShape,color}})
        }
    } 

    watch(() => textColorPicker.value,() => {
        if(!textColorPicker.value) return 
        currentSelectShap.value ? textColor.value = currentSelectShap.value.textShape.color : textColor.value = '#fff' 
    }) 


    watch(() => closeAllPop.value,() => { 
        textColorPicker.value =  (textColorPicker.value && closeAllPop.value) ? false : !!textColorPicker.value
    }) 
    return { 
        textColorPicker,
        textColor,
        changePickerColorText
    }
  },
})
</script>
<style lang="scss" scoped> 

</style>