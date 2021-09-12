<template>
  <div class="color-picker">
    <div class="picker-color-svpanel" :style="{'background': pickerColorSvpanelBg}" ref="pickerColorSvpanel" @mousedown="$event => handleChangePickerSvpanel($event)">
        <div class="picker-color-svpanel__white picker-com"></div>
        <div class="picker-color-svpanel__black picker-com"></div>
        <div class="picker-color-svpanel__cursor" :style="{
            top: pickerColorSvpCursor.top + '%',
            left: pickerColorSvpCursor.left + '%'
        }">
            <div class="pointer"></div>
        </div>
    </div>
    <div class="picker-color-bar">
        <div class="color-content">
            <div class="picker-current-color"></div>
        </div>
        <div class="color-slider">
            <div class="picker-color-barWraper">
                <div class="content" ></div>
                <div class="picker-color-content-bar" ref="pickerSliderBarEle"  @mousedown="$event => handleChangePickerBar($event)">
                    <div class="bar" :style="{
                        left: pickerColorBar + '%'
                    }"></div>
                </div>
            </div>
            <div class="picker-color-alpha-slider" ref="pickerSliderSliderEle" @mousedown="$event => handleChangePickerSlider($event)">
                <div class="picker-color-alpha-slider__bar" :style="{background: pickerSliderBar}"></div>
                <div class="picker-color-alpha-slider__thumb" :style="{
                    left: pickerSliderSlider + '%'
                }"></div>
            </div>
        </div>
    </div>
    <div class="picker-color-dropdown__btns">
        <span>rgba(255, 255, 255, 0)</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import { rgbtohsv,hsvtorgb } from '@/until/index'
export default defineComponent({
  name: 'color-picker',
  setup() {
      const pickerColorSvpanelBg = ref('rgb(255, 0, 0)')
      const pickerColorSvpCursor = ref({
          top:0,
          left:0
      })
      const pickerSliderBar = ref("linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)")
      const pickerColorBar = ref(0)
      const pickerSliderSlider = ref(0)
      const pickerSliderBarEle = ref<HTMLElement>()
      const pickerSliderSliderEle = ref<HTMLElement>()
      const pickerColorSvpanel = ref<HTMLElement>()
      const pickerColorHsv = ref({
          h:0,
          s:0,
          v:100
      })

      const bgColor = computed(() => `hsl(${pickerColorHsv.value.h}, 100%, 50%)`)

      console.log('bgColor',bgColor.value)

      const handleChangePickerBar = (e:MouseEvent) => {
            if (!pickerSliderBarEle.value) return
            const { width,x } = pickerSliderBarEle.value.getBoundingClientRect()
            pickerColorBar.value = (e.offsetX / width) * 100
            document.onmousemove = (e:MouseEvent) => {
                if(e.clientX <= x) {
                    pickerColorBar.value = 0
                    pickerColorHsv.value.h = 0
                }else if((e.clientX - x) >= width) {
                    pickerColorBar.value = 100
                    pickerColorHsv.value.h = 360
                }else {
                    pickerColorBar.value = ((e.clientX - x) / width) * 100
                    pickerColorHsv.value.h = Math.round((e.clientX - x) / width * 360)
                }
                let arr = hsvtorgb(
                    pickerColorHsv.value.h,
                    pickerColorHsv.value.s,
                   pickerColorHsv.value.v)


                 let pickerColorBg = hsvtorgb(pickerColorHsv.value.h >= 360 ? 0 : pickerColorHsv.value.h,100,100)

                 pickerColorSvpanelBg.value = `rgb(${pickerColorBg[0]},${pickerColorBg[1]},${pickerColorBg[2]})`

            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
      }

      const handleChangePickerSlider = (e:MouseEvent) => {
           if (!pickerSliderSliderEle.value) return
            const { width,x } = pickerSliderSliderEle.value.getBoundingClientRect()
            pickerSliderSlider.value = (e.offsetX / width) * 100
            document.onmousemove = (e:MouseEvent) => {
                if(e.clientX <= x) {
                    pickerSliderSlider.value = 0
                }else if((e.clientX - x) >= width) {
                    pickerSliderSlider.value = 100
                }else {
                    pickerSliderSlider.value = ((e.clientX - x) / width) * 100
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
      }

      const handleChangePickerSvpanel = (e:MouseEvent) => {
            if (!pickerColorSvpanel.value) return
            const { width,height,x,y } = pickerColorSvpanel.value.getBoundingClientRect()
            pickerColorSvpCursor.value.top = (e.clientY - y) / height * 100
            pickerColorSvpCursor.value.left = (e.clientX - x) / width * 100
            let moveX = 0
            let moveY = 0
            document.onmousemove = (e:MouseEvent) => {
                moveX = (e.clientX - x) / width * 100
                moveY = (e.clientY - y) / height * 100
                pickerColorHsv.value.s = (e.clientX - x) / width * 100
                pickerColorHsv.value.v = (1-((e.clientY - y)/height)) * 100
                if(e.clientX <= x) {
                    moveX = 0
                    pickerColorHsv.value.s = 0
                }
                if((e.clientX - x) >= width) {
                    moveX = 100
                    pickerColorHsv.value.s = 100
                }
                if(e.clientY <= y) {
                    moveY = 0
                    pickerColorHsv.value.v = 100    
                }
                if(e.clientY >= (y+height)) {
                    moveY = 100
                    pickerColorHsv.value.v = 0
                }
                pickerColorSvpCursor.value.top = moveY
                pickerColorSvpCursor.value.left = moveX

                 let arr = hsvtorgb(pickerColorHsv.value.h,
                    pickerColorHsv.value.s,
                   pickerColorHsv.value.v)

                   console.log("rgb",arr)
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
      }

      return {
          pickerColorSvpanelBg,
          pickerColorSvpCursor,
          pickerSliderBar,
          handleChangePickerBar,
          pickerColorBar,
          pickerSliderBarEle,
          handleChangePickerSlider,
          pickerSliderSliderEle,
          pickerSliderSlider,
          pickerColorSvpanel,
          handleChangePickerSvpanel
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
        .picker-color-svpanel{
            position: relative;
            height: 180px;
            cursor: pointer;
            .picker-color-svpanel__white{
                background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
            }
            .picker-color-svpanel__black{
                background: linear-gradient(0deg,#000,transparent);
            }
            .picker-color-svpanel__cursor{
                position: absolute;
                .pointer{
                    width: 4px;
                    height: 4px;
                    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,0.3), 0 0 1px 2px rgba(0,0,0,0.4);
                    border-radius: 50%;
                    transform: translate(-2px,-2px);
                }
            }
            .picker-com{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
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
                    .content{
                        background: linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }
                    .picker-color-content-bar{
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 2;
                        .bar{
                            position: absolute;
                            cursor: pointer;
                            box-sizing: border-box;
                            top: 0;
                            width: 4px;
                            height: 100%;
                            border-radius: 1px;
                            background: #fff;
                            border: 1px solid #f0f0f0;
                            box-shadow: 0 0 2px rgba(0,0,0,0.6);
                            z-index: 1;
                        }
                        
                       
                    }
                }
                .picker-color-alpha-slider{
                    position: relative;
                    margin-top: 4px;
                    height: 12px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
                    .picker-color-alpha-slider__thumb{
                        position: absolute;
                        cursor: pointer;
                        box-sizing: border-box;
                        left: 0;
                        top: 0;
                        width: 4px;
                        height: 100%;
                        border-radius: 1px;
                        background: #fff;
                        border: 1px solid #f0f0f0;
                        box-shadow: 0 0 2px rgba(0,0,0,0.6);
                        z-index: 1;
                    }
                    .picker-color-alpha-slider__bar{
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                    }
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