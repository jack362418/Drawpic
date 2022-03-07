<template>
  <div @click="handleMastUp"> 
    <a-tooltip placement="bottom" title="上移一层"> 
            <bring-forward theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue' 
import { BringForward } from '@icon-park/vue-next';
import { useStore } from '@/store' 
export default defineComponent({
  name: 'delete',
  components:{
      BringForward
  },
  setup() {
        const store = useStore()
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  
        const handleMastUp = () => {
            let maxZindex = currentSelectShap.value.zIndex 
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: maxZindex+2})
            }
        }
        return {
            handleMastUp
        }
  }
})
</script>
<style lang="scss" scoped> 

</style>