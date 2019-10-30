<template>
  <div class="app-container">
    <div class="box_contain">
      <div class="box_contail_header">
        <img src="../../../static/image/write.png" class="box_contail_header_img" /> <span>按条件查询融资信息</span>
      </div>
      <div class="box_contail_body">
        <search-model :searchInfo="searchInfo" @searchFn="searchFn"></search-model>
      </div>
    </div>
        <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate" v-perm="'b:user:add'">新增用户</el-button>
    <div style="margin-bottom: 30px;"></div>
    <div class="box_contain">
        <div class="box_contail_header">
            <img src="../../../static/image/write.png" class="box_contail_header_img" /> <span>融资申请列表</span>
        </div>
      <!--列表-->
    <el-table style="width: 100%"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="Loading"
              border fit highlight-current-row>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="type" label="分类">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("type",scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button @click="handleUpdate(scope.$index,scope.row)" size="mini" type="info" icon="el-icon-edit" circle plain></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" v-if="!hasAdminRole(scope.row)">
                <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger" icon="el-icon-delete" circle plain></el-button>
              </el-tooltip>
          </template>
        <!-- <template slot-scope="scope">
          <el-upload class="upload-demo" :action="`${apiAjax.getBaseUrl().baseURL}${uploadFile.action}`"  :before-upload="beforeUploadFile" 
          :on-error="uploadFileErro" :on-success="uploadFileSuccess" :file-list="uploadFile.fileList" :show-file-list="uploadFile.showFileList">
            <el-button size="mini">债权登记</el-button>
          </el-upload>
        </template> -->
      </el-table-column>
    </el-table>
</div>
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

    <edit-dialog :basicInfo="basicInfo" @on-cancel="basicInfo.dialogAsync = false" @update="update"></edit-dialog>
  </div>
</template>

<script>
  import testApi from '@/api/test'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'
import editDialog from '@/components/common/editDialog' 
  import searchModel from '@/components/common/searchModel'
export default {
    components:{
      editDialog,
      searchModel
    },
    created(){
      this.fetchData();
    },
     data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          username: null
        },
        searchInfo:{
          cols:8,//8为三列，12为两列，24为一列
          labelWidth:"110px",//前面文字的宽度
          items:{//下面是所有的字段，以及对应的属性
            username:{
              title: "用户",
              value: "",
              type:"input",
              dropdownList: [],
            },
          }
        },
        tablePage: {
          current: null,
          pages: null,
          size:null, 
          total: null
        },
        basicInfo:{
          cols:24,//8为三列，12为两列，24为一列
          labelWidth:"140px",
          menuName:"测试信息",//该菜单名称
          currentRow:{},//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）
          addSrc:"/vue/add",//添加地址
          editSrc:"/vue/update",//编辑地址
          items:{//下面是所有的字段，以及对应的属性
            id:{title: "编号",value: "",type:"input",dropdownList: [],disabled:true},
            username:{
              title: "用户",
              value: "",
              type:"input",
              disabled:false
            },
            address:{
              title: "地址",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            },
            type:{
              title: "分类",
              value: "",
              type:"select",
              disabled:false,
              dropdownList: this.jsonName.jsonName.type,
            },
            age:{
              title: "年龄",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            }
          }
        }
      }
     },methods: {
      parseTime,
      hasAdminRole(row){
        return row && row.rval==root.rval
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
      //查询
      fetchData() {
        this.tableLoading = true
        testApi.queryList(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.data
          this.tableLoading = false
          //设置后台返回的分页参数
        })
      },
      //新增
      handleCreate() {
        this.basicInfo.dialogAsync = true;
        this.basicInfo.isModify = false;
      },
      //编辑
      handleUpdate(idx,row) {
        
        this.basicInfo.isModify = true;
        this.basicInfo.currentRow = row;
        this.basicInfo.dialogAsync = true;
      },
      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该记录？', '提示', confirm).then(() => {
          testApi.deleteData( {id : row.id} ).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success('删除信息成功')
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      update(){
        this.fetchData();
      },
      updateGroup(){

      },
      addGroupFn(){
          this.basicInfoGroup.dialogAsync = true;
          this.basicInfoGroup.isModify = false;
      },
      //////////////////////////////////////////////////
      beforeUploadFile(file){
        console.log(file,"上传之前");
        this.uploadFile.loading = this.$loading({
          lock: true,
          text: '正在上传文件',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      uploadFileSuccess(response, file, fileList){
        console.log(response, file, fileList,111)
        this.$message.success({message: '上传成功'});
        this.uploadFile.loading.close();
      },
      uploadFileErro(err, file, fileList){
        console.log(err, file, fileList,222)
        this.$message.error('上传失败！');
        this.uploadFile.loading.close();
      },

      searchFn(parames){
        this.tablePage.current = 1
        this.tableLoading = true
        testApi.queryList(parames, this.tablePage).then(res => {
          this.tableData = res.data.data
          this.tableLoading = false
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.page[name]))
        })
      }
     }
}
</script>
