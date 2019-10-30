<template>
  <div class="dashboard-editor-container" :style="{height:bodyH}">
    <div class="homeHeader">
        <div class="homeHeaderLeft left">
            <p class="titles" style="margin-top:30px;">START COMPETITION</p>
            <p class="chinaTitle">开始竞件</p>
            <p class="detailJJ">发布四季度城镇储户、银行家、企业家问卷调查报告，发布四季度城镇储户、银行家、企业家问卷调查报告，发布四季度城镇储户、银行家、企业家问卷调查报告，发布四季度城镇储户、银行家、企业家问卷调查
                    报告，发布四季度城镇储户、银行家、企业家问卷调查报告。</p>
            <div class="jjBtn" @click="toJJ">
                竟件
            </div>
        </div>
        <div class="homeHeaderRight left">
            <div class="ggBox">
                <img src="../../../static/image/home/radio.png" class="left" />
                <span>最新公告</span>
            </div>
            <div class="ggEachBox">
                <div class="eachGG">
                    <div class="left newsMess"><img src="../../../static/image/home/news.png"/>发布四季家、企业家问卷调查</div>
                    <span class="right">2017-12-12</span>
                </div>
                <div class="eachGG">
                    <div class="left newsMess"><img src="../../../static/image/home/news.png"/>发布四季度城镇储户、银行家、企业家问卷调查报告城镇储户、银行家、企业家问卷调查城镇储户、银行家、企业家问卷调查</div>
                    <span class="right">2017-12-12</span>
                </div>
                <div class="eachGG">
                    <div class="left newsMess"><img src="../../../static/image/home/news.png"/>发布四季度城镇储户、银行家、企业家问卷调查报告城镇储户、银行家、企业家问卷调查城镇储户、银行家、企业家问卷调查</div>
                    <span class="right">2017-12-12</span>
                </div>
                <div class="eachGG">
                    <div class="left newsMess"><img src="../../../static/image/home/news.png"/>发布四季度城镇储户、银行家、企业家问卷调查报告城镇储户、银行家、企业家问卷调查城镇储户、银行家、企业家问卷调查</div>
                    <span class="right">2017-12-12</span>
                </div>
                <div class="eachGG">
                    <div class="left newsMess"><img src="../../../static/image/home/news.png"/>发布四季度城镇储户、银行家、企业家问卷调查报告城镇储户、银行家、企业家问卷调查城镇储户、银行家、企业家问卷调查</div>
                    <span class="right">2017-12-12</span>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
       
        <div class="containerRight left">
            <div class="titles knowsUs" style="margin-top:10px;line-height:35px;margin-left:0;">KNOWS US</div>
            <p style="font-size:16px;line-height:25px;">了解我们</p>
            <div class="compDetailBox">
                <div class="img3 left"></div>
                <div class="comDetail left">
                    <p class="p1">公司简介</p>
                    <hr/>
                    <p class="p2">资本实力强大参控股企业10多家总资产20亿余元</p>
                </div>
            </div>
            <p class="jtdsj">集团大数据</p>
            <hr/>
            <div class="stepBox">
                <div class="step left">
                    <p class="p1">30+</p>
                    <p class="p2">完成融资</p>
                </div>
                <div class="step left">
                    <p class="p1">50+</p>
                    <p class="p2">银行</p>
                </div>
                <div class="step left">
                    <p class="p1">100000+</p>
                    <p class="p2">融资金融</p>
                </div>
            </div>

            <div class="btnGroup">
                <button class="bt1">平台特征</button>
                <button class="bt2">更多详情</button>
            </div>
        </div>
        <div class="imgRight left">

        </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'dashboard',
    data() {
      return {
        bodyH:"",
      }
    },
    computed: {
      
    },
    created() {
      
    },
    mounted(){
        this.resize();
        let that=this;
        window.onresize=function(){
            that.resize();
        }
    },
    methods:{
      resize(){
         this.bodyH = document.body.clientHeight - 85 +"px";
      },
      toJJ(){
          this.$router.push({name:"finapply"})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container{
  width:100%;
  height:100%;
  padding:30px;
  min-width:1200px;
  background:#ECEEF2;
  .titles{
      font-size:18px;
      font-weight:bolder;
      line-height:35px;
      margin-left:20px;
  }
  .chinaTitle{
      font-size:16px;
      line-height:30px;
      margin-left:20px;
  }
  .homeHeader{
      width:100%;
      height:300px;
      overflow:hidden;
      .homeHeaderLeft{
          width:calc(60% - 20px);
          height:100%;
          position:relative;
          background:white;
          .detailJJ{
              width:55%;
              margin-left:20px;
              margin-top:20px;
              font-size:14px;
              line-height:22px;
          }
          .jjBtn{
              width:200px;
              height:60px;
              position:absolute;
              right:30px;
              top:100px;
            //   background:url("../../../static/image/home/jj.png") center center no-repeat;
            //   background-size:100% 100%;
              color:white;
              font-size:20px;
              text-align:center;
              line-height:60px;
              cursor:pointer;
              background:rgba(239,87,87,1);
              box-shadow:0px 4px 9px 1px rgba(119,36,36,0.24);
              border-radius:30px;
              
          }
          .jjBtn:hover{
              box-shadow:0px 0px 9px 5px rgba(239,87,87,1);
          }
      }
      .homeHeaderRight{
          width:40%;
          height:100%;
          background:white;
          margin-left:20px;
          .ggBox{
              line-height:50px;
              img{
                  width:30px;
                  margin:10px 0 0 20px;
              }
              span{
                  color:#22954A;
                  font-size:22px;
                  line-height:40px;
                  margin-left:20px;
              }
          }
          .ggEachBox{
              width:100%;
              padding:0 20px;
              box-sizing: border-box;
              font-size:14px;
              .eachGG{
                  width:100%;
                  box-sizing: border-box;
                  display:table;
                  .newsMess{
                        width:400px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        height:40px;
                        line-height:40px;
                        img{
                            width:20px;
                        }
                    }
                  span{
                    //   position:absolute;
                    //   right:20px;
                    //   top:0;
                    text-align:right;
                    line-height:40px;
                  }
              }
              
              
          }
      }
      

  }
  .container{
      width:100%;
      height:calc(100% - 200px - 120px);
    //   background:white;
      margin-top:30px;
      
  }
  
  .containerRight{
      width:35%;
      height:100%;
      background:white;
      box-sizing: border-box;
      padding:10px;
      .compDetailBox{
          height:30%;
          width:100%;
          background:#02CEA5;
          .img3{
              background:url("../../../static/image/home/img3.png") center center no-repeat;
              background-size:100% 100%;
              width:70%;
              height:100%;
          }
          .comDetail{
              color:white;
              width:30%;
              height:100%;
              .p1{
                  font-size:16px;
                  line-height:22px;
                  margin-top:20px;
                  margin-left:10px;
              }
              hr{
                  color:white;
                  border:1px solid white;
                  margin:10px;
              }
              .p2{
                  font-size:12px;
                  padding:0 10px;
                  line-height:22px;
              }
          }
      }
      .jtdsj{
            line-height:50px;
            text-align:center;
            font-size:20px;
        }
        .stepBox{
            width:100%;
            height:30%;
            .step{
                width:30%;
                height:100%;
                .p1{
                    margin-top:20px;
                    text-align:center;
                    font-size:18px;
                    font-weight:bolder;
                    line-height:50px;
                }
                .p2{
                    color:gray;
                    text-align:center;
                    line-height:30px;
                }
            }
        }
        .btnGroup{
           margin:0 auto;
           width:250px;
           color:white;
           button{
               width:120px;
               padding:10px 15px;
               color:white;
               border:none;
               cursor:pointer;
           }
           .bt1{
                background:#36C2CF;
            }
            .bt2{
                background:#5473E8;
            }
        }
  }
  .imgRight{
      width:calc(65% - 20px);
      margin-left:20px;
      height:100%;
      background:white;
      background:url("../../../static/image/home/rightBottom.png") center center no-repeat;
      background-size:cover;
      overflow: hidden;
  }
  .left{
      float:left;
  }
  .right{
      float:right;
  }
  
}

</style>

<style>
@media screen and (max-width: 1500px) {
   .newsMess{
        width:300px!important;
    }
}
@media screen and (max-height: 900px) {
    .dashboard-editor-container .homeHeader{
        height:250px!important;
    }
    .dashboard-editor-container .homeHeader  .newsMess{
            height:35px!important;
            line-height:35px!important;
    }
    .dashboard-editor-container .homeHeader  .eachGG span{
        height:35px!important;
        line-height:35px!important;
    }
    .knowsUs{
        margin-top:0!important;
    }
    .jtdsj{
        line-height:40px!important;
        font-size:16px!important;
    }
    .btnGroup button{
        font-size:14px!important;
        width:100px!important;
        padding:8px 10px!important;
    }
    .comDetail .p1{
        font-size:14px!important;
        line-height:18px!important;
        margin-top:5px!important;
    }
    .comDetail  hr{
        margin:5px!important;
    }
    .comDetail .p2{
        font-size:12px!important;
        padding:0 10px!important;
        line-height:16px!important;
    }
}
@media screen and (max-height: 830px) {
    .jtdsj{
        line-height:30px!important;
        font-size:14px!important;
    }
    .btnGroup{
        margin-top:10px!important;
    }
    .container{
        height:calc(100% - 200px - 80px)!important;
        margin-top:20px!important;
        
    }
}
</style>
