<template>
  <div @click="handleMastDown"> 
    <a-tooltip placement="bottom" title="下移一层">  
            <send-backward theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue' 
import { SendBackward } from '@icon-park/vue-next';
import { useStore } from '@/store' 
export default defineComponent({
  name: 'moveDown',
  components:{
      SendBackward
  },
  setup() {
        const store = useStore()
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  
        const handleMastDown = () => {
            let maxZindex = currentSelectShap.value.zIndex 
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: maxZindex-2})
            }
        }
        return {
            handleMastDown
        }
  }
})
</script>
<style lang="scss" scoped> 

</style>