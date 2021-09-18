<template>
  <div class="middleCanvas" @mousedown.stop="$event => cancelSelectElement($event)">
    <div 
        class="viewport"  
        :class=" {'viewGridLine':isAddgridLine,'setImage': themeType == 'bgImage'}"
        :style="{ 
          width: viewportWidthRef + 'px',
          height: viewportHeightRef + 'px',
          backgroundColor: themeType == 'bgColor' ? theme.bgColor.color : '', 
          backgroundImage: themeType == 'gradual' || themeType == 'bgImage' ? (themeType == 'gradual' ? `${gradualColor}` : `url(${theme.bgImage.image})`) : ''
        }"
        ref="viewport"
      >
      <creatElement v-if="isCreatElement" />
      <div class="drawingCenter">
        <elementCenterUi ref="elementCenterUiRef"/>
      </div>
      <div class="operates">  
        <operates ref="operates" :viewport="viewport" v-if="viewport"/>
        <moveAreaShape ref="moveAreaShape"/>
      </div>
      <selectDrawArea v-if="!isCreatElement"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref,provide,watch} from 'vue'
import { useStore } from '@/store'
import useViewportSize from './hooks/useViewportSize'
import creatElement from './createElementWraper.vue'
import elementCenterUi from './elementCenterUi.vue'
import operates from './operateShape/index.vue'
import selectDrawArea from './selectDrawArea.vue'
import moveAreaShape from './operateShape/moveAreaShape.vue'

export default defineComponent({
  name: 'middleCanvas',
  components:{
    creatElement,
    elementCenterUi,
    operates,
    selectDrawArea,
    moveAreaShape
  },
  setup() {
    const store = useStore()
    const isCreatElement = computed(() => store.state.app.isCreatElement)
    const isAddgridLine = computed(() => store.state.app.isAddgridLine)
    const viewport = ref<HTMLElement>()
    const elementCenterUiRef = ref()
    /**
     * 取消所有选中的图形
     */
    const cancelSelectElement = () => {
      elementCenterUiRef.value.setShapeHtml()
      store.commit("CANCEL_ALL_SELECT_SHAPE")
      if(store.state.app.isMultiple) {
        store.commit("SET_MULTIPLE_TYPE",false)
        store.commit("CANCEL_MULTIPLE_SHAPE")
      }
    }
    provide('cancelSelectElement',cancelSelectElement)
    
    /**
     * 获取背景色
     */
    const themeType = computed(() => { return store.state.app.themeBg.themeType.type })
    const theme = computed(() => { return store.state.app.themeBg  })
    const gradualColor = computed(() => {
      let gradualBg = store.state.app.themeBg.gradual
      return `linear-gradient(${gradualBg.angle}deg, ${gradualBg.startColor},  ${gradualBg.endColor})`
    })
 

    return {
      ...useViewportSize(),
      isCreatElement,
      cancelSelectElement,
      viewport,
      elementCenterUiRef,
      isAddgridLine,
      themeType,
      gradualColor,
      theme
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
      }
      .setImage{
        background-repeat: no-repeat;
        background-size: cover;
      }
      .viewGridLine{
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=);
        background-position: -1px -1px;
      }
      .drawingCenter{
        position: absolute;
        z-index: 1;
      }
  }
</style>