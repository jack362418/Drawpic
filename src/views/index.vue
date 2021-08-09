<template>
  <div class="index flex">
    <graphicSelection />
    <middleCanvas />
    <toolsMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import graphicSelection from '@/views/graphicSelection/index.vue'
import middleCanvas from '@/views/middleCanvas/index.vue'
import toolsMenu from '@/views/toolsMenu/index.vue'

export default defineComponent({
  name: 'index',
  components:{
    graphicSelection,
    middleCanvas,
    toolsMenu
  },
  setup() {
    let data = reactive({
      name:"蒋"
    })
    const refData = toRefs(data);


    return {
      ...refData
    }
  },
})
</script>

<style lang="scss" scoped>
  .index{
    height: 100%;
  }
</style>

