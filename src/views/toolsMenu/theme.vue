<template>
  <div class="theme">
      <p class="title">背景填充</p>
      <a-radio-group v-model:value="value1">
          <div class="colorFillBg">
            <a-radio-button value="a">纯色填充</a-radio-button>
            <div class="content">
                <a-popover v-model:visible="purityColor"  trigger="click" :destroyTooltipOnHide='true'>
                    <template #content>
                        <ColorPicker @changePickerColorBen="changePickerColorBen" :color="purityColorBg" />
                    </template>
                    <a-tooltip placement="bottom" title="填充颜色">
                       <div class="selectBox"></div>
                    </a-tooltip>
                </a-popover>
            </div>
          </div>
          <div class="picFillBg">
            <a-radio-button   value="b">图片填充</a-radio-button>
            <div class="content">
                <p>sdfdsf</p>
            </div>
          </div>
          <div class="gradualFillBg">
            <a-radio-button   value="c">渐变填充</a-radio-button>
            <div class="content">
                <p>sdfdsf</p>
            </div>
          </div> 
      </a-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import ColorPicker from '@/components/colorPicker/index.vue'
export default defineComponent({
  name: 'theme',
  components:{
      ColorPicker
  },
  setup() {
        const value1 = ref<string>('a');
        const purityColor  = ref<boolean>(false); 
        const purityColorBg =  ref("") 


        const changePickerColorBen = (color: string) => {
            console.log(color)
        }
        return {
            value1,
            purityColor,
            purityColorBg,
            changePickerColorBen
        }
  }
})
</script>
<style lang="scss" scoped>
    .theme{
        font-size: 14px;
        .colorFillBg{
            .selectBox{
                border: 1px solid #d9d9d9;
                height: 25px;
                background: #fff;
            }
        }
    }
</style>