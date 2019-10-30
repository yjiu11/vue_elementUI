<template>
  <div class="app-container">
    <search-model :searchInfo="searchInfo" @searchFn="searchFn"></search-model>

    <!--列表-->
    <el-table style="width: 100%"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="Loading"
              border fit highlight-current-row>
      <el-table-column prop="caseId" label="案件号" width="160"></el-table-column>
      <el-table-column prop="custNm" label="客户名"></el-table-column>
      <el-table-column prop="loanAmt" label="申请融资金额(万元)"></el-table-column>
      <el-table-column prop="financMaturi" label="申请融资期限(月)">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("financMaturi",scope.row.financMaturi)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="financRateAccept" label="可接受年利率(%)">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("financRateAccept",scope.row.financRateAccept)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="repaySource" label="还款来源">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("repaySource",scope.row.repaySource)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="assetType" label="资产类型">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("assetType",scope.row.assetType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credPromt" label="增信措施">
        <template slot-scope="scope">
          <span>{{jsonName.getFileName("credPromt",scope.row.credPromt)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间"  width="160" >
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updated" label="上次变更时间"  width="160">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="上传图片" placement="top" >
            <span class="iconfont icon-shangchuantupian" @click="upLoadImgDialog(scope.$index,scope.row)"></span>
          </el-tooltip>
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
    <dialog-img :dialogImg="dialogImg" @update="updateImg"></dialog-img>
  </div>
</template>

<script>

  import caseApi from '@/api/case'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import searchModel from '@/components/common/searchModel'
   import dialogImg from './dialogImg'


  export default {
    name: 'BankManage',
    components:{
      dialogImg,
      searchModel
    },
    data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          rname: null
        },
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          idx: null,//表格的下标
          custNo: null,
          custNm: null,
          loanAmt: null,
          curAnuSales: null,
          loanPurp: null,
          taxGrade: null,
          financRateAccept: null,
          repaySource: null
        },
        dialogImg:{
          async:false,
          id:"",
        },
        searchInfo:{
          cols:8,//8为三列，12为两列，24为一列
          labelWidth:"70px",//前面文字的宽度
          items:{//下面是所有的字段，以及对应的属性
            caseId:{
              title: "案件号",
              value: "",
              type:"input",
              dropdownList: [],
            },
          }
        }
      }
    },

    created(){
      this.fetchData();

    },
    watch:{
      //延时查询
      'tableQuery.rname': debounce( function(){
        this.fetchData()
      },500),
      'tableQuery.rval': debounce( function(){
        this.fetchData()
      },500),
    },//watch
    mounted() {
     
    },
    methods: {
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
        caseApi.queryList(this.tableQuery,this.tablePage).then(res => {
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
        this.basicInfo.dialogAsync = true;
        this.basicInfo.isModify = true;
        this.basicInfo.currentRow = row;
      },
      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该融资？', '提示', confirm).then(() => {
          caseApi.deleteData( {id : row.caseId} ).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success('删除融资信息成功')
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
      upLoadImgDialog(index,row){
        debugger
        this.dialogImg.async = true;
      },
      updateImg(){
        this.dialogImg.async = false;
      },
      searchFn(){
        this.tableLoading = true;
        let params={caseId:this.searchInfo.items.caseId.value};
        this.apiAjax.post("/fmsBizCaseInfo/queryList",params).then((res) => {
            this.tableLoading = false;
            this.tableData = res.data.data;
        }).catch(() => {
          this.tableLoading = false;
            console.log(params)
        });
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
