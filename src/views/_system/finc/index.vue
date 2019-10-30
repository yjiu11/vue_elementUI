<template>
  <div class="app-container">
    <div class="box_contain">
      <div class="box_contail_header">
        <img src="../../../../static/image/write.png" class="box_contail_header_img" /> <span>按条件查询融资信息</span>
      </div>
      <div class="box_contail_body">
        <search-model :searchInfo="searchInfo" @searchFn="fetchData"></search-model>
      </div>
    </div>
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
          <el-table-column prop="caseId" label="融资需求单号" width="160"></el-table-column>
          <el-table-column prop="custNm" label="融资需求方"></el-table-column>
          <el-table-column prop="loanAmt" label="意向融资金额(万元)"></el-table-column>
          <el-table-column prop="financMaturi" label="意向融资期限(月)">
            <template slot-scope="scope">
              <span>{{scope.row.financMaturi}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="financRateAccept" label="可接受年利率(%)">
            <template slot-scope="scope">
              <span>{{scope.row.financRateAccept}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="loanPurp" label="融资目的">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("loanPurp",scope.row.loanPurp)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="repaySource" label="还款来源">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("repaySource",scope.row.repaySource)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="accptDebt" label="是否接受第三方担保">
            <template slot-scope="scope">
              <span>{{jsonName.getFileName("accptDebt",scope.row.credPromt)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created" label="创建时间" width="160">
            <template slot-scope="scope">
              <span>{{parseTime(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updated" label="上次变更时间" width="160">
            <template slot-scope="scope">
              <span>{{parseTime(scope.row.updateTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate2(scope.$index,scope.row)">详情</el-button>
              
              <!-- <el-button size="mini" @click="toDetail(scope.$index,scope.row)">影像</el-button> -->
              
              <el-button size="mini" @click="handleUpdate3(scope.$index,scope.row)">抢件</el-button>
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

   <toDetail :detailInfo="detailInfo" @cancelDetail="cancelDetail"></toDetail>
   <!-- <edit-dialog-Group :basicInfo="basicInfoGroup" @on-cancel="basicInfoGroup.dialogAsync == false" @update="updateGroup"></edit-dialog-Group> -->
   <!-- <edit-dialog-Group :basicInfo="basicInfoGroup2" @on-cancel="basicInfoGroup2.dialogAsync == false" @update="updateGroup2"></edit-dialog-Group> -->

    <edit-dialog-Group :basicInfoGroup="basicInfoGroup" @on-cancel="onCancel" @update="updateGroup"></edit-dialog-Group>

  </div>
</template>

<script>

  import caseApi from '@/api/case'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import toDetail from './toDetail'
  //  import editDialogGroup from '@/components/common/editDialogGroup'
import searchModel from '@/components/common/searchModel'
import {mapGetters} from 'vuex'
import editDialogGroup from './dialogs'

  export default {
    name: 'BankManage',
    components:{
      editDialogGroup,
      toDetail,
      searchModel
    },
    data() {
      return {
        tableLoading:false,
        tableData: [],
        tableQuery:{
          rname: null
        },
        branch_no:"",
        detailInfo:{
          dialogAsync:false,
          row:{},
        },
        tablePage: {
          current: null,
          pages: null,
          size:null,
          total: null
        },
        dialogFormVisible: false,
        basicInfoGroup:{
          cols:12,//8为三列，12为两列，24为一列
          labelWidth:"150px",//前面文字的宽度
          menuName:"融资申请",//该菜单名称
          currentRow:null,//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）
          addSrc:"/fmsBizCaseInfo/add",//添加地址
          editSrc:"/fmsBizCaseInfo/update",//编辑地址
          rules:{//验证规则
               //同上面一样
          },
         
        },
        basicInfoGroup3:{
          cols:12,//8为三列，12为两列，24为一列
          labelWidth:"130px",//前面文字的宽度
          menuName:"融资申请",//该菜单名称
          currentRow:null,//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）
          addSrc:"/fmsBizCaseInfo/add",//添加地址
          editSrc:"/fmsBizCaseInfo/update",//编辑地址
          rules:{//验证规则
               //同上面一样
               input1: [
                    { required: true, message: '输入框不能为空！', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符！', trigger: 'blur' }
                ],
                datetime11: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                input2: [
                    { required: true, message: '输入框不能为空！', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符！', trigger: 'blur' }
                ],
                datetime21: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
          },
          group:{
            groupName:{items1:"融资信息",items2:"企业信息"},//items1和下面的items1名称需要一直
            groupItems:{
                items1:{//下面是所有的字段，以及对应的属性
                  custNm:{
                    title: "客户名称",
                    value: "",
                    type:"input",
                    disabled:false,
                    dropdownList: [],
                  },
                  custNo:{
                    title: "客户号码",
                    value: "",
                    type:"input",
                    disabled:false,
                    dropdownList: [],
                  },
                  loanAmt:{
                    title: "融资金额(万元)",
                    value: "",
                    type:"input",
                    disabled:false,
                    dropdownList: [],
                  },
                  financMaturi:{
                    title: "申请融资期限(月)",
                    value: "",
                    type:"select",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.financMaturi,
                  },
                  financRateAccept:{
                    title: "可接受年利率(%)",
                    value: "",
                    type:"select",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.financRateAccept,
                  },
                  repaySource:{
                    title: "还款来源",
                    value: "",
                    type:"select",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.repaySource,
                  },
                  setlReconcil:{
                    title: "结算对账",
                    value: "",
                    type:"select",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.setlReconcil,
                  },
                  payForm:{
                    title: "付款方式",
                    value: "",
                    type:"select",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.payForm,
                  },

                 averDueDate:{
                   title: "平均应收账期",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.averDueDate,
                 },
                 credPromt:{
                   title: "增信方案",
                    value: [],
                    type:"select",
                    selectMore:true,
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.credPromt,
                 },
                 guardFlag:{
                    title: "是否担保",
                    value: "",
                    type:"radio",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.guardFlag,
                 },

              },
              items2:{//下面是所有的字段，以及对应的属性
                taxGrade:{
                  title: "纳税级别",
                  value: "",
                  type:"select",
                  disabled:false,
                  dropdownList: this.jsonName.jsonName.taxGrade,
                },
                 tradContrc:{
                   title: "贸易合同",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.tradContrc,
                 },

                 billConDates:{
                   title: "企业连续开票时间",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.billConDates,
                 },

                 billDisconMark:{
                    title: "开票间断不超过3个月",
                    value: "",
                    type:"radio",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.billDisconMark,
                 },
                 busiToPubMark:{
                    title: "主营业务是否对公",
                    value: "",
                    type:"radio",
                    disabled:false,
                    dropdownList: this.jsonName.jsonName.busiToPubMark,
                 },
                 grosMargScop:{
                   title: "业务毛利范围",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.grosMargScop,
                 },

                 coreBuyType:{
                   title: "核心买方属于",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.coreBuyType,
                 },

                 compLicCode:{
                   title: "营业执照代码",
                   value: "",
                   type:"input",
                   disabled:false,
                   dropdownList: [],
                 },

                 compLinkName:{
                   title: "企业联系人姓名",
                   value: "",
                   type:"input",
                   disabled:false,
                   dropdownList: [],
                 },

                 compLinkPhone:{
                   title: "企业联系人电话",
                   value: "",
                   type:"input",
                   disabled:false,
                   dropdownList: [],
                 },

                 compProf:{
                   title: "企业简介",
                   value: "",
                   type:"input",
                   disabled:false,
                   dropdownList: [],
                 },

                 assetType:{
                   title: "资产类型",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.assetType,
                 },

              }
            }
          }
        },
        basicInfoGroup2:{
          cols:12,//8为三列，12为两列，24为一列
          labelWidth:"130px",//前面文字的宽度
          menuName:"融资申请",//该菜单名称
          currentRow:null,//编辑的时候当前行的数据
          dialogAsync:false,//弹框显示
          isModify:false,//是否是修改状态（编辑和新增两种状态）
          addSrc:"",//添加地址
          editSrc:"",//编辑地址
          rules:{//验证规则
               //同上面一样
               
          },
          group:{
            groupName:{items1:"融资信息",items2:"企业信息",items3:"账款信息"},//items1和下面的items1名称需要一直
            groupItems:{
                items1:{//下面是所有的字段，以及对应的属性
                  custNm:{
                    title: "客户名称",
                    value: "",
                    type:"input",
                    disabled:true,
                    dropdownList: [],
                  },
                  custNo:{
                    title: "客户号码",
                    value: "",
                    type:"input",
                    disabled:true,
                    dropdownList: [],
                  },
                  loanAmt:{
                    title: "融资金额(万元)",
                    value: "",
                    type:"input",
                    disabled:true,
                    dropdownList: [],
                  },
                  financMaturi:{
                    title: "申请融资期限(月)",
                    value: "",
                    type:"select",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.financMaturi,
                  },
                  financRateAccept:{
                    title: "可接受年利率(%)",
                    value: "",
                    type:"select",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.financRateAccept,
                  },
                  repaySource:{
                    title: "还款来源",
                    value: "",
                    type:"select",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.repaySource,
                  },
                  setlReconcil:{
                    title: "结算对账",
                    value: "",
                    type:"select",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.setlReconcil,
                  },
                  payForm:{
                    title: "付款方式",
                    value: "",
                    type:"select",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.payForm,
                  },

                 averDueDate:{
                   title: "平均应收账期",
                   value: "",
                   type:"select",
                   disabled:true,
                   dropdownList: this.jsonName.jsonName.averDueDate,
                 },
                 credPromt:{
                   title: "增信方案",
                    value: [],
                    type:"select",
                    selectMore:true,
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.credPromt,
                 },
                 guardFlag:{
                    title: "是否担保",
                    value: "",
                    type:"radio",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.guardFlag,
                 },

              },
              items2:{//下面是所有的字段，以及对应的属性
                taxGrade:{
                  title: "纳税级别",
                  value: "",
                  type:"select",
                  disabled:true,
                  dropdownList: this.jsonName.jsonName.taxGrade,
                },
                 tradContrc:{
                   title: "贸易合同",
                   value: "",
                   type:"select",
                   disabled:true,
                   dropdownList: this.jsonName.jsonName.tradContrc,
                 },

                 billConDates:{
                   title: "企业连续开票时间",
                   value: "",
                   type:"select",
                   disabled:true,
                   dropdownList: this.jsonName.jsonName.billConDates,
                 },

                 billDisconMark:{
                    title: "开票间断不超过3个月",
                    value: "",
                    type:"radio",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.billDisconMark,
                 },
                 busiToPubMark:{
                    title: "主营业务是否对公",
                    value: "",
                    type:"radio",
                    disabled:true,
                    dropdownList: this.jsonName.jsonName.busiToPubMark,
                 },
                 grosMargScop:{
                   title: "业务毛利范围",
                   value: "",
                   type:"select",
                   disabled:false,
                   dropdownList: this.jsonName.jsonName.grosMargScop,
                 },

                 coreBuyType:{
                   title: "核心买方属于",
                   value: "",
                   type:"select",
                   disabled:true,
                   dropdownList: this.jsonName.jsonName.coreBuyType,
                 },

                 compLicCode:{
                   title: "营业执照代码",
                   value: "",
                   type:"input",
                   disabled:true,
                   dropdownList: [],
                 },

                 compLinkName:{
                   title: "企业联系人姓名",
                   value: "",
                   type:"input",
                   disabled:true,
                   dropdownList: [],
                 },

                 compLinkPhone:{
                   title: "企业联系人电话",
                   value: "",
                   type:"input",
                   disabled:true,
                   dropdownList: [],
                 },

                 compProf:{
                   title: "企业简介",
                   value: "",
                   type:"input",
                   disabled:true,
                   dropdownList: [],
                 },

                 assetType:{
                   title: "资产类型",
                   value: "",
                   type:"select",
                   disabled:true,
                   dropdownList: this.jsonName.jsonName.assetType,
                 },

              },
              items3:{//下面是所有的字段，以及对应的属性
                caseId:{
                  title: "caseId",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },
                corecomType:{
                  title: "核心企业类型",
                  value: "",
                  type:"select",
                  disabled:true,
                  dropdownList: this.jsonName.jsonName.corecomType,
                },
                corecomNm:{
                  title: "核心企业名称",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },
                corecomLicCode:{
                  title: "核心企业营业执照代码",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },
                financRateAccept:{
                  title: "核心企业所在区域",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },
                acctAmt:{
                  title: "账款金额",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },
                acctDesc:{
                  title: "账款描述",
                  value: "",
                  type:"input",
                  disabled:true,
                  dropdownList: [],
                },

              }
            }
          }
        },
        searchInfo:{
          cols:8,//8为三列，12为两列，24为一列
          labelWidth:"120px",//前面文字的宽度
          items:{//下面是所有的字段，以及对应的属性
            caseId:{
              title: "融资需求单号",
              value: "",
              type:"input",
              dropdownList: [],
            },
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    created(){
      this.fetchData();

    },
    
    watch:{
      "dialogToSend.dialogAsync":{//弹框弹出
            handler(to) {
                if (to){//弹出
                    this.fetchData();
                }else{//关闭
                    console.log(22222)
                }
            }
        },
    },
    mounted() {
    },
    methods: {
      parseTime,
      onCancel(){
        this.basicInfoGroup.isModify = false;
        this.basicInfoGroup.dialogAsync = false;
      },
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
        this.tableLoading = true;
        this.apiAjax.post("/sys_user/queryBranchByUser",{uName:this.name}).then((res) => { //查询机构号         
          if(res.data.data){
            let params={relaBankNo:res.data.data.branch_no,apprStatus:''};
            console.log(res.data.data.branch_no);
            this.branch_no = res.data.data.branch_no;
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
      handleUpdate3(idx,row) {
          this.$confirm('抢件声明：请在24小时之内对融资信息进行审批，审批通过并确认贷款后，无正当理由不得取消该订单，若银行多次无故取消的，将影响其在本平台的信用评分。', '提示', {confirmButtonText: '确定并继续',
              cancelButtonText: '取消'}).then(() => {
            this.tableLoading = true;
            let params={caseId:row.caseId,apprStatus:'appr',relaBankNo:this.branch_no};
            this.apiAjax.post("/fmsBizCaseInfo/update",params).then((res) => {
                this.$message.success("抢件成功");
                this.tableLoading = false;
                this.fetchData();
            }).catch(() => {
                this.tableLoading = false;
                this.$message.error("抢件失败");
                console.log(params)
            });
          }).catch(() => {})       
      },
      
      
      //新增
      handleCreate() {
        this.basicInfoGroup.dialogAsync = true;
        this.basicInfoGroup.isModify = false;
      },
      //编辑
      handleUpdate(idx,row) {
        this.basicInfoGroup.dialogAsync = true;
        this.basicInfoGroup.isModify = true;
        this.basicInfoGroup.currentRow = row;
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
      handleUpdate2(idx,row){
        // this.basicInfoGroup2.dialogAsync = true;
        // this.basicInfoGroup2.isModify = true;
        // this.basicInfoGroup2.currentRow = row;
         this.basicInfoGroup.dialogAsync = true;
        this.basicInfoGroup.isModify = true;
        this.basicInfoGroup.currentRow = row;
      },
      updateGroup(){
        this.fetchData();
        this.basicInfoGroup.isModify = false;
        this.basicInfoGroup.dialogAsync = false;
      },
      updateGroup2(){
        this.basicInfoGroup2.isModify = false;
        this.basicInfoGroup2.dialogAsync = false;
      },
      addGroupFn(){
          this.basicInfoGroup.dialogAsync = true;
          this.basicInfoGroup.isModify = false;
      },
      toDetail(index,row){
        this.detailInfo.dialogAsync = true;
        this.detailInfo.row = row;
        console.log(this.detailInfo.row)
      },
      cancelDetail(){
        this.detailInfo.dialogAsync = false;
      },
      searchFn(){
        // this.tableLoading = true;
        // let params={caseId:this.searchInfo.items.caseId.value,uName:this.name};
        // this.apiAjax.post("/fmsBizCaseInfo/queryList",params).then((res) => {
        //     this.tableLoading = false;
        //     this.tableData = res.data.data;
        // }).catch(() => {
        //   this.tableLoading = false;
        //     console.log(params)
        // });

        // this.tableLoading = true;
        // this.apiAjax.post("/sys_user/queryBranchByUser",{uName:this.name}).then((res) => { //查询机构号         
        //   if(res.data.data){
        //     let params={relaBankNo:res.data.data.branch_no,apprStatus:''};
        //     console.log(res.data.data.branch_no);
        //     this.branch_no = res.data.data.branch_no;
        //     caseApi.queryList(params,this.tablePage).then(res => {
        //       this.tableData = res.data.data
        //       this.tableLoading = false;
        //     })
        //   }else{
        //     this.tableData = [];
        //     this.tableLoading = false
        //   }
        // }).catch(()=>{
        //   this.tableData = [];
        //   this.tableLoading = false;
        // })        

      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.addBtn{
  margin-bottom: 20px;
}
</style>
<style>
.el-message-box__btns .el-button--primary{
      /* background: #A9180A!important; */
    /* border: 1px solid #A9180A !important; */
    /* opacity: 0.8!important; */
        color: #FFF;
    background-color:#A9180A!important;
    border-color: #A9180A!important;
}
</style>
