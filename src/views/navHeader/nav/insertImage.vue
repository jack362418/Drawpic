<template>
  <div  @click="handleClick()">
    <a-tooltip placement="bottom" title="插入图片">
        <picture-one theme="filled" size="18" fill="#333" :strokeWidth="2" strokeLinecap="square"/>
    </a-tooltip>
    <input type="file"  class="file" :accept="accept"   ref="inputRef"  @change="handleChange($event)" multiple="multiple" />
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue' 
import { useStore } from '@/store'
import { PictureOne } from '@icon-park/vue-next';
import { getImageDataURL,getImageSize,uuid } from '@/until/index'  
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
  name: 'delete',
  components:{
      PictureOne
  },
  setup() {
        const store = useStore()
        const accept = ref('image/*')
        const inputRef = ref<HTMLInputElement>()
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
        return {
            handleClick,
            handleChange,
            accept,
            inputRef
        }
  }
})
</script>
<style lang="scss" scoped> 
    .file{
        display: none;
    }
</style>