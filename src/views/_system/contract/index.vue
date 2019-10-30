<template>
  <div class="contaract">
    <uedit :value="ueditor.value" :config="ueditor.config" ref="ue"></uedit>

    <div>
        <button @click="getAllHtml()">获得整个html的内容</button>
        <button @click="getContent()">获得body内容</button>
        <button @click="getContentTxt()">获得纯文本</button>

    </div>
    <!-- <iframe src="./uedit/index.html" class="iframes" width="1200" height="300" frameborder="0" scrolling="auto"> </iframe> -->
  </div>

</template>

<script>
import uedit from '../../components/uedit'
  export default {
    name: 'contaract',
    components:{
      uedit
    },
    data() {
      return {
        ue:null,
        // dat: {
        //     content: ''
        // },
        ueditor: {
            value: '编辑器默认文字',
            config: {
                // initialFrameWidth: 800,
                initialFrameHeight: 500
            }
        }
        
      }
    },
    methods: {
      getAllHtml(){
        console.log(this.$refs.ue.getAllHtml(),9999999999)
      },
      getContent() {
        var arr = [];
        arr.push(this.$refs.ue.getUEContent());
        console.log(arr.join("\n"));
      },
      getContentTxt(){
        var arr = [];
        arr.push(this.$refs.ue.getContentTxt());
        console.log(arr.join("\n"));
      }
    },
    
  }










</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.contaract iframe{
  width:100%;
  height:800px;
}
</style>
