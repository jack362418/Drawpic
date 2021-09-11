<template>
  <div class="naveHeader">
    <div class="left_file" :style="{width: visibleAreaSizeRef.graphicWidth + 'px'}">
        <div class="nav_com_file">
            <a-dropdown :trigger="['click']">
                <div class="ant-dropdown-link" @click.prevent>
                    <file-pdf theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square"/>文件
                </div>
                <template #overlay>
                <a-menu>
                    <a-menu-item v-for="item in fileArr" :key="item.id">
                        <span>{{item.menuName}}</span>
                    </a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
        </div>
        <div class="edit_canvas nav_com_file">
            <a-dropdown :trigger="['click']">
                <div class="ant-dropdown-link" @click.prevent>
                   <edit-two theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square"/> 编辑
                </div>
                <template #overlay>
                <a-menu @click="changeEdit">
                    <a-menu-item v-for="item in editCanvas" :key="item.id">
                        <span>{{item.menuName}}</span>
                    </a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
    <div class="tool">
        <div class="delete nav_com">
            <a-tooltip placement="bottom" title="删除">
                <delete-one theme="filled" size="16" fill="#999" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </div>
        <div class="delete nav_com">
            <a-tooltip placement="bottom" title="全选">
                <full-selection theme="filled" size="16" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </div>
        <div class="delete nav_com">
            <a-tooltip placement="bottom" title="填充颜色">
                <background-color theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </div>
        <div class="delete nav_com">
            <a-tooltip placement="bottom" title="线条颜色">
                <edit theme="filled" size="14" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
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
        <div class="nav_com">
            <a-tooltip placement="bottom" title="最上一层">
                 <bring-to-front theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
            </a-tooltip>
        </div>
        <div class="nav_com">
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
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import {Edit,DeleteOne,FullSelection,BackgroundColor,FontSize,PictureOne,EditTwo,FilePdf,BringToFront,SentToBack,Down} from '@icon-park/vue-next';
import { useStore } from '@/store'
import { getImageDataURL } from '@/until/index'
import lineTool from '@/components/lineTool.vue'
interface eventKey {
    key?: number | undefined
}
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
  name: 'naveHeader',
  components:{
      Edit,
      DeleteOne,
      FullSelection,
      BackgroundColor,
      FontSize,
      PictureOne,
      EditTwo,
      FilePdf,
      BringToFront,
      SentToBack,
      lineTool,
      Down
  },
  setup() {
        const store = useStore()
        const visibleAreaSizeRef = computed(() => store.getters.layout)
        const visible = ref<boolean>(false);
        const editCanvas = ref([
            {
                type:"SET_VIEW_GRIDLINE",
                menuName:"网格线",
                id:1
            },
            {
                type:"CLEAR_ALL_SHAPE",
                menuName:"清空所有图形",
                id:2
            }
        ])
        const fileArr = ref([
            {
                type:"DOWNLOAD_FILE",
                menuName:"导出png",
                id: 1
            }
        ])
        const linkFlow = ref([
              /**
               * 直线
               */
              {
                viewBox: 200,
                path: 'M 0 0 L 20 0',
                isLine: true,
                style: 'solid',
                tip:"",
                id:1
              },
              /**
               * 虚线
               */
              {
                viewBox: 200,
                path: 'M 0 0 L 20 0',
                isLine: true,
                style: 'dashed',
                tip:"",
                id:2
              },
               /**
               * 直线带箭头
               */
              {
                viewBox: 200,
                path: 'M 0 0 L 20 0',
                isLine: true,
                style: 'solid',
                tip:"end-arrow",
                id:3
              },
               /**
               * 虚线带箭头
               */
                {
                  viewBox: 200,
                  path: 'M 0 0 L 20 0',
                  isLine: true,
                  style: 'dashed',
                  tip:"end-arrow",
                  id:4 
                },
        ])
        const selectLinkFlow = ref({
                viewBox: 200,
                path: 'M 0 0 L 20 0',
                isLine: true,
                style: 'solid',
                tip:"end-arrow",
                id:3
        })
        const uploadImg = ref("") 
        const changeEdit = (e:Event & eventKey) => {
            if(!e.key) return
            store.commit(editCanvas.value[e.key-1].type)
        }
        const handleChange = (e: InputEvent) => {
            if(!e.target) return
            const files = (e.target as HTMLInputElement & File[]).files 
            if(files) {
                getImageDataURL(files[0]).then(dataURL => {
                    console.log("dataURL",dataURL)
                })
            }
            
        }
        const accept = ref('image/*')
        const inputRef = ref<HTMLInputElement>()
        const handleClick = () => {
            if (!inputRef.value) return
                inputRef.value.value = ''
                inputRef.value.click()
        }
        const handleSelectLinkFlow = (item:any) => {
            visible.value = false
            selectLinkFlow.value = item
        };
        return {
            editCanvas,
            changeEdit,
            fileArr,
            uploadImg,
            handleChange,
            accept,
            inputRef,
            handleClick,
            visibleAreaSizeRef,
            visible,
            handleSelectLinkFlow,
            linkFlow,
            selectLinkFlow
        }
  }
})
</script>
<style lang="scss" scoped>
    .naveHeader{
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        .left_file{
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 15px;
            border-right: 1px solid #eee;
            .nav_com_file{
                margin-right: 20px;
                cursor: pointer;
            }
        }
        .tool{
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
    
        .ant-dropdown-link{
            font-size: 14px;
            cursor: pointer;
        }
        
    }
</style>