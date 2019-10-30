<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {}
    },
    watch:{
      "$store.getters.name":{
        handler(to) {
            // this.getJgId();
        }
      }
    },
    mounted() {      
    },
    methods: {
      getJgId(){
        this.apiAjax.post("/sys_user/queryBranchByUser",{ uName : this.$store.getters.name}).then((res) => {
            // this.$store.getters.branchid = res.data.userInfo.branchId;
            this.$store.getters.branchid = res.data.data;
            console.log(res,8888)
        }).catch((err) => {
            console.log(err)
        });
      }
    },
  }
</script>
<style>
*{margin:0;padding:0;}
body,html{
  width:100%;
  height:100%;
}
</style>