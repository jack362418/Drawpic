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
    <div class="tool" @click="handleCloseAllPop">
      <operateNav />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import { EditTwo,FilePdf } from '@icon-park/vue-next'; 
import { useStore } from '@/store'  
import operateNav from './operateNav.vue'
interface eventKey {
    key?: number | undefined
}
export default defineComponent({
  name: 'naveHeader',
  components:{
      EditTwo,
      FilePdf, 
      operateNav
  },
  setup() {
        const store = useStore()
        const visibleAreaSizeRef = computed(() => store.getters.layout)
        
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
         
        const changeEdit = (e:Event & eventKey) => {
            if(!e.key) return
            store.commit(editCanvas.value[e.key-1].type)
        } 
        const handleCloseAllPop = () => {
            store.commit("CLOSE_ALL_POP")
        } 
        return {
            editCanvas,
            changeEdit,
            fileArr, 
            visibleAreaSizeRef, 
            handleCloseAllPop
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
        .ant-dropdown-link{
            font-size: 14px;
            cursor: pointer;
        }
        .tool{
            height: 100%;
        }
    }
</style>