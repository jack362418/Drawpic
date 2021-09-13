<template>
  <div class="color-picker">
    <div class="svpanel"> 
        <pickerSvpanel :pickerColorHsv='pickerColorHsv' :pickerColorSvpanelBg='pickerColorSvpanelBg'  @colorChange="value => changePickerColor(value)"/>
    </div>
    <div class="picker-color-bar">
        <div class="color-content">
            <div class="picker-current-color" :style="{'background': adsorbentColor}"></div>
        </div>
        <div class="color-slider">
            <div class="picker-color-barWraper">
                <colorBar :pickerColorHsv='pickerColorHsv' @colorChange="value => changePickerColor(value)"/>
            </div>
            <colorSlider :pickerColorHsv='pickerColorHsv' @colorChange="value => changePickerColor(value)"/>
        </div>
    </div>
    <div class="picker-color-dropdown__btns">
        <span>{{ adsorbentColor }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import { pickerColorHsvRgba } from "@/types/shape"
import { rgbtohsv,hsvtorgb } from '@/until/index'
import pickerSvpanel from './pickerSvpanel.vue'
import colorBar from './colorBar.vue'
import colorSlider from './colorSlider.vue'
export default defineComponent({
  name: 'color-picker',
  components:{
      pickerSvpanel,
      colorBar,
      colorSlider
  },
  setup() {
      const pickerColorHsv = ref<pickerColorHsvRgba>({
          h:0,
          s:0,
          v:100,
          a:1
      })
      
      /**
       * 背景颜色
       */
      const pickerColorSvpanelBg = computed(() => {
          let pickerColorBg = hsvtorgb(pickerColorHsv.value.h,100,100)
          return `rgb(${pickerColorBg[0]},${pickerColorBg[1]},${pickerColorBg[2]})`
      })
      /**
       * 吸附的颜色
       */
      const adsorbentColor = computed(() => {
          let pickerColorAdsorbent = hsvtorgb(pickerColorHsv.value.h,pickerColorHsv.value.s,pickerColorHsv.value.v)
          return `rgba(${pickerColorAdsorbent[0]},${pickerColorAdsorbent[1]},${pickerColorAdsorbent[2]},${pickerColorHsv.value.a})`
      })
      const changePickerColor = (value:pickerColorHsvRgba) => {
          pickerColorHsv.value.h = value.h
          pickerColorHsv.value.s = value.s
          pickerColorHsv.value.v = value.v
          pickerColorHsv.value.a = value.a
      }
      return {
          pickerColorSvpanelBg,
          adsorbentColor,
          pickerColorHsv,
          changePickerColor
      }
  }
})
</script>
<style lang="scss" scoped>
    .color-picker{
        position: relative;
        width: 240px;
        background: #fff;
        user-select: none;
        .picker-color-bar{
            display: flex;
            .color-content{
                width: 24px;
                height: 26px;
                position: relative;
                margin-top: 4px;
                margin-right: 4px;
                outline: 1px dashed hsla(0,0%,40%,.12);
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
                .picker-current-color{
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 2;
                }
            }
            .color-slider{
                padding: 4px 0;
                flex: 1;
                .picker-color-barWraper{
                    position: relative;
                    height: 10px;
                }
            }
        }
        .picker-color-dropdown__btns{
            width: 100%;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #eee;
        }
    }
</style>