<template>
  <div>
    <a-tooltip placement="bottom" title="全选">
        <full-selection theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square" @click="handleSelectAllShape"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { FullSelection } from '@icon-park/vue-next';
export default defineComponent({
  name: 'delete',
  components:{
      FullSelection
  },
  setup() {
    const store = useStore()
    const handleSelectAllShape = () => {
        store.commit("SELECT_ALL_SHAPE")
    }
    return {
        handleSelectAllShape
    }
  },
})
</script>
<style lang="scss" scoped> 

</style>