<template>
  <div class="middleCanvas">
    <div class="viewport" :style="{
        width: viewportWidthRef + 'px',
        height: viewportHeightRef + 'px'
      }">

      <creatElement v-if="isCreatElement" />
      
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import useViewportSize from './hooks/useViewportSize'
import creatElement from './createElementWraper.vue'

export default defineComponent({
  name: 'middleCanvas',
  components:{
    creatElement
  },
  setup() {
    const store = useStore()
    const isCreatElement = computed(() => store.state.app.isCreatElement)

    return {
      ...useViewportSize(),
      isCreatElement
    }
  }
})
</script>
<style lang="scss" scoped>
  .middleCanvas{
      background-color: #ebebeb;
      display:flex;
      align-items: center;
      justify-content: center;
      .viewport{
        position: relative;
        background: #fff;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
        background-position: -1px -1px;
      
      }
  }
</style>