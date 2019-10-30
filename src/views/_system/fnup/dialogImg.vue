<template>
  <div id="dialogImg">
     <el-dialog title="上传图片" :visible.sync="dialogImg.async" width="900px" :modal-append-to-body="false">
         <div style="display:table;width:100%;">
          <el-col :span="12">
              <el-col :span="8">营业执照：</el-col>
              <el-col :span="16">
                  <el-upload class="upload-demo" :action="`${apiAjax.getBaseUrl().baseURL}${uploadImg.action1}`"  
                  :before-upload="beforeUploadImg"  :on-error="uploadImgErro" 
                  :on-success="uploadImgSuccess" :file-list="uploadImg.fileList"  accept=".jpg,.png">
                    <el-button size="small" type="primary">上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
              </el-col>
          </el-col>
          <el-col :span="12">
              <el-col :span="8">机构信用代码：</el-col>
              <el-col :span="16">
                  <el-upload class="upload-demo" :action="`${apiAjax.getBaseUrl().baseURL}${uploadImg.action2}`"  
                  :before-upload="beforeUploadImg"  :on-error="uploadImgErro" 
                  :on-success="uploadImgSuccess" :file-list="uploadImg.fileList"  accept=".jpg,.png">
                    <el-button size="small" type="primary">上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
              </el-col>
          </el-col>
          <el-col :span="12">
              <el-col :span="8">法人身份证：</el-col>
              <el-col :span="16">
                  <el-upload class="upload-demo" :action="`${apiAjax.getBaseUrl().baseURL}${uploadImg.action3}`"  
                  :before-upload="beforeUploadImg"  :on-error="uploadImgErro" 
                  :on-success="uploadImgSuccess" :file-list="uploadImg.fileList"  accept=".jpg,.png">
                    <el-button size="small" type="primary">上传法人身份证</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
              </el-col>
          </el-col>
         </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFn()">取 消</el-button>
            <el-button type="primary" @click="addFn()" >确 定</el-button>
        </div>
     </el-dialog>
  </div>
</template>

<script>
  export default{
    name: 'dialogImg',
    data(){
      return {
          uploadImg:{
              action1:"",
              action2:"",
              action3:"",
          },
          uploadFile:{
              loading:false,
          }

      }
    },
    props: {
        dialogImg:Object,
    },
    watch: {
        "dialogImg.async":{//弹框弹出
            handler(to) {
                if (to){
                    console.log(11111)
                }else{
                    console.log(22222)
                }
            }
        },
    },
    methods:{
        beforeUploadImg(file){
          console.log(file,"上传之前");
          this.uploadFile.loading = this.$loading({lock: true,text: '正在上传图片',
            spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
        },
        uploadImgSuccess(response, file, fileList){
          console.log(response, file, fileList,111)
          this.$message.success({message: '上传成功'});
          this.uploadFile.loading.close();
        },
        uploadImgErro(err, file, fileList){
          console.log(err, file, fileList,222)
          this.$message.error('上传失败！');
          this.uploadFile.loading.close();
        },
        addFn(){
            this.dialogImg.async=false;
            this,$$emit("update");
        }
    }
  }
</script>
<style>
.el-col-12{
    height:90px;
}
</style>