<template>
  <div class="app-container">
    <!--查询-->
    <!--
    <el-row>
      <el-input style="width:200px;" v-model="tableQuery.rname" placeholder="客户信息名"></el-input>
      <span style="margin-right: 15px;"></span>
      <el-tooltip class="item" content="搜索" placement="top">
        <el-button icon="el-icon-search" circle @click="fetchData()"></el-button>
      </el-tooltip>
      -->
    </el-row>
    <div style="margin-bottom: 30px;"></div>
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">{{textMap.create}}</el-button>
    <div style="margin-bottom: 30px;"></div>
    <!--列表-->
    <el-table style="width: 100%"
              :data="tableData"
              v-loading.body="tableLoading"
              element-loading-text="Loading"
              border fit highlight-current-row>
      <el-table-column prop="custPhone" label="客户电话号码"></el-table-column>
      <el-table-column prop="loanAmt" label="贷款金额"></el-table-column>
      <el-table-column prop="curAnuSales" label="现有年销售额"></el-table-column>
      <el-table-column prop="loanPurp" label="贷款目的"></el-table-column>

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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
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
    <!--弹出窗口：编辑客户信息-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="150px" >
        <el-form-item label="贷款金额" prop="rname" >
          <el-input v-model="temp.loanAmt"></el-input>
        </el-form-item>
        <el-form-item label="现有年销售额" prop="rname" >
          <el-input v-model="temp.curAnuSales"></el-input>
         </el-form-item>
        <el-form-item label="贷款目的" prop="rname" >
           <el-input v-model="temp.loanPurp"></el-input>
         </el-form-item>
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

  import custApi from '@/api/cust'
  import { parseTime, resetTemp } from '@/utils'
  import { pageParamNames, confirm, root } from '@/utils/constants'
  import debounce from 'lodash/debounce'

  export default {
    name: 'BankManage',
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
          loanAmt: null,
          curAnuSales: null,
          loanPurp: null,
          rval: null,
          created: null,
          updated: null
        },
        textMap: {
          update: '编辑客户信息',
          create: '新增客户信息'
        },
        rules: {
          loanAmt: [{ required: true, message: '必填', trigger: 'blur' }],
          curAnuSales: [{ required: true, message: '必填', trigger: 'blur' }],
          loanPurp: [{ required: true, message: '必填', trigger: 'blur' }]
        },
      }
    },

    created(){
      this.fetchData()
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
        custApi.queryList(this.tableQuery,this.tablePage).then(res => {
          this.tableData = res.data.data
          this.tableLoading = false
          //设置后台返回的分页参数
        })
      },

      //更新
      handleUpdate(idx,row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.idx = idx
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
            const tempData = Object.assign({}, this.temp)//copy obj
            custApi.updateCustInfo(tempData).then(res => {
              tempData.updated = res.data.updated
              this.tableData.splice(tempData.idx, 1, tempData)
              this.dialogFormVisible = false
              this.$message.success('更新客户信息信息成功')
            })
        })
      },

      //删除
      handleDelete(idx,row) {
        this.$confirm('您确定要永久删除该客户？', '提示', confirm).then(() => {
          custApi.deleteBanCustInfo( {rid : row.rid} ).then(res => {
            this.tableData.splice(idx, 1)
            --this.tablePage.total
            this.dialogFormVisible = false
            this.$message.success('删除客户信息成功')
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },

      //新增
      handleCreate() {
        resetTemp(this.temp)
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => this.$refs['dataForm'].clearValidate())
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (!valid) return;
          custApi.addCustInfo(this.temp).then((res) => {
              this.temp.rid = res.data.rid;//后台传回来新增记录的id
              this.temp.created = res.data.created;//后台传回来新增记录的时间
              this.tableData.unshift(Object.assign({},this.temp))
              ++this.tablePage.total
              this.dialogFormVisible = false
              this.message.success('添加客户信息成功')
            })
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
