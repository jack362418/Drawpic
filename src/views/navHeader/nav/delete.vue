<template>
  <div>
    <a-tooltip placement="bottom" title="删除">
        <delete-one theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square" @click="handleDeleteSelect"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { DeleteOne } from '@icon-park/vue-next';
export default defineComponent({
  name: 'delete',
  components:{
      DeleteOne
  },
  setup() {
    const store = useStore()
    const handleDeleteSelect = () => {
        store.commit("DELETE_SELECT_SHAPE")
    }
    return {
        handleDeleteSelect
    }
  },
})
</script>
<style lang="scss" scoped> 

</style>