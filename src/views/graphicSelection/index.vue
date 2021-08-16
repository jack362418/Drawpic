<template>
  <div class="graphicSelection">
    <a-card size="small" title="图形"  class="selectTool">
        <div class="wrapper-tool">
          <a-collapse default-active-key="1" :bordered="false">
            <template >
              <a-icon type="caret-right" />
            </template>
            <a-collapse-panel key="1" header="This is panel header 1" :style="{
              background: '#f7f7f7', borderRadius: '4px',marginBottom: '24px',border: '0',overflow: 'hidden'
            }">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="This is panel header 2" :style="{
               background: '#f7f7f7', borderRadius: '4px',marginBottom: '24px',border: '0',overflow: 'hidden'
            }">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="This is panel header 3" :style="{
               background: '#f7f7f7', borderRadius: '4px',marginBottom: '24px',border: '0',overflow: 'hidden'
            }">
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
export default defineComponent({
  name: 'graphicSelection',
  setup() {
    const textRef = ref("sdfdsfsdf")

    return {
      textRef
    }
  }
})
</script>
<style lang="scss" scoped>
    .graphicSelection{
        height: 100%;
        .selectTool{
            height: 100%;
        }
    }
</style>