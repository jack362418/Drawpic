<template>
  <div> 
    <a-popover v-model:visible="sizeVisible"  trigger="click" :destroyTooltipOnHide='true' overlayClassName='text_size'>
        <template #content>
            <div class="flow" v-for="item in optionsSize" :key="item" @click="handleChangeSize(item)">
                <div class="size">{{item}}px</div>
            </div>
        </template>
            <a-tooltip placement="bottom" title="字体大小">
                <div class="select_link">  
                    {{ getSize }}px
                </div> 
                <add-text theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch } from 'vue' 
import { AddText } from '@icon-park/vue-next';  
import { useStore } from '@/store' 
export default defineComponent({
  name: 'delete',
  components:{
      AddText
  },
  setup() {
        const store = useStore()
        const sizeVisible = ref<boolean>(false);   
        const optionsSize = ref([12,13,14,15,16,17,18,20,22,24,26,28])
        const closeAllPop = computed(() => { return store.state.app.closeAllPop })
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  
        const getSize = computed(() => { 
            let shape = store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
            if(shape && shape.textShape) {
                return shape.textShape.fontSize
            }
            return 12
        })   

        const handleChangeSize = (item:number) => {
            sizeVisible.value = false
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, textShape: {...currentSelectShap.value.textShape,fontSize: item}})
            }
        };   
        watch(() => closeAllPop.value,() => { 
            sizeVisible.value =  (sizeVisible.value && closeAllPop.value) ? false : !!sizeVisible.value
        }) 
        return {
            optionsSize, 
            sizeVisible,
            currentSelectShap,
            getSize,
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
    }
    .text_size{
        .size{
            cursor: pointer;
            &:hover{
                color: #409EFF
            }
        }
    }
</style>