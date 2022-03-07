<template>
  <div class="textAlign"> 
    <a-popover v-model:visible="alignVisible"  trigger="click" :destroyTooltipOnHide='true' overlayClassName='text_size'>
        <template #content>
            <div class="flow" v-for="item in optionsSize" :key="item.com" @click="handleChangeSize(item)">
                 <component :is="item.com" theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square" />
            </div>
        </template>
            <a-tooltip placement="bottom" title="字体位置">  
                <component :is='getAlignCom' theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square" />
                <down theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch } from 'vue' 
import { AddText,AlignHorizontalCenterTwo,AlignLeftTwo,AlignRightTwo,Down } from '@icon-park/vue-next';  
import { useStore } from '@/store' 
interface alignItem {
  com: any,
  type: string
}
export default defineComponent({
  name: 'delete',
  components:{
      AddText,
      AlignHorizontalCenterTwo,
      AlignLeftTwo,
      AlignRightTwo,
      Down
  },
  setup() {
        const store = useStore()
        const alignVisible = ref<boolean>(false);   
        const optionsSize = ref<alignItem[]>([
            {com:AlignHorizontalCenterTwo,type:'flex-justify-center'},
            {com:AlignLeftTwo,type:'flex-justify-star'},
            {com:AlignRightTwo,type:'flex-justify-end'}
        ])
        const closeAllPop = computed(() => { return store.state.app.closeAllPop })
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  


        const getAlignCom = computed(() => { 
            let shape = store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
            if(shape && shape.textShape) {
                let textAlignCom = optionsSize.value.filter(item => item.type == shape.textShape.align)[0]
                return textAlignCom.com
            }
            return AlignLeftTwo
        })   

        const handleChangeSize = (item:alignItem) => {
            alignVisible.value = false
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, textShape: {...currentSelectShap.value.textShape,align: item.type}})
            }
        };   
        watch(() => closeAllPop.value,() => { 
            alignVisible.value =  (alignVisible.value && closeAllPop.value) ? false : !!alignVisible.value
        }) 
        return {
            optionsSize, 
            alignVisible,
            currentSelectShap,
            getAlignCom,
            handleChangeSize
        }
  }
})
</script>
<style lang="scss" scoped> 
    .select_link{ 
        height: 15px;
        margin-right: 5px;
    }
    /deep/ span{
        display: flex;
        cursor: pointer;
        rect{
            &:hover{
                color: #409EFF
            }
        }
    }  
</style>