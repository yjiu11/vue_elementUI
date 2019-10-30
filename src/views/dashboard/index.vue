<template>
  <div class="dashboard-editor-container" :style="{height:bodyH}">
    <div class="containLeft">
        <div class="startRZBox">
            <img src="../../../static/image/noMess.png" />
             <!-- style="padding-left:30px;" -->
            <div class="startRZBoxContain" v-if="roless=='1'">
                <p class="p1">快速决策竞件</p>
                <p class="p2">Quick Decision Competition</p>
                <p class="p3">点击竞件，即可审核融资信息</p>
            </div>
            <div class="startRZBoxContain" v-if="roless=='2'">
                <p class="p1">精准 高效 审批</p>
                <p class="p2">Accurate Efficient Approval</p>
                <p class="p3">点击审批，即可审核融资信息</p>
            </div>
            <div class="toRZ" @click="toRongzi" v-if="roless=='1'">竞件</div>
            <div class="toRZ" @click="shenP" v-if="roless=='2'">审批</div>
        </div>
        <div class="rzBottom">
            <div class="eachXL" style="border-bottom:1px solid #eee;">
                <!-- <div class="blocks"></div> -->
                <div style="float:left;">
                    <p class="p1">新世贷--为传统金融定向释放活力！</p>
                    <p class="p2"> Innovating Finance with Science and Technology, Improving Efficiency with Service!</p>
                    <p class="p3"><span>合作共赢</span>----在风险可控的前提下，可以采取“一户一策“的个性化供应链融资方案</p>
                    <p class="p3"><span>合作共赢</span>----与产业互联网全面融合实现互利共赢</p>
                    <p class="p3"><span>开拓市场</span>----挖掘新的客户资源，开拓新的市场领域</p>
                </div>
            </div>
            <div class="eachXL">
                <!-- <div class="blocks"></div> -->
                <div style="float:left;overflow:hidden;">
                    <p class="p1">我们的服务</p>
                    <p class="p2"> Our services</p>
                    <p class="p3"><span>信息咨询</span>----新世贷作为中小企业融资领航者，为世界各地客户提供高品质与高价值的金融服务。</p>
                    <p class="p3"><span>高效撮合</span>----根据客户需求，运用大数据分析，精准匹配最优资方。</p>
                    <p class="p3"><span>全程跟踪</span>----整个融资流程，专业人士全程跟踪，让服务更周到，让客户更满意。</p>
                </div>
            </div>
        </div>
        
    </div>
    <div class="containRight">
        <div class="rightTop">
            <div class="rightTopTitle"> <img style="width:20px;margin-right:10px;" src="../../../static/image/clock.png" />公告</div>
            <div class="rightrullContain">
                <div class="eachRou">
                   <div class="mess">武汉****信息科技公司融资成功批复1000万</div>
                   <div class="time">2016-12-12</div>
                </div>
                <div class="eachRou">
                   <div class="mess">武汉*****房地产有限公司融资成功批复1000万</div>
                   <div class="time">2018-09-08</div>
                </div>
                <div class="eachRou">
                   <div class="mess">武汉****科技公司融资成功批复5000万</div>
                   <div class="time">2019-02-02</div>
                </div>
                <div class="eachRou">
                   <div class="mess">武汉****软件开发有限公司融资成功批复1000万</div>
                   <div class="time">2019-01-12</div>
                </div>
                <div class="eachRou">
                   <div class="mess">武汉****服装设计公司融资成功批复1000万</div>
                   <div class="time">2017-4-12</div>
                </div>
                <div class="eachRou">
                   <div class="mess">武汉****科技公司融资成功批复5000万</div>
                   <div class="time">2018-12-12</div>
                </div>
            </div>
        </div>
        <div class="rightBottom">
            <div class="title">数据聚焦</div>
            <img src="../../../static/image/bigRou.png" />
            <div  class="numBox">
                <div class="p1"><div class="block1 block"></div>2000+</div>
                <div class="p1"><div class="block2 block"></div>150000000+</div>
                <div class="p1"><div class="block3 block"></div>100+</div>
            </div>
             <div  class="numBox" style="margin-top:10px;text-align:center;width:360px;">
                <div class="p1" style="font-size:14px;margin:0;width:120px;">服务企业数量</div>
                <div class="p1" style="font-size:14px;margin:0;width:120px;">促成融资金额</div>
                <div class="p1" style="font-size:14px;margin:0;width:120px;">合作金融机构</div>
            </div>
            <div class="btnGroup">
                <button class="bt1" @click="pingtaiTZ">平台特征</button>
                <button class="bt2" @click="moreDetail">更多详情</button>
            </div>
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
        roless:"",
      }
    },
    computed: {
    //   roless(){
    //       if(this.$store.state.user.roles[0].val == "common"){//抢件
    //           return true;
    //       }else if(this.$store.state.user.roles[0].val == "stuff"){//审核
    //           return false;
    //       }
    //   }
    },
    created() {
      
    },
    mounted(){
        this.resize();
        let that=this;
        window.onresize=function(){
            that.resize();
        }
        
        setTimeout(()=>{
            console.log(this.$store.state.user.roles,"store.state.user.roles")
          if(!this.$store.state.user.roles){return};
          if(this.$store.state.user.roles[0].val == "common"){//抢件
              this.roless = 1;
          }else if(this.$store.state.user.roles[0].val == "stuff"){//审核
              this.roless = 2;
          }
        },1000)
    },
    methods:{
        shenP(){
            this.$router.push({name:"notify"})
        },
      resize(){
         this.bodyH = document.body.clientHeight - 90 +"px";
      },
      toRongzi(){
        this.$router.push({name:"finapply"})
      },
      pingtaiTZ(){
          window.location.href="http://119.96.168.93:8081/portal/index.html#/plat";
      },
      moreDetail(){
          window.location.href= "http://119.96.168.93:8081/portal/index.html#/aboutUs";
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard-editor-container{
  width:100%;
  height:100%;
  padding:30px;
  min-width:1200px;
  box-sizing: border-box;
  background:#ECEEF2;
  overflow: hidden;
  .containLeft{
      float:left;
      width:60%;
      height:100%;
      .startRZBox{
          width:100%;
          height:40%;
          background:white;
          position:relative;
            .toRZ{
                position: absolute;
                top:70px;
                right:10px;
                width:208px;
                height:60px;
                border-radius:10px;
                line-height:60px;
                text-align:center;
                font-size:22px;
                color:white;
                cursor:pointer;
                background:rgba(239,87,87,1);
                box-shadow:0px 4px 9px 1px rgba(119,36,36,0.24);
            }
            .toRZ:hover{
                box-shadow:0px 0px 9px 5px rgba(239,87,87,1);
            }
          img{
              width:144px;
              height:113px;
              float:left;
              margin:60px 20px 0 30px;
          }
          .startRZBoxContain{
              padding-top:100px;
              .p1{
                  font-size:25px;
                  font-weight:bolder;
              }
              .p2{
                  color:#666666;
                  font-size:14px;
                  line-height:30px;
              }
              .p3{
                  color:#23759E;
                  font-size:16px;
                  line-height:40px;
              }
          }
      }
      .rzBottom{
          width:100%;
          height:calc(60% - 30px);
          margin-top:30px;
          background:white;
          .eachXL{
              width:100%;
              height:50%;
              overflow:hidden;
              padding-left:30px;
            //   .blocks{
            //       width:120px;
            //       height:100px;
            //       background:#23759E;
            //       float:left;
            //       margin:50px  20px 0 20px;
            //   }
              .p1{
                  font-size:21px;
                  font-weight:bolder;
                  margin-top:20px;
              }
              .p2{
                  font-size:10px;
                  line-height:30px;
              }
              .p3{
                  font-size:13px;
                  line-height:30px;
                  span{
                      color:#23759E;
                  }
              }
          }
      }
  }
  .containRight{
      width:calc(40% - 20px);
      
      height:100%;
      float:left;
      margin-left:20px;
      .rightTop{
          width:100%;
          height:40%;
          background:white;
          overflow: hidden;
          .rightTopTitle{
              width:calc(100% - 40px);
              height:40px;
              font-size:15px;
              line-height:40px;
              margin:0 auto;
              border-bottom:1px solid #eee;
            //   text-align:center;
            //   color:white;
            //   background:#23759E;
          }
          .rightrullContain{
              padding-top:20px;
              height:calc(100% - 65px);
              overflow:auto;
              .eachRou{
                  line-height:28px;
                  height:28px;
                  width:100%;
                  padding-left:20px;
                  font-size:14px;
                  box-sizing: border-box;
                  .mess{
                      width:calc(100% - 100px);
                      overflow:hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      float:left;
                  }
                  .time{
                      width:80px;
                    //   display:inline-block;
                    color:gray;
                      float:right;
                  }
              }

          }
      }
      .rightBottom{
          width:100%;
          height:calc(60% - 30px);
          margin-top:30px;
          background:white;
          .title{
              height:70px;
              line-height:70px;
              width:calc(100% - 60px);
              margin:0 30px;
              border-bottom:1px solid #eee;
              font-size:17px;
              text-align:center;
              span{
                  font-size:14px;
                  color:#1E69B5;
             }
          }
          img{
              width:130px;
              margin:30px auto 0;
              display:block;
          }
          .numBox{
              width:331px;
              font-size:14px;
              margin:30px auto 0;
              display:table;
              .p1{
                  font-size:20px;
                  float:left;
                  margin-right:20px;
                  .block{
                      width:9px;
                      height:9px;
                      margin-right:10px;
                      display:inline-block;
                  }
                  .block1{
                      background:#41B314;
                  }
                  .block2{
                      background:#23759E;
                  }
                  .block3{
                      background:#61C0EF;
                  }
              }
          }
          .btnGroup{
           margin:20px auto 0;
           width:210px;
           color:white;
           button{
               width:100px;
               padding:8px 12px;
               color:white;
               border:none;
               cursor:pointer;
           }
           .bt1{
                background:#23759E;
            }
            .bt2{
                background:#41B314;
            }
        }
      }
  }
  
}
</style>

