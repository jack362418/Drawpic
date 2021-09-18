<template>
  <div> 
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
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue' 
import { Down } from '@icon-park/vue-next';
import lineTool from '@/components/lineTool.vue'  
import { useStore } from '@/store' 
export default defineComponent({
  name: 'delete',
  components:{
      Down,
      lineTool
  },
  setup() {
        const store = useStore()
        const visible = ref<boolean>(false); 
        const selectLinkFlow = computed(() => { return store.state.app.selectLinkFlow })  
        const linkFlow = ref([
            {path: 'M 0 0 L 20 0', style: 'solid', tip:"",id:1},
            {path: 'M 0 0 L 20 0', style: 'dashed',tip:"",id:2 },
            {path: 'M 0 0 L 20 0', style: 'solid', tip:"end-arrow",id:3},
            {path: 'M 0 0 L 20 0', style: 'dashed',tip:"end-arrow",id:4},
        ])
        const handleSelectLinkFlow = (item:any) => {
            visible.value = false
            store.commit("SET_FLOW_LINK",item) 
        };   
        return {
            linkFlow,
            selectLinkFlow,
            visible,
            handleSelectLinkFlow
        }
  }
})
</script>
<style lang="scss" scoped> 
    .select_link{
        padding-top: 9px;
        height: 15px;
        margin-right: 5px;
    }
    /deep/ span{
        display: flex;
    }
</style>