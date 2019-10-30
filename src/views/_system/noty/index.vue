<template>
  <div class="app-container">

    <div class="box_contain">
      <div class="box_contail_header">
        <img src="../../../../static/image/write.png" class="box_contail_header_img" /> <span>融资申请列表</span>
      </div>
      <div class="box_contail_contain">
        <!--列表-->
        <el-table style="width: 100%"
                  :data="tableData"
                  v-loading.body="tableLoading"
                  element-loading-text="Loading"
                  border fit highlight-current-row>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="caseId" label="融资申请编号" width="160"></el-table-column>
          <el-table-column prop="custNm" label="融资企业名称"></el-table-column>
          <el-table-column prop="loanAmt" label="申请融资金额(万元)"></el-table-column>
          <el-table-column prop="financMaturi" label="申请融资期限(月)"></el-table-column>
          <el-table-column prop="financRateAccept" label="可接受年利率(%)"></el-table-column>
          <el-table-column prop="repaySource" label="还款来源">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("repaySource",scope.row.repaySource)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="assetType" label="产品类型">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("assetType",scope.row.assetType)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="credPromt" label="增信措施">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("credPromt",scope.row.credPromt)}}</span>
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
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate(scope.$index,scope.row)">批复</el-button>
              <el-button type="primary" @click="handleUpdate2(scope.$index,scope.row)" size="mini">详情</el-button>
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
       </div>
    </div>
    


    <edit-dialog :basicInfo="basicInfo" @on-cancel="basicInfo.dialogAsync = false" @update="update"></edit-dialog>
    <dialogs :basicInfoGroup="basicInfoGroup" @on-cancel="onCancel" @update="updateGroup"></dialogs>
    
  </div>
</template>

<script>

  import caseApi from '@/api/case'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import {mapGetters} from 'vuex'

  import editDialog from './editDialog' 
   import dialogs from './dialogs'
  // import editDialog from '@/components/common/editDialog' 

  export default {
    name: 'BankManage',
    components:{
      editDialog,dialogs
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
        uploadFile:{
          action:"/fmsBizAccountInfo/upload",//图片路径
          showFileList:false,//是否展示上传文件在底部
          //`${util.ajax.defaults.baseURL}${"/Image/Upload"}`
          fileList:[],
          loading:null,
        },
        textMap: {
          update: '编辑融资信息',
          create: '新增融资信息'
        },
        basicInfo:{
          cols:12,//8为三列，12为两列，24为一列
          labelWidth:"160px",
            editDialogTitleAsync:true,//是否定义坦克左上角的文字
            editDialogTitle:"推送融资信息",//自定义弹窗头部名称
            btnAsync:true,//是否定义弹框右下角的按钮
            btnAsyncCancel:true,//右下角取消按钮是否需要，
            jgh:true,//单独在确认批复按钮的时候，加一个机构号的参数
            btnName:["确认批复","需第三方担保"],//右下角按钮个数，和名称
            btnSrc:["/fmsBizApprInfo/add","/fmsBizApprInfo/update"],//右下角按钮对应的请求路径，同上面的按钮个数要一致

          menuName:"融资信息",//该菜单名称
          currentRow:null,//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）
          addSrc:"/fmsBizApprInfo/add",//添加地址
          editSrc:"/fmsBizApprInfo/update",//编辑地址
          rules:{//验证规则
              loanAmt: [{ required: true, message: '必填', trigger: 'blur' }],
              curAnuSales: [{ required: true, message: '必填', trigger: 'blur' }],
              loanPurp: [{ required: true, message: '必填', trigger: 'blur' }]
          },
          items:{//下面是所有的字段，以及对应的属性
            caseId:{
              title: "融资申请编号",
              value: "",
              type:"input",
              disabled:true,
              dropdownList: [],
            },
            custNm:{
              title: "融资企业名称",
              value: "",
              type:"input",
              disabled:true,
              dropdownList:[],// this.jsonName.jsonName.corecomType,
            },
            apprAmt:{
              title: "批复金额（万元）",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            },
            apprLoanTerm:{
              title: "贷款期数（月）",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            },
            apprLoanRate:{
              title: "贷款年利率（%）",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            },
            apprRepayMode:{
              title: "还款方式",
              value: "",
              type:"input",
              disabled:false,
              dropdownList: [],
            }

          }
        },
        basicInfoGroup:{
          cols:12,//8为三列，12为两列，24为一列
          labelWidth:"150px",//前面文字的宽度
          menuName:"详情",//该菜单名称
          currentRow:null,//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）         
        },
        
        
      }
    },

    created(){

    },
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    watch:{
    },
    mounted() {
      this.fetchData()
     console.log(this.$store.getters,this.$store.getters.branchid,"this.$store.getters.branchid")
    },
    methods: {
      parseTime,
      hasAdminRole(row){
        return row && row.rval==root.rval
      },
      onCancel(){
        this.basicInfoGroup.isModify = false;
        this.basicInfoGroup.dialogAsync = false;
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
        this.tableLoading = true;
        this.apiAjax.post("/sys_user/queryBranchByUser",{uName:this.name}).then((res) => { //查询机构号         
          if(res.data.data){
            let params={relaBankNo:res.data.data.branch_no,apprStatus:'appr'};
            console.log(res.data.data.branch_no)
            caseApi.queryList(params,this.tablePage).then(res => {
              this.tableData = res.data.data
              this.tableLoading = false;
            })
          }else{
            this.tableData = [];
            this.tableLoading = false
          }
        }).catch(()=>{
          this.tableData = [];
          this.tableLoading = false;
        })        
      },
      //新增
      handleCreate() {
        this.basicInfo.dialogAsync = true;
        this.basicInfo.isModify = false;
      },
      //编辑
      handleUpdate(idx,row) {
        // console.log(this.$store.getters,this.$store.getters.branchid,"this.$store.getters.branchid");return;
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
        this.fetchData();
        this.basicInfoGroup.isModify = false;
        this.basicInfoGroup.dialogAsync = false;
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
      handleUpdate2(idx,row){
        this.basicInfoGroup.dialogAsync = true;
        this.basicInfoGroup.isModify = true;
        this.basicInfoGroup.currentRow = row;
        
      },

      
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
