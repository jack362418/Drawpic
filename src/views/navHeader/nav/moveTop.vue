<template>
  <div @click="handleMastTop"> 
    <a-tooltip placement="bottom" title="最上一层">
            <bring-to-front theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue' 
import { BringToFront } from '@icon-park/vue-next';
import { useStore } from '@/store' 
export default defineComponent({
  name: 'delete',
  components:{
      BringToFront
  },
  setup() {
        const store = useStore()
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  
        const handleMastTop = () => {
            let maxZindex = store.state.app.elementShapeArr.sort((it1,it2) => it2.zIndex - it1.zIndex)?.[0].zIndex
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: maxZindex+1})
            }
        }
        return {
            handleMastTop
        }
  }
})
</script>
<style lang="scss" scoped> 

</style>