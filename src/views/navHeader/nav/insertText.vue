<template>
  <div> 
    <a-tooltip placement="bottom" title="插入文字">
        <font-size theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import { FontSize } from '@icon-park/vue-next';
export default defineComponent({
  name: 'delete',
  components:{
      FontSize
  }
})
</script>
<style lang="scss" scoped> 

</style>