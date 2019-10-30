<template>
  <div class="editDialogTo">
    <el-dialog title="影像详情" :close-on-click-modal="false" @close="calcel()" :visible.sync="detailInfo.dialogAsync" width="1000px" :modal-append-to-body="false">
         <!--列表-->
    <el-table style="width: 100%" :data="tableData" v-loading.body="tableLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="idUrl" label="身份证影像">
        <template slot-scope="scope">
          <span v-if="!scope.row.idUrl">(无)</span>
          <img v-else :src="imgUrl(scope.row.idUrl)" class="imgs" @click="toBig(scope.row.idUrl)"/>
        </template>
      </el-table-column>
      <el-table-column prop="licUrl" label="营业执照影像">
        <template slot-scope="scope">
          <span v-if="!scope.row.licUrl">(无)</span>
          <img v-else :src="imgUrl(scope.row.licUrl)" class="imgs" @click="toBig(scope.row.licUrl)"/>
        </template>
      </el-table-column>
      <el-table-column prop="orgCreditCodeUrl" label="机构信用代码影像">
        <template slot-scope="scope">
          <span v-if="!scope.row.orgCreditCodeUrl">(无)</span>
          <img v-else :src="imgUrl(scope.row.orgCreditCodeUrl)" class="imgs" @click="toBig(scope.row.orgCreditCodeUrl)"/>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updated" label="上次变更时间" >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-bottom: 30px;"></div>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.current"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="tablePage.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.total">
    </el-pagination>
    <div class="bigImgBox" v-if="ifBig">
      <div class="imgBox"></div>
      <img :src="bigImgSrcs" class="BigImgs"/>
      <div class="close" @click="closeFn">X</div>
    </div>

    <div slot="footer" class="dialog-footer">
        <el-button @click="calcel()">取 消</el-button>
    </div>

      </el-dialog>
  </div>
</template>
<script>
  import { parseTime } from '@/utils'
  import { root } from '@/utils/constants'
  export default {
    name: 'BankManage',
    data() {
      return {
        ifBig:false,
        bigImgSrcs:"",
        tableLoading:false,
        tableData: [],
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
      }
    },
    watch:{
       "detailInfo.dialogAsync":{//弹框弹出
            handler(to) {
                if (to){//弹出
                    this.searchTable();
                }else{//关闭
                    console.log(22222)
                }
            }
        },
    },
    props:{
        detailInfo:Object
    },
    mounted() {
        
    },
    methods: {
      parseTime,
      imgUrl(img){
        return this.apiAjax.getBaseUrl().baseURL+ '/' + img;
      },
      //分页
      handleSizeChange(val) {
        this.tablePage.size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.tablePage.current = val;
        this.fetchData();
      },
      toBig(imgSrc){
        let src = this.apiAjax.getBaseUrl().baseURL+ '/' + imgSrc;
        this.ifBig = true;
        this.bigImgSrcs = src;
      },
      closeFn(){
        this.ifBig = false;
        this.bigImgSrcs = "";
      },
      searchTable(){//搜索表格
        this.tableLoading = true;
         this.apiAjax.post("fmsBizImageInfo/queryList",{...this.tablePage, caseId: this.detailInfo.row.caseId}).then((res) => { 
          this.tableData = res.data.data
          this.tableLoading = false;
          console.log(res,"resssss")
        })
      },
      calcel(){//关闭详情弹框
        this.tableData = [];
        this.$emit("cancelDetail");
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.imgs{
  cursor:pointer;
  width:100px;
  max-height:100px;
}
.bigImgBox{
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  .imgBox{
    background:#000000;
    opacity:0.7;
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
  }
  .BigImgs{
    position:absolute;
    left:50%;
    top:50%;
    max-width:1200px;
    transform: translate(-50%,-50%);
  }
  .close{
    position:absolute;
    right:0;
    top:0;
    width:30px;
    height:30px;
    font-weight:bolder;
    color:white;
    font-size:20px;
    text-align:center;
    line-height:30px;
    cursor:pointer;
  }
}
</style>
<style>
  .el-table--border::after, .el-table--group::after, .el-table::before{
    z-index: 0;
  }
</style>