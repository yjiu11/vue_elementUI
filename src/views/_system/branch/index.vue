<template>
  <div class="app-container">
    <!--查询-->
    <div class="box_contain">
      <div class="box_contail_header">
        <img src="../../../../static/image/write.png" class="box_contail_header_img" /> <span>按条件查询融资信息</span>
      </div>
      <div class="box_contail_body">
        <search-model :searchInfo="searchInfo" @searchFn="searchFn"></search-model>
      </div>
    </div>
    
    <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">{{textMap.create}}</el-button>
    <div style="margin-bottom: 30px;"></div>
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
          <el-table-column prop="branchId" label="机构编号"></el-table-column>
          <el-table-column prop="branchName" label="机构名称"></el-table-column>
          <el-table-column prop="pbranchId" label="所属机构号"></el-table-column>
          <el-table-column prop="created" label="创建时间" >
            <template slot-scope="scope">
              <span>{{parseTime(scope.row.created)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updated" label="上次变更时间" >
            <template slot-scope="scope">
              <span>{{parseTime(scope.row.updated)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button @click="handleUpdate(scope.row.branchId,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" v-if="!hasAdminRole(scope.row)">
                <el-button @click="handleDelete(scope.$index,scope.row)" size="medium" type="danger" icon="el-icon-delete" circle plain></el-button>
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
      </div>
    </div>
        
    <!--弹出窗口：编辑机构-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="150px" >
        <el-form-item label="机构名称" prop="branchName" >
          <el-input v-model="temp.branchName"></el-input>
        </el-form-item>
        <el-form-item label="机构编号" prop="branchNo" >
          <el-input v-model="temp.branchNo"></el-input>
        </el-form-item>
                <el-form-item label="父机构名称" prop="pBranchName" >
          <el-input v-model="temp.pBranchName"></el-input>
        </el-form-item>
      <!--  <el-form-item label="选择父机构">
          <el-tree
              :data="groupTreeData"
              show-checkbox
              default-expand-all
              ref="DeviceGroupTree"
              node-key="bid"
              check-strictly
              @check="checkGroupNode">
          </el-tree>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import branchApi from '@/api/branch'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'
  import searchModel from '@/components/common/searchModel'
  import editDialog from '@/components/common/editDialog' 

  export default {
    name: 'branchManage',
    components:{
      editDialog,
      searchModel
    },
    data() {
      return {
        tableLoading:false,
        tableData: [],
        groupTreeData: [],
        tableQuery:{
          branchName: null
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
          branchId: null,
          branchName: null,
          pbranchId: null,
          created: null,
          updated: null
        },
        textMap: {
          update: '编辑机构',
          create: '新增机构'
        },
        rules: {
          branchName: [{ required: true, message: '必填', trigger: 'blur' }],
          // pbranchId: [{ required: true, message: '必填', trigger: 'blur' }]
        },
        searchInfo:{
          cols:8,//8为三列，12为两列，24为一列
          labelWidth:"110px",//前面文字的宽度
          items:{//下面是所有的字段，以及对应的属性
            nick:{
              title: "机构名称",
              value: "",
              type:"input",
              dropdownList: [],
            },
          }
        }
      }
    },

    created(){
    },

    watch:{
      //延时查询
      'tableQuery.branchName': debounce( function(){
        this.fetchData()
      },500),
    },//watch

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
        branchApi.queryBranch(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          //设置后台返回的分页参数
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.page[name]))
        })
      },
      searchFn(parames){
        this.tablePage.current = 1
        this.tableLoading = true
        branchApi.queryBranch(parames, this.tablePage).then(res => {
          this.tableData = res.data.page.records
          this.tableLoading = false
          pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.page[name]))
        })
      }, 
      //新增
      handleCreate() {
        resetTemp(this.temp)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
        branchApi.queryTreeList(this.groupTreeData).then((res) => {
          this.groupTreeData = res.data.data 
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
          branchApi.addBranch(this.temp).then((res) => {
              this.temp.branchId = res.data.branchId;
              branchApi.queryBranch(this.tableQuery,this.tablePage).then(res => {
                this.tableData = res.data.page.records
                this.tableLoading = false
                //设置后台返回的分页参数
                pageParamNames.forEach(name => this.$set(this.tablePage, name, res.data.page[name]))
              })
              this.dialogFormVisible = false
              this.$message.success('添加机构成功')
            })
        })
      },
      //更新
      handleUpdate(branchId,row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.branchId = branchId
        console.info(row.pbranchId)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
        branchApi.queryTreeList(this.groupTreeData).then((res) => {
          this.groupTreeData = res.data.data
          this.$refs.DeviceGroupTree.setCheckedKeys([row.pbranchId]);
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return
          const tempData = Object.assign({}, this.temp)//copy obj
          branchApi.updateBranch(tempData).then(res => {
            tempData.updated = res.data.updated
            // this.tableData.splice(tempData.branchId, 1, tempData)
            this.dialogFormVisible = false
            this.$message.success("更新成功")
          })
        })
      },
      checkGroupNode: function (a, b) {
        if (b.checkedKeys.length > 0) {
          this.$refs.DeviceGroupTree.setCheckedKeys([a.bid]);
          this.temp.pbranchId = a.bid
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.app-container {
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>