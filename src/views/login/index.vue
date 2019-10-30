<template>
  <div class="gysSysterm">
      <div class="loginBox">
        <div class="containLeftBox">
          <p class="leftCom">Welcome</p>
          <div class="lineCome"></div>
          <p class="gysTitle">银行管理平台</p>
        </div>
        <el-form class="" autoComplete="on" ref="loginForm" style="width:100%;" label-position="left">
              <p class="systermName">账户密码登录</p>
              <div class="linePhone"></div>
              <div class="formBox">
                <i class="el-icon-mobile-phone"></i>
                <input type="text" v-model="loginForm.username" class="phone" placeholder="请输入用户名" />
              </div>
              <div class="formBox" style="margin-top:30px;">
                <i class="el-icon-lock"></i>
                <input type="password" v-model="loginForm.password" class="phone" placeholder="请输入密码" />
              </div>
              <!-- <div class="formBox" style="margin-top:30px;">
                <i class="el-icon-lock"></i>
                <input type="text" v-model="loginForm.valid" class="validate" placeholder="请输入验证码" />
                <button class="getVali" :disabled="disableds" @click="validTo">{{valid}} </button>
              </div> -->
              <!-- <p class="rulBox">
                <el-checkbox v-model="checked"></el-checkbox>
                <span class="rulss" @click="toCheck">我已审慎阅读并同意</span>
                <span class="rules" @click="getRules">《注册协议和隐私协议》</span>
              </p> -->
              <!-- :disabled="!checked" -->
              <!-- <button  class="loginBtn" :loading="loading" @click="handleLogin">登录</button> -->
              <input type="button" class="loginBtn" :loading="loading" @click="handleLogin" value="登录" />
          </el-form>
      </div>

      <el-dialog title="注册协议和隐私政策" :visible.sync="dialogVisible" width="800px">
          <div style="width:100%;height:400px;overflow:auto;text-indent:30px;">
              <p>
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
                  这是注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策注册协议和隐私政策
              </p>
          </div>
          <span slot="footer" class="dialog-footer footerDio">
              <el-button @click="dialogVisible = false" class="btn btn1">取 消</el-button>
              <el-button type="primary" @click="agreeFn" class="btn btn2">同意并继续</el-button>
          </span>
      </el-dialog>

  </div>
</template>
<style rel="stylesheet/scss" lang="scss"  scoped>
.footerDio{
    width:300px;
    margin:0 auto;
    display:block;
    padding:0;
}
.btn{
    width:120px!important;
    font-size:16px!important;
    border:1px solid #F55231!important;
}
.btn:hover{
  font-size:18px!important;
}
.btn1{
    background:#E3E4E5;
    color:#333333;
    border:none!important;
    margin:0!important;
}
.btn2{
    margin-left:30px;
    background:#F55231;
    color:white;
}
.btn2:hover{
  background:#F55231!important;
}
.rulBox{
  font-size:13px;
  margin-left:30px;
  margin-top:15px;
  color:#999999;
  cursor: pointer;
  .rulss{
    margin-left:-15px;
  }
  .rules{
    color:#F55231;
  }
}
.gysSysterm{
    width:100%;
    height:100%;
    min-width:1150px;
    position:relative;
    background:url("../../../static/image/bg1.png") no-repeat 50%;
    background-size: cover;
}
.loginBox{
    border:1px solid #ccc;
    height: 470px;
    width: 410px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 8px;
    background:white;
}
.containLeftBox{
  width:340px;
  height:364px;
  position:absolute;
  left:-340px;
  top:53px;
  border-radius:8px 0 0 8px;
  background:url("../../../static/image/loginBgLeft.png") center center no-repeat;
  background-size:100% 100%;
}
.leftCom{
  font-size:51px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:white;
  line-height:65px;
  text-indent: 35px;
  margin-top:20px;
}
.lineCome{
  width:35px;
  height:5px;
  background:white;
  margin-left:35px;
}
.gysTitle{
  width:214px;
  height:30px;
  font-size:30px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  margin-left:35px;
  margin-top:30px;
}
.linePhone{
  width:30px;
  height:2px;
  background:#F55231;
  border-radius:1px;
  margin:15px auto 110px;
}
.formBox{
  width:340px;
  margin:10px auto;
  border-bottom:1px solid #CCCCCC;
  position:relative;
  display:table;
  i{
    color:#CCCCCC;
    font-size:22px;
    float:left;
    margin-bottom:5px;
  }
  .phone{
    position:absolute;
    left: 40px;
    top: -23px;
    height:50px;
    float:left;
    width:300px;
    line-height:30px;
    border:none;
    outline: none;
    margin-bottom:5px;
    text-indent: 10px;
  }
  .validate{
    position:absolute;
    left:45px;
    top:-5px;
    height:30px;
    float:left;
    width:180px;
    line-height:30px;
    border:none;
    outline: none;
    margin-bottom:5px;
  }
  .getVali{
    position:absolute;
    top:-14px;
    right:0;
    width:116px;
    height:39px;
    font-size:14px;
    text-align:center;
    line-height:39px;
    background:#F55231;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor:pointer;
    border:1px solid #F55231;
  }
}
.loginBtn{
  width:340px;
  height:46px;
  background:#F55231;
  margin-top:50px!important;
  margin-left:34px!important;
  border:1px solid #F55231;
  color:white;
  text-align:center;
  font-size:20px!important;
  cursor: pointer;
  outline: none;
}



.systermName{
    /* width:108px; */
    height:18px;
    font-size:18px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:#F55231;
    text-align:center;
    margin-top:40px;
}
.el-input{
    width:340px;
    margin-left:30px;
    height:50px;
    margin-top:30px;
}
.el-button{
    width:340px;
    margin-left:30px;
    margin-top:30px;
    height:50px;
    font-size:26px;
}
button:disabled{ 
    opacity:0.5;
    border:none;
}
button:disabled:hover{
    font-size:16px;
    cursor: not-allowed;
}
</style>
<style>
.gysSysterm input::-webkit-input-placeholder{
      color: #999999;
      font-size:14px;
}
.gysSysterm input:-moz-placeholder{
      color: #999999;
      font-size:14px;
}
.gysSysterm input::-moz-placeholder{
      color: #999999;
      font-size:14px;
}
.gysSysterm input:-ms-input-placeholder{
      color: #999999;
      font-size:14px;
}
.gysSysterm .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #F55231!important;
    border-color: #F55231!important;
}
</style>

<script>
  export default {
    name: 'login',
    data() {
      
      return {
        loginForm: {
          username: '',
          valid: '',
          password:''
        },
        passwordType: 'password',
        loading: false,
        checked:false,
        valid:"获取验证码",
        disableds:false,
        dialogVisible:false,
      }
    },
    methods: {
      handleLogin() {
        if(!this.loginForm.username){
          this.$message.error('用户名不能为空');
          return;
        }
        if(!this.loginForm.password){
          this.$message.error('密码不能为空');
          return;
        }
        const loading = this.$loading({ lock: true, text: '加载中，请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        
        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          loading.close();
          this.$router.push({path: '/'})
        }).catch(() => {
          loading.close();
        })
      },
      getRules(){
        this.dialogVisible = true;
      },
      agreeFn(){
        this.dialogVisible = false;
        this.checked = true;
      },
      validTo(){
        let num = 60;
        this.disableds = true;
        this.valid = num + "s";
        let times = setInterval(()=>{
          num--;
          this.valid = num + "s";
          if( num == -1){
            this.valid = "获取验证码";
            this.disableds = false;
            clearInterval(times);
          }
        },1000)

        this.valid
      },
      toCheck(){
        console.log(this.checked)
        this.checked = !this.checked;
      }
    },
  }
</script>
