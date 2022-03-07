<template>
  <div @click="handleMastBottom"> 
    <a-tooltip placement="bottom" title="最下一层">
            <sent-to-back theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue' 
import { SentToBack } from '@icon-park/vue-next';
import { useStore } from '@/store' 
export default defineComponent({
  name: 'delete',
  components:{
      SentToBack
  },
  setup() {
        const store = useStore()
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })  
        const handleMastBottom = () => {
            let minZindex = store.state.app.elementShapeArr.sort((it1,it2) => it1.zIndex - it2.zIndex)?.[0].zIndex
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: minZindex-1})
            }
        } 
        return {
            handleMastBottom
        }
  }
})
</script>
<style lang="scss" scoped> 

</style>