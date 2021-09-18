<template>
  <div class="operateNav">  
    <div class="nav_com" v-for="item in currentNavComponent" :key='item'>
         <component :is="item" ></component>
    </div>
  </div>
</template> 
<script lang="ts">
import { defineComponent,ref } from 'vue'  
import deleteCom from './nav/delete.vue'
import allSelect from './nav/allSelect.vue'
import fullShapeColor from './nav/fullShapeColor.vue'
import lineColor from './nav/lineColor.vue'
import insertText from './nav/insertText.vue'
import insertImage from './nav/insertImage.vue'
import moveTop from './nav/moveTop.vue'
import moveBottom from './nav/moveBottom.vue'
import linkFlow from './nav/linkFlow.vue' 
export default defineComponent({
    name: 'operateNav', 
    setup() {
       const currentNavComponent = ref([ deleteCom,allSelect,fullShapeColor,lineColor,insertText,insertImage,moveTop,moveBottom,linkFlow ])
       return {
           currentNavComponent
       }
    }
})
</script>
<style lang="scss" scoped>
    .operateNav{
        display: flex;
        align-items: center;
        height: 100%; 
        .nav_com{
            display: flex;
            align-items: center;
            padding: 0 15px;
            height: 100%;
            cursor: pointer;
            border-right: 1px solid #eee; 
        }
    }
</style>