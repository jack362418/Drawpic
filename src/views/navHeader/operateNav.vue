<template>
  <div class="operateNav">
    <div class="delete nav_com">
        <a-tooltip placement="bottom" title="删除">
            <delete-one theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square" @click="handleDeleteSelect"/>
        </a-tooltip>
    </div>
    <div class="delete nav_com">
        <a-tooltip placement="bottom" title="全选">
            <full-selection theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square" @click="handleSelectAllShape"/>
        </a-tooltip>
    </div>
    <div class="delete nav_com" >
        <a-popover v-model:visible="colorPicker"  trigger="click" :destroyTooltipOnHide='true'>
            <template #content>
                <ColorPicker @changePickerColorBen="changePickerColorBen" :color="bgColor" />
            </template>
            <a-tooltip placement="bottom" title="填充颜色">
                <background-color theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </a-popover>
    </div>
    <div class="delete nav_com"> 
        <a-popover v-model:visible="lineColorPicker"  trigger="click" :destroyTooltipOnHide='true'>
            <template #content>
                <ColorPicker @changePickerColorBen="changePickerColorLine" :color="lineColor" />
            </template>
            <a-tooltip placement="bottom" title="线条颜色">
                <edit theme="filled" size="14" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </a-popover>
    </div>
    <div class="delete nav_com">
        <a-tooltip placement="bottom" title="插入文字">
            <font-size theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </div>
    <div class="fileImg nav_com"  @click="handleClick()">
        <a-tooltip placement="bottom" title="插入图片">
            <picture-one theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
        <input type="file"  class="file" :accept="accept"   ref="inputRef"  @change="handleChange($event)" multiple="multiple" />
    </div>
    <div class="nav_com" @click="handleMastTop">
        <a-tooltip placement="bottom" title="最上一层">
                <bring-to-front theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </div>
    <div class="nav_com" @click="handleMastBottom">
        <a-tooltip placement="bottom" title="最下一层">
                <sent-to-back theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
        </a-tooltip>
    </div>
    <div class="nav_com">
            <a-popover v-model:visible="visible"  trigger="click">
            <template #content>
                <div class="flow" v-for="(item,idx) in linkFlow" :key="item.id" @click="handleSelectLinkFlow(item)">
                    <lineTool :shapeItem='item' :idx='idx'/>
                </div>
            </template>
                <a-tooltip placement="bottom" title="连接">
                    <div class="select_link"> 
                        <lineTool :shapeItem="selectLinkFlow" idx="10000"/>
                    </div>
                    <down theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
                </a-tooltip>
        </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch } from 'vue'
import {Edit,DeleteOne,FullSelection,BackgroundColor,FontSize,PictureOne,BringToFront,SentToBack,Down} from '@icon-park/vue-next';
import { useStore } from '@/store'
import { getImageDataURL,getImageSize,uuid } from '@/until/index'  
import lineTool from '@/components/lineTool.vue' 
import ColorPicker from '@/components/colorPicker/index.vue'
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
}
export default defineComponent({
  name: 'operateNav',
   components:{
      Edit,
      DeleteOne,
      FullSelection,
      BackgroundColor,
      FontSize,
      PictureOne,
      BringToFront,
      SentToBack,
      lineTool,
      Down,
      ColorPicker
  },
  setup() {
        const store = useStore()
        const visible = ref<boolean>(false);
        const colorPicker = ref<boolean>(false); 
        const lineColorPicker = ref<boolean>(false); 
        const linkFlow = ref([
            {path: 'M 0 0 L 20 0', style: 'solid', tip:"",id:1},
            {path: 'M 0 0 L 20 0', style: 'dashed',tip:"",id:2 },
            {path: 'M 0 0 L 20 0', style: 'solid', tip:"end-arrow",id:3},
            {path: 'M 0 0 L 20 0', style: 'dashed',tip:"end-arrow",id:4},
        ])
        const selectLinkFlow = computed(() => { return store.state.app.selectLinkFlow }) 
        const currentSelectShap = computed(() => {
            return store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
        })
        const bgColor = ref("")  
        const lineColor = ref("")
        watch(() => colorPicker.value,() => {
            if(!colorPicker.value) return 
            currentSelectShap.value ? bgColor.value = currentSelectShap.value.bgColor : bgColor.value = '409EFF' 
        }) 
        const uploadImg = ref("") 
        const handleChange = (e: InputEvent) => {
            if(!e.target) return
            const files = (e.target as HTMLInputElement & File[]).files 
            if(files) {
                getImageDataURL(files[0]).then(dataURL => {
                    createElementImage(dataURL)
                })
            }
        }
        const createElementImage = (src: string) => {
            getImageSize(src).then(({width,height}) => { 
                let viewWidth = store.state.app.layout.middleWidth * 0.8
                let viewHeight = window.innerHeight * 0.8
                width > viewWidth ? width = viewWidth : width
                height > viewHeight ? height = viewHeight : height
                let createElement = {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    path: src, 
                    id: uuid(),
                    isSelect: true,
                    rotate: 0,
                    isDbclick:false, 
                    isImage: true,
                    zIndex: store.state.app.elementShapeArr.length + 1,
                }
                store.commit("SET_ELEMENT_SHAPE_ARR",createElement)
            })
        }
        const closeAllPop = computed(() => { return store.state.app.closeAllPop })
        const accept = ref('image/*')
        const inputRef = ref<HTMLInputElement>()
        const handleClick = () => {
            if (!inputRef.value) return
                inputRef.value.value = ''
                inputRef.value.click()
        }
        const handleSelectLinkFlow = (item:any) => {
            visible.value = false
            store.commit("SET_FLOW_LINK",item) 
        };
        const handleDeleteSelect = () => {
            store.commit("DELETE_SELECT_SHAPE")
        }
        const handleSelectAllShape = () => {
            store.commit("SELECT_ALL_SHAPE")
        }
        const changePickerColorBen = (color:string) => {   
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, bgColor: color})
            }
        }
        const changePickerColorLine = (color:string) => { 
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, lineColor: color})
            }
        } 
        const handleMastTop = () => {
            let maxZindex = store.state.app.elementShapeArr.sort((it1,it2) => it2.zIndex - it1.zIndex)?.[0].zIndex
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: maxZindex+1})
            }
        }
        const handleMastBottom = () => {
            let minZindex = store.state.app.elementShapeArr.sort((it1,it2) => it1.zIndex - it2.zIndex)?.[0].zIndex
            if(currentSelectShap.value) {
                store.commit("UPDATE_ELEMENT_SHAPE",{id: currentSelectShap.value.id, zIndex: minZindex-1})
            }
        }
        watch(() => closeAllPop.value,() => {
             colorPicker.value = (colorPicker.value && closeAllPop.value) ? false : !!colorPicker.value
             lineColorPicker.value =  (lineColorPicker.value && closeAllPop.value) ? false : !!lineColorPicker.value
        }) 
        return {
            visible,
            colorPicker,
            lineColorPicker,
            bgColor,
            lineColor,
            linkFlow,
            selectLinkFlow,
            uploadImg,
            accept,
            inputRef,
            currentSelectShap,
            handleClick,
            handleSelectLinkFlow,
            handleDeleteSelect,
            handleSelectAllShape,
            changePickerColorBen,
            handleChange,
            changePickerColorLine,
            handleMastTop,
            handleMastBottom
        }
  }
})
</script>
<style lang="scss" scoped>
    .operateNav{
        display: flex;
        align-items: center;
        height: 100%;
        .file{
            display: none;
        }
        .nav_com{
            display: flex;
            align-items: center;
            padding: 0 15px;
            height: 100%;
            cursor: pointer;
            border-right: 1px solid #eee;
            .select_link{
                padding-top: 9px;
                height: 15px;
                margin-right: 5px;
            }
            /deep/ span{
                display: flex;
            }
        }
    }
</style>