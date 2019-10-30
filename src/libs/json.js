//所有下拉框对应的value值
let jsonName={
    //融资目的
    loanPurp:[
        {label:"购买设备原料",value:"a"},
        {label:"扩大生产经营",value:"b"},
        {label:"补充现金流",value:"c"},
        {label:"建造厂房",value:"d"},
        {label:"其他",value:"e"},
    ],
    //融资目的
    type:[
        {label:"测试1",value:"1"},
        {label:"测试2",value:"2"}
    ],
    //结算对账
    setlReconcil:[
        {label:"月结+n天，定期对账，定期付款",value:"a"},
        {label:"按每份合同结算（批次结算），开票后+n天付款",value:"b"},
        {label:"其他",value:"c"}
    ],
    //平均应收账期
    averDueDate:[
        {label:"30天以内",value:"a"},
        {label:"30-60天",value:"b"},
        {label:"60天-90天",value:"c"},
        {label:"90天-180天",value:"d"},
        {label:"180天以上",value:"e"},
    ],
    //增信方案
    credPromt:[
        // {label:"不接受增信措施",value:"a"},
        {label:"法人无限连带责任担保",value:"a"},
        {label:"法人配偶无限连带责任担保",value:"b"},
        {label:"特定企业提供担保",value:"c"},
        {label:"抵押，质押",value:"d"},
        {label:"保证金",value:"e"},
        {label:"其他",value:"f"},
    ],
    //是否担保
    guardFlag:[
        {label:"是",value:"1"},
        {label:"否",value:"0"},
    ],
    //纳税级别
    taxGrade:[
        // {label:"是",value:"1"},
        // {label:"否",value:"0"},
    ],
    //贸易合同  
    tradContrc:[
        {label:"有框架合同，有订单",value:"a"},
        {label:"有框架合同，无订单（口头订单）",value:"b"},
        {label:"工程进度无框架合同，有订单（传真/订单系统可下载）",value:"c"}
    ],
    //企业连续开票时间  
    billConDates:[
        {label:"不满12个月",value:"a"},
        {label:"12（含）-18个月",value:"b"},
        {label:"18（含）-24个月",value:"c"},
        {label:"24个月（含）以上",value:"d"},
    ],
    //开票间断不超过3个月
    billDisconMark:[
        {label:"是",value:"1"},
        {label:"否",value:"0"},
    ],
    //主营业务是否对公
    busiToPubMark:[
        {label:"是",value:"1"},
        {label:"否",value:"0"},
    ],
    //业务毛利范围  
    grosMargScop:[
        {label:"0-15%",value:"a"},
        {label:"15%-30%",value:"b"},
        {label:"30%-50%",value:"c"},
        {label:"50%以上",value:"d"},
    ],
    //核心买方属于  
    coreBuyType:[
        {label:"上市企业",value:"a"},
        {label:"好企业，但没上市",value:"b"},
        {label:"政府机关事业单位",value:"c"},
        {label:"其他",value:"d"},
    ],
    //资产类型  
    assetType:[
        {label:"应收账款融资",value:"a",disableds:false},
        {label:"个人住房",value:"b",disableds:true},
        {label:"银行承兑汇票",value:"c",disableds:true},
        {label:"商业承兑汇票",value:"d",disableds:true},
        {label:"机器/设备",value:"e",disableds:true},
        {label:"股权",value:"f",disableds:true},
        {label:"信用",value:"g",disableds:true},
        {label:"其他",value:"h",disableds:true},
    ],
    //核心企业类型  
    corecomType:[
        {label:"民营",value:"a"},
        {label:"国企",value:"b"},
        {label:"央企",value:"c"},
        {label:"其他",value:"d"},
    ],
    //申请融资期限(月)
    financMaturi:[
        {label:"三个月",value:"a"},
        {label:"六个月",value:"b"},
        {label:"一年",value:"c"},
        {label:"两年",value:"d"},
        {label:"两年以上",value:"f"},
    ],
    //最高可接受年利率
    financRateAccept:[
        {label:"年利率<=6%",value:"a"},
        {label:"年利率<=10%",value:"b"},
        {label:"年利率<=15%",value:"c"},
        {label:"年利率>15%",value:"d"},
    ],
    //还款来源
    repaySource:[
        {label:"应收账款",value:"a"},
        {label:"业务资金",value:"b"},
        {label:"企业资金",value:"c"},
        {label:"其他",value:"d"},
    ],
    //还款方式
    repayMode:[
        {label:"应收账款",value:"a"},
        {label:"业务资金",value:"b"},
        {label:"企业资金",value:"c"},
        {label:"其他",value:"d"},
    ],
    //融资状态
    loanStat:[
        {label:"审批中",value:"0"},
        {label:"成功",value:"1"},
        {label:"被拒",value:"2"},
    ],
    //所属行业
    compIndust:[
        {label:"计算机/通信/电子",value:"a"},
        {label:"贸易/消费",value:"b"},
        {label:"制造/生产",value:"c"},
        {label:"制药/医药",value:"d"},
        {label:"广告/媒体",value:"e"},
        {label:"房地产/建筑",value:"f"},
        {label:"教育/培训",value:"g"},
        {label:"服务业",value:"h"},
        {label:"物流/运输",value:"i"},
        {label:"能源/原材料",value:"j"},
        {label:"农牧林渔",value:"k"},
        {label:"其他",value:"l"},
        
    ],
    //现有年销售额
    curAnuSales:[
        {label:"0-500万",value:"a"},
        {label:"500万-1000万",value:"b"},
        {label:"1000万-5000万",value:"c"},
        {label:"5000万以上",value:"d"},
        
    ],
    // 1 现在是审批通过  改成 银行批复 
    //             2 平台审批 3 平台拒绝 4核心企业审批 5 核心企业拒绝 6银行审批 7 银行拒绝 1银行批复
    //             10 平台审批11平台拒绝 20心企业审批 21核心企业拒绝 30 银行审批31 银行拒绝 32 银行批复
    //融资进度
    apprState:[
        // {label:"银行批复",value:"1"},
        // {label:"平台审批",value:"2"},
        // {label:"平台拒绝",value:"3"},
        // {label:"核心企业审批",value:"4"},
        // {label:"核心企业拒绝",value:"5"},
        // {label:"银行审批",value:"6"},
        // {label:"银行拒绝",value:"7"},
        {label:"平台审批中",value:"10"},
        {label:"平台拒绝",value:"11"},
        {label:"核心企业审批中",value:"20"},
        {label:"核心企业拒绝",value:"21"},
        {label:"银行审批中",value:"30"},
        {label:"银行拒绝",value:"31"},
        {label:"银行批复",value:"32"},


    	
    ],
    //付款方式
    payForm:[
        {label:"现金",value:"a"},
        {label:"银行转账",value:"b"},
        {label:"银行汇票",value:"c"},
        {label:"银行本票",value:"d"},
        {label:"商业汇票",value:"e"},
        {label:"支票",value:"f"},
        {label:"信用证",value:"g"},
        {label:"汇兑",value:"h"},
        {label:"委托收款",value:"i"},
        {label:"托收承付",value:"j"},
        {label:"其他",value:"k"},
    ],
    //结算方式
    setlForm:[
        {label:"月结付款",value:"a"},
        {label:"季度付款",value:"b"},
        {label:"项目批次付款",value:"c"},
        {label:"一次性付款",value:"d"},
        {label:"其他",value:"e"},
    ],
    // 付款方式

}

//去除空格
function trim(val){
　　return val.replace(/(^\s*)|(\s*$)/g, "");
}

//获取字段中文名称filed是字段名，value是对应的value值
function getFileName(filed,value){
    if(!value){
        return "";
    }
    let name = "";
    if(!(value.indexOf(",") == -1)){//数组
        for(let i=0;i<value.split(",").length;i++){
            for(let item in jsonName){
                if(item == filed){
                    for(let j in jsonName[item]){
                        if(value.split(",")[i] == jsonName[item][j].value){
                            name+=jsonName[item][j].label+",";
                        }
                    }
                }
            }
        }
    }else{
        for(let item in jsonName){
            if(item == filed){
                for(let j in jsonName[item]){
                    if(value == jsonName[item][j].value){
                        name=jsonName[item][j].label+",";
                    }
                }
            }
        }
    }
    if(!name){
        return ""
    }else{
        return name.substr(0,name.length-1);
    }
}

let provinceDrop = {};
let cityDrop = {};
let country = {};

//三级联动的省市区
let allProvinceCityCount=[];

//正则验证是否为数字，或小数
//val是判断的数字，num是判断最多有多少位小数
// util.toValidate(12.23,2) =》true  
// num为空表示为数字(小数或整数)
// num为0表示为整数
// num为1表示一位小数
// .......
function valiNum(value,num){
    let val = value+"";
    let valPoint = val.substr(val.length-1,1);
    if(valPoint == "."){
        return false;
    }
    // if(!num){
    //     return /^\d+$/.test(val)  || /^(\d+\.\d+)+$/.test(val);;
    // }else{
        if(num==0){
            return /^\d+$/.test(val);
        }else if(num==1){
            return /^\d+$/.test(val) || /^\d+\.\d{1}$/.test(val);
        }else if(num==2){
            return /^\d+$/.test(val) || /^\d+\.\d{1,2}$/.test(val);
        }else if(num==3){
            return /^\d+$/.test(val) || /^\d+\.\d{1,3}$/.test(val);
        }else if(num==4){
            return /^\d+$/.test(val) || /^\d+\.\d{1,4}$/.test(val);
        }else if(num==5){
            return /^\d+$/.test(val) || /^\d+\.\d{1,5}$/.test(val);
        }else if(num==6){
            return /^\d+$/.test(val) || /^\d+\.\d{1,6}$/.test(val);
        }else if(num==7){
            return /^\d+$/.test(val) || /^\d+\.\d{1,7}$/.test(val);
        }else if(num==8){
            return /^\d+$/.test(val) || /^\d+\.\d{1,8}$/.test(val);
        }else if(num==9){
            return /^\d+$/.test(val) || /^\d+\.\d{1,9}$/.test(val);
        }else if(num==10){
            return /^\d+$/.test(val) || /^\d+\.\d{1,10}$/.test(val);
        }else if(!num){
            return /^\d+$/.test(val)  || /^(\d+\.\d+)+$/.test(val);
        }
    // }
}
export default {
    jsonName,
    trim,
    valiNum,
    getFileName,
    provinceDrop,
    cityDrop,
    country,
    allProvinceCityCount,

}


// 一融资信息 二企业信息 三账款信息

// assetType: "g" //资产类型 二
// averDueDate: ""//平均应收账期
// billConDates: ""//企业连续开票时间  二
// billDisconMark: "0"//开票间断不超过3个月 二
// busiToPubMark: ""//主营业务是否对公  二
// caseId: "08070994d0f647cf"//*********案件号 */ 一
// checkFlag: ""//查阅标识、、  
// compIndust: ""//所属行业
// compLicCode: "24342345"//**********营业执照代码 */
// compLinkName: ""//*****************企业联系人姓名 */
// compLinkPhone: "2345423"//**********企业联系人电话 */
// compProf: ""//*********企业简介 */
// compType: ""//公司类型、、
// coreBuyType: ""//核心买方属于  
// createTime: "2019-06-01T09:10:27.000+0000"/**创建日期 */
// credPromt: "a,b,c,d"//增信方案
// curAnuSales: "0"//现有年销售额
// custNm: "名称1"/**客户名称 */
// custNo: "客户号码1"/**客户号码 */
// estabYears: ""//**、、、、、、、、、、、、、 建立年限*/ 建立年限
// financMaturi: "b"//申请融资期限(月)
// financRateAccept: ""//最高可接受年利率
// grosMargScop: "b" //业务毛利范围 
// guardFlag: ""//是否担保
// loanAmt: "1000"/***贷款金额 */
// loanPurp: ""/**贷款目的 */
// payForm: "a"//付款方式
// repaySource: ""//还款来源
// setlReconcil: ""//结算对账
// subBank: ""//、、、、、、、、、、、、、、、、、、、、/** 所属银行*/所属银行
// subOrg: ""//////////////////////////////////////////////所属机构
// taxGrade: ""//纳税级别
// tradContrc: "" //贸易合同  
// updateTime: "2019-06-01T09:10:27.000+0000"//创建时间