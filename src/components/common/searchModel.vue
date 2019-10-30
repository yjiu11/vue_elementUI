<template>
  <div class="searchModel">
    <el-form :label-width="searchInfo.labelWidth">
        <el-col :span="searchInfo.cols" v-for="(item,key) in searchInfo.items" :key="key">
            <template v-if="item.type=='input'">
                <el-form-item :label="`${item.title}:`">
                    <el-input v-model="item.value"></el-input>
                </el-form-item>
            </template>
            <template v-if="item.type=='select'">
                <el-form-item :label="`${item.title}:`">
                    <el-select v-model="item.value" placeholder="请选择" clearable>
                        <el-option v-for="(i,k) in item.dropdownList" :key="k" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type=='selectSearch'">
                <el-form-item :label="`${item.title}:`">
                    <el-select v-model="item.value"  placeholder="请选择" filterable clearable>
                        <el-option v-for="(i,k) in item.dropdownList" :key="k" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type=='selectMore'">
                <el-form-item :label="`${item.title}:`">
                    <el-select v-model="item.value" multiple collapse-tags placeholder="请选择" clearable>
                        <el-option v-for="(i,k) in item.dropdownList" :key="k" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type=='datetime'">
                <el-form-item :label="`${item.title}:`">
                    <el-date-picker v-model="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
            </template>
            <template v-if="item.type=='date'">
                <el-form-item :label="`${item.title}:`">
                    <el-date-picker v-model="item.value" type="date" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
            </template>
        </el-col>
         <!-- icon="el-icon-search" -->
        <el-col :span="searchInfo.cols">
            <el-button type="primary" class="search" @click="search">搜索</el-button>
        </el-col>
    </el-form>
    
  </div>
</template>

<script>
export default {
    name: 'searchModel',
    data() {
      return {
        
      }
    },
    components:{
        
    },
    props: {
        searchInfo:Object,
    },
    watch: {
        
    },
    created() {
       
    },
    methods: {
        search(){
            let params={};
            for(let i in this.searchInfo.items){
                params[i] = this.searchInfo.items[i].value;
            }
            this.$emit("searchFn",params);
        }
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.searchModel{
    display:table;
    width:100%;
    .el-input--medium .el-input__inner{
        width:200px;
    }
    .search{
        margin-left:80px;
    }
}
</style>
<style>
.el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
    font-weight:normal!important
}
</style>