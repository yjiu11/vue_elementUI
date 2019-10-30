<template>
  <div id="basicDetail editDialog">
    <el-dialog title="详情" :visible.sync="detailInFo.dialogAsync" :width="dialogWidth" :modal-append-to-body="false">
      <div class="clear"></div>
      <div class="title">融资信息:</div>
      <el-col :span="8" >
        <el-col :span="detailInFo.labelWidth">{{item.label}}</el-col>
        <el-col :span="24-detailInFo.labelWidth">{{item.value}}</el-col>
      </el-col>
    
    </el-dialog>
  </div>
</template>

<script>
  export default{
    name: 'basicDetail',
    data(){
      return {

      }
    },
    watch:{
      "detailInFo.dialogAsync":{//弹框弹出
            handler(to) {
                if (to){
                    console.log(111)
                }else{
                    console.log(22222)
                }
            }
        },
    },
    props: {
        detailInFo:Object,
    },
    computed: {
        dialogWidth(){
            let w = "";
            if(this.detailInFo.cols == 24){
                w="500px"
            }else if(this.detailInFo.cols == 12){
                w="800px"
            }else if(this.detailInFo.cols == 8){
                w="1200px"
            }
            return w;
        }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss">
.editDialog{
    .clear{
        clear:both;
    }
    .title{
        width:100%;
        height:30px;
        font-weight:bolder;
        font-size:16px;
    }
    .el-dialog{
        border-radius: 10px!important;
    }
    .el-dialog__body{
        display: table!important;
    }
    .el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
        font-weight:normal!important
    }
    .el-input--medium .el-input__inner{
        width:220px;
    }
    .el-form-item{
        height: 40px;
    }
    .el-dialog__header{
        font-weight:bolder;
    }
}
</style>