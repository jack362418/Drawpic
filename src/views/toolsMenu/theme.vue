<template>
  <div class="theme">
      <p class="title">主题设置</p>
      <a-radio-group v-model:value="themeBg" @change="changeRadioGroup">
          <div class="colorFillBg">
            <a-radio-button value="bgColor">纯色填充背景</a-radio-button>
            <div class="content">
                <a-popover v-model:visible="purityColor"  trigger="click" :destroyTooltipOnHide='true'>
                    <template #content>
                        <ColorPicker @changePickerColorBen="changePickerColorBen" :color="purityColorBg" />
                    </template>
                    <a-tooltip placement="bottom" title="填充颜色">
                       <div class="selectBox">
                           <div class="fill" :style="{
                               background: theme.bgColor.color
                           }"></div>
                           <bubble-chart theme="filled" size="20" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"/>
                       </div>
                       
                    </a-tooltip>
                </a-popover>
            </div>
          </div>
          <div class="picFillBg">
            <a-radio-button  value="bgImage">图片填充背景</a-radio-button>
            <div class="content_fill_img" @click="handleClick">
                <div class="pic-upload">
                    <plus theme="filled" size="30" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"  v-if="!theme.bgImage.image"/>
                    <img v-else :src="theme.bgImage.image" alt="" :draggable="false"  style="width:100%;height:100%;">
                </div>
                <input type="file"  class="file" :accept="accept"   ref="inputRef"  multiple="multiple" @change="handleChange($event)"/>
            </div>
          </div>
          <div class="gradualFillBg">
            <a-radio-button   value="gradual">渐变填充背景</a-radio-button>
            <div class="content"> 
                <div class=" gradua"> 
                    <a-popover v-model:visible="graduaColorStart"  placement="left"  trigger="click" :destroyTooltipOnHide='true'>
                        <template #content>
                            <ColorPicker @changePickerColorBen="changePickerColorGraduaStart" :color="graduaStartBg" />
                        </template> 
                        <div class="pop-color">
                            <span>开始颜色:</span>
                            <a-tooltip placement="top" title="填充颜色">
                                <div class="selectBox">
                                    <div class="fill" :style="{
                                        background: theme.gradual.startColor
                                    }"></div>
                                    <bubble-chart theme="filled" size="20" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"/>
                                </div>
                            </a-tooltip>
                        </div> 
                    </a-popover> 
                </div>
                <div class=" gradua">  
                    <a-popover v-model:visible="graduaColorEnd"  placement="left"  trigger="click" :destroyTooltipOnHide='true'>
                        <template #content>
                            <ColorPicker @changePickerColorBen="changePickerColorGraduaEnd" :color="graduaEndBg" />
                        </template> 
                        <div class="pop-color">
                            <span>结束颜色:</span>
                            <a-tooltip placement="top" title="填充颜色">
                                <div class="selectBox">
                                    <div class="fill" :style="{
                                        background: theme.gradual.endColor
                                    }"></div>
                                    <bubble-chart theme="filled" size="20" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"/>
                                </div>
                            </a-tooltip>
                        </div>  
                    </a-popover>
                </div>
                <div class="deg-slider gradua">
                    <span>渐变角度:</span>
                    <a-slider v-model:value="angle" :min="0" :max="360" @change="handleChangeAngle"/>
                </div>
            </div>
          </div>
          <div class="fontSize">
              <div class="content"> 
                <div class=" gradua">  
                     <a-popover v-model:visible="fontSize"  placement="left"  trigger="click" :destroyTooltipOnHide='true'>
                        <template #content>
                            <ColorPicker @changePickerColorBen="changeFontSize" :color="fontSizeBg" />
                        </template> 
                        <div class="pop-color">
                            <span>字体颜色:</span>
                            <a-tooltip placement="top" title="填充颜色">
                                <div class="selectBox">
                                    <div class="fill" :style="{
                                        background: theme.fontSize.color
                                    }"></div>
                                    <bubble-chart theme="filled" size="20" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"/>
                                </div>
                            </a-tooltip>
                        </div>  
                    </a-popover>
                </div>
               
            </div>
          </div>
          <div class="shape">
              <div class="content"> 
                <div class=" gradua"> 
                     <a-popover v-model:visible="shape"  placement="left"  trigger="click" :destroyTooltipOnHide='true'>
                        <template #content>
                            <ColorPicker @changePickerColorBen="changeShapeBg" :color="shapeBg" />
                        </template> 
                        <div class="pop-color">
                            <span>图形颜色:</span>
                            <a-tooltip placement="top" title="填充颜色">
                                <div class="selectBox">
                                    <div class="fill" :style="{
                                        background: theme.shape.colorBg
                                    }"></div>
                                    <bubble-chart theme="filled" size="20" fill="#d9d9d9" :strokeWidth="2" strokeLinecap="square"/>
                                </div>
                            </a-tooltip>
                        </div>  
                    </a-popover>
                </div> 
            </div>
          </div>
          <div class="gridLine">
                <div class="content"> 
                    <div class="line">
                        <span>网格线:</span>
                        <a-switch v-model:checked="isCheckedLine" @change="changeCheckLine"/>
                    </div>
                </div>
          </div>
      </a-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch } from 'vue'
import { useStore } from '@/store'
import ColorPicker from '@/components/colorPicker/index.vue'
import { Plus,BubbleChart } from '@icon-park/vue-next';
import { getImageDataURL } from '@/until/index' 
import { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface';
export default defineComponent({
  name: 'theme',
  components:{
      ColorPicker,
      Plus,
      BubbleChart
  },
  setup() {
        const themeBg = ref<string>('bgColor');
        const angle = ref<number>(1);
        const store = useStore() 
        const purityColor  = ref<boolean>(false); 
        const purityColorBg = ref("") 
        const graduaStartBg = ref("")
        const graduaEndBg = ref("")
        const fontSizeBg = ref("")
        const shapeBg = ref("")
        const graduaColorStart = ref<boolean>(false); 
        const graduaColorEnd = ref<boolean>(false); 
        const fontSize = ref<boolean>(false); 
        const shape = ref<boolean>(false);
        const accept = ref('image/*')
        const inputRef = ref<HTMLInputElement>()
        const closeAllPop = computed(() => { return store.state.app.closeAllPop })
        const theme = computed(() => { return store.state.app.themeBg })

        /**
         * 纯色填充背景
         */
        watch(() => purityColor.value,() => {
            if(!purityColor.value) return
            let color = store.state.app.themeBg.bgColor
            color ? purityColorBg.value = color.color :  purityColorBg.value = '#fff'
        }) 
        const changePickerColorBen = (color: string) => {
            let bgColor = store.state.app.themeBg.bgColor
            store.commit("UPDATE_THEME",{ bgColor: {...bgColor,color} })
        }
        
        /**
         * 图片填充背景
         */
        const handleClick = () => {
            if (!inputRef.value) return
                inputRef.value.value = ''
                inputRef.value.click()
        }
        const handleChange = (e: InputEvent) => { 
            if(!e.target) return
            const files = (e.target as HTMLInputElement & File[]).files 
            if(files) {
                getImageDataURL(files[0]).then(dataURL => { 
                    let bgImage = store.state.app.themeBg.bgImage
                    store.commit("UPDATE_THEME",{ bgImage: {...bgImage,image:dataURL} })
                })
            }
        }

        /**
         * 渐变
         */
        watch(() => graduaColorStart.value,() => {
            if(!graduaColorStart.value) return
            let color = store.state.app.themeBg.gradual
            color ? graduaStartBg.value = color.startColor :  graduaStartBg.value = '#fff'
        }) 

        watch(() => graduaColorEnd.value,() => {
            if(!graduaColorEnd.value) return
            let color = store.state.app.themeBg.gradual
            color ? graduaEndBg.value = color.endColor :  graduaEndBg.value = '#fff'
        }) 
        const changePickerColorGraduaStart = (color: string) => {
            let gradual = store.state.app.themeBg.gradual
            store.commit("UPDATE_THEME",{ gradual: {...gradual,startColor: color} })
        }
        const changePickerColorGraduaEnd = (color: string) => {
            let gradual = store.state.app.themeBg.gradual
            store.commit("UPDATE_THEME",{ gradual: {...gradual,endColor: color} })
        }
        const handleChangeAngle = (e:ChangeEvent) => { 
            let gradual = store.state.app.themeBg.gradual
            store.commit("UPDATE_THEME",{ gradual: {...gradual,angle: e} })
        }

        /**
         * 字体
         */
        watch(() => fontSize.value,() => {
            if(!fontSize.value) return
            let color = store.state.app.themeBg.fontSize
            color ? fontSizeBg.value = color.color :  fontSizeBg.value = '#fff'
        }) 
        const changeFontSize = (color: string) => {
            let fontColor = store.state.app.themeBg.fontSize
            store.commit("UPDATE_THEME",{ fontSize: {...fontColor,color} })
        }

        /**
         * 图形
         */
        watch(() => shape.value,() => {
            if(!shape.value) return
            let shapeColor = store.state.app.themeBg.shape
            shapeColor ? shapeBg.value = shapeColor.colorBg :  shapeBg.value = '#fff'
        }) 
        const changeShapeBg = (color: string) => {
            let shapeColor = store.state.app.themeBg.shape
            store.commit("UPDATE_THEME",{ shape: {...shapeColor,colorBg:color} })
        }

        const changeRadioGroup = (e:ChangeEvent) => { 
            console.log(e.target.value)
            store.commit("UPDATE_THEME",{themeType:{type: e.target.value}})
        }

        /**
         * 网格线
         */ 
         const isCheckedLine = computed(() => { return store.state.app.isAddgridLine })
         const changeCheckLine = (e:ChangeEvent) => {
               store.commit("SET_VIEW_GRIDLINE")
         }

        watch(() => closeAllPop.value,() => {
             purityColor.value = (purityColor.value && closeAllPop.value) ? false : !!purityColor.value 
             graduaColorStart.value = (graduaColorStart.value && closeAllPop.value) ? false : !!graduaColorStart.value 
             graduaColorEnd.value = (graduaColorEnd.value && closeAllPop.value) ? false : !!graduaColorEnd.value 
             fontSize.value = (fontSize.value && closeAllPop.value) ? false : !!fontSize.value 
             shape.value = (shape.value && closeAllPop.value) ? false : !!shape.value
        }) 

        return {
            themeBg,
            purityColor,
            purityColorBg,
            accept,
            inputRef,
            theme,
            angle,
            graduaStartBg,
            graduaEndBg,
            graduaColorStart,
            graduaColorEnd,
            fontSizeBg,
            fontSize,
            shapeBg,
            shape,
            isCheckedLine,
            changePickerColorBen,
            handleClick,
            handleChange,
            changePickerColorGraduaStart,
            changePickerColorGraduaEnd,
            handleChangeAngle,
            changeFontSize,
            changeShapeBg,
            changeRadioGroup,
            changeCheckLine
        }
  }
})
</script>
<style lang="scss" scoped>
    .theme{
        font-size: 14px;
        .title{
            margin-bottom: 5px;
        }
        :deep(.ant-radio-group) {
            width: 100%;
            .ant-radio-button-wrapper{
                width: 100%;
                text-align: center;
            }
        }
        .selectBox{
            border: 1px solid #d9d9d9;
            height: 28px;
            background: #fff;
            margin-top: 5px;
            display: flex;
            align-items: center;
            flex: 1;
            padding: 2px 5px;
            cursor: pointer;
            .fill{
                flex: 1;
                height: 100%;
                margin-right: 5px;
            }
        } 
        .colorFillBg,
        .gradualFillBg,
        .picFillBg{
            margin-bottom: 20px;
        }
        .picFillBg{
            width: 100%;
            .content_fill_img{
                width: 100%;
                .pic-upload{
                    width: 100%;
                    height: 128px;
                    background-color: #fafafa;
                    border: 1px dashed #d9d9d9;
                    margin-top: 5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        border-color: #1890ff;
                    }
                }
                .file{
                    display: none;
                }
            }
        }
        .gridLine,
        .shape,
        .fontSize,
        .gradualFillBg{
            .gradua{
                .pop-color{
                    display: flex; 
                    align-items: center;
                    span{
                        overflow: hidden;
                        margin-right: 10px;
                    }
                }
            }
            .deg-slider{
                display: flex; 
                align-items: center;
                span{
                    overflow: hidden;
                    margin-right: 10px;
                }
                :deep(.ant-slider){
                    flex: 1 !important;
                }
            }
        }
        .fontSize{
            border-top: 1px solid #d9d9d9;
            padding-top: 10px;
        }
        .gridLine{
            margin-top: 5px;
            .line{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>