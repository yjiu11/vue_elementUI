<template>
  <div class="editDialog">
    <el-dialog title="修改融资信息" v-dialogDrag ref="dialog__wrapper" :close-on-click-modal="false" @close="calcel()" :visible.sync="basicInfoGroup.dialogAsync" width="800px" :modal-append-to-body="false">
        <el-form  :label-width="basicInfoGroup.labelWidth" class="demo-ruleForm">
            <div>
                <div class="clear"></div>
                <div class="title">企业基本信息:</div>
                <el-col :span="12">
                    <el-form-item label="申请企业名称:">
                        <el-input v-model="basicInfo.custNm" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="统一社会信用代码:">
                        <el-input v-model="basicInfo.custNo" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人姓名:">
                        <el-input v-model="basicInfo.compLinkName" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人电话:">
                        <el-input v-model="basicInfo.compLinkPhone" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属行业:">
                        <el-select v-model="basicInfo.compIndust" placeholder="请选择"  :disabled="disableds" clearable filterable>
                            <el-option v-for="item in jsonName.jsonName.compIndust" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="企业所在区域:">
                        <el-cascader placeholder="请选择" v-model="basicInfo.area1" :disabled="disableds" :options="jsonName.allProvinceCityCount" filterable></el-cascader>
                    </el-form-item>
                </el-col>

                <div class="clear"></div>
                <div class="title">申请融资信息:</div>
                <el-col :span="12">
                    <el-form-item label="申请融资金额(万元):">
                        <el-input v-model="basicInfo.loanAmt" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请融资期限(月):">
                        <!-- <el-select v-model="basicInfo.financMaturi" :disabled="disableds" placeholder="请选择" clearable>
                            <el-option v-for="(i,k) in jsonName.jsonName.financMaturi" :key="k" :label="i.label" :value="i.value"></el-option>
                        </el-select> -->
                        <el-input v-model="basicInfo.financMaturi" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="还款来源:">
                        <el-select v-model="basicInfo.repaySource" :disabled="disableds" placeholder="请选择" clearable>
                            <el-option v-for="(i,k) in jsonName.jsonName.repaySource" :key="k" :label="i.label" :value="i.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="融资目的:">
                        <el-select v-model="basicInfo.loanPurp" placeholder="请选择" clearable :disabled="disableds">
                            <el-option v-for="item in jsonName.jsonName.loanPurp" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="strang">
                    <el-form-item label="可接受年利率(%):">
                        <el-input-number class="number" :disabled="disableds" v-model="basicInfo.num1" :precision="0" :step="1"></el-input-number>
                        至
                        <el-input-number class="number" :disabled="disableds" v-model="basicInfo.num2" :precision="0" :step="1"></el-input-number>
                    </el-form-item>
                </el-col>
                <div class="clear"></div>
                <div class="title">融资产品信息:</div>
                <el-col :span="24">
                    <el-form-item label="产品类型:">
                        <el-select v-model="basicInfo.assetType" disabled placeholder="请选择" clearable>
                            <el-option v-for="(i,k) in assetTypeDropDown" :key="k" :label="i.label" :value="i.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                
                <!-- 、、1应收账款交易、、、、、、、、、、、 -->
                <el-col :span="12">
                    <el-form-item label="买方企业名称:">
                        <el-input v-model="basicInfo.coreComNm" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同金额(万元):">
                        <el-input v-model="basicInfo.accountAmt" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账期（日）:">
                        <el-input v-model="basicInfo.accountDays" :disabled="disableds"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结算方式:">
                      <el-select v-model="basicInfo.setlForm" :disabled="disableds" placeholder="请选择" clearable>
                        <el-option v-for="(items,keys) in jsonName.jsonName.setlForm" :key="keys" :label="items.label" :value="items.value"> </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="付款方式:">
                      <el-select v-model="basicInfo.payForm" :disabled="disableds" placeholder="请选择" clearable>
                        <el-option v-for="(items,keys) in jsonName.jsonName.payForm" :key="keys" :label="items.label" :value="items.value"> </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="antiAssignLabel">
                  <el-form-item label="合同内是否有禁转条款:">
                    <el-radio-group v-model="basicInfo.antiAssign" :disabled="disableds">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="billFlagLabel">
                    <el-form-item label="与交易方贸易往来是否已开具发票:">
                      <el-radio-group v-model="basicInfo.billFlag" :disabled="disableds">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                 <!-- 、、1应收账款交易 结束、、、、、、、、、、、 -->
                <el-col :span="24">
                    <el-form-item label="增信措施:">
                        <el-checkbox-group v-model="basicInfo.credPromt" :disabled="disableds">
                            <el-checkbox v-for="(items,keys) in jsonName.jsonName.credPromt"  :label="items.value" :key="keys">
                                {{items.label}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="margin-top:20px;">
                    <el-form-item label="是否接受第三方担保:">
                        <el-radio-group v-model="basicInfo.guardFlag" :disabled="disableds">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col> 

                <div class="clear"></div>
                <div class="title">上传资料信息:</div>  
               
                 <el-col :span="12">
                    <el-col :span="8" style="text-align:left;">法人身份证：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"  
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess3" :file-list="uploadImg.fileList3"  accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">上传法人身份证</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('idUrl')">查看</span><span class="checkImg" v-if="urlParams.idUrl">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">法人身份证反面：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"  
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess4" :file-list="uploadImg.fileList4"  accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">身份证反面</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('idUrlBack')">查看</span><span class="checkImg" v-if="urlParams.idUrlBack">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="8" style="text-align:left;">营业执照：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess1" :file-list="uploadImg.fileList1"  accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">上传营业执照</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('licUrl')">查看</span><span class="checkImg" v-if="urlParams.licUrl">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">机构信用代码：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess2" :file-list="uploadImg.fileList2"   accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">上传机构信用代码</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('orgCreditCodeUrl')">查看</span><span class="checkImg" v-if="urlParams.orgCreditCodeUrl">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">公司章程：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess5" :file-list="uploadImg.fileList5"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传公司章程</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('compByelaw')">查看</span><span class="checkImg" v-if="urlParams.compByelaw">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">实控人身份证：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess6" :file-list="uploadImg.fileList6"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传实控人身份证</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('controllerIdCard')">查看</span><span class="checkImg" v-if="urlParams.controllerIdCard">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;">
                    <el-col :span="8" style="text-align:left;">发票流水：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess7" :file-list="uploadImg.fileList7"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传发票流水</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('billList')">查看</span><span class="checkImg" v-if="urlParams.billList">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;">
                    <el-col :span="8" style="text-align:left;">纳税等级截图：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess8" :file-list="uploadImg.fileList8"   accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">上传纳税等级截图</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('payTaxesGrade')">查看</span><span class="checkImg" v-if="urlParams.payTaxesGrade">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">银行账户流水：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess9" :file-list="uploadImg.fileList9"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传银行账户流水</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('bankDealList')">查看</span><span class="checkImg" v-if="urlParams.bankDealList">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">公司财务报表：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess10" :file-list="uploadImg.fileList10"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传公司财务报表</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('financialTatement')">查看</span><span class="checkImg" v-if="urlParams.financialTatement">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">增值税申报表：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess11" :file-list="uploadImg.fileList11"   accept=".jpg,.png">
                            <el-button size="small" :disabled="disableds" type="primary">上传增值税申报表</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBig('dutyForm')">查看</span><span class="checkImg" v-if="urlParams.dutyForm">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">贸易合同：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess12" :file-list="uploadImg.fileList12"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传贸易合同</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('tradeContract')">查看</span><span class="checkImg" v-if="urlParams.tradeContract">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">交易单据：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess13" :file-list="uploadImg.fileList13"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传交易单据</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('transactionNote')">查看</span><span class="checkImg" v-if="urlParams.transactionNote">已上传</span>
                    </el-col>
                </el-col>
                 <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">法人/实控人征信报告：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess14" :file-list="uploadImg.fileList14"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传法人/实控人征信报告</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('controllerCreditReport')">查看</span><span class="checkImg" v-if="urlParams.controllerCreditReport">已上传</span>
                    </el-col>
                </el-col>
                 <el-col :span="12" style="margin-top:60px;">
                    <el-col :span="8" style="text-align:left;">企业征信报告：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess15" :file-list="uploadImg.fileList15"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传企业征信报告</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('compCreditReport')">查看</span><span class="checkImg" v-if="urlParams.compCreditReport">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">资产佐证：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :disabled="disableds" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess16" :file-list="uploadImg.fileList16"   accept=".PDF,.pdf">
                            <el-button size="small" :disabled="disableds" type="primary">上传资产佐证</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('assetEvidence')">查看</span><span class="checkImg" v-if="urlParams.assetEvidence">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;" v-if="hiddenCols">
                    <el-col :span="8" style="text-align:left;">账款信息：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" disabled :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg"  :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess17" :file-list="uploadImg.fileList17"   accept=".PDF,.pdf">
                            <el-button size="small" disabled type="primary">上传账款信息</el-button>
                        <div slot="tip" class="el-upload__tip">只能查看文件</div>
                        </el-upload>
                        <span class="checkImg" @click="checkBigWJ('accountMoneyUrl')">查看</span><span class="checkImg" v-if="urlParams.accountMoneyUrl">已上传</span>
                    </el-col>
                </el-col>
                <el-col :span="12" style="margin-top:60px;">
                    <el-col :span="8" style="text-align:left;">其他资料：</el-col>
                    <el-col :span="16">
                        <el-upload class="upload-demo" :action="`${apiAjax.getBaseUrl().baseURL}${action1}`"
                        :before-upload="beforeUploadImg" disabled :on-error="uploadImgErro" :on-exceed="handleExceed" :limit="1"
                        :on-success="uploadImgSuccess18" :file-list="uploadImg.fileList18"   accept=".zip,.rar">
                            <el-button size="small" disabled type="primary">上传其他资料</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传zip/rar压缩文件</div>
                        </el-upload>
                        <span class="checkImg" @click="downLoad('otherFiles')">下载</span><span class="checkImg" v-if="urlParams.otherFiles">已上传</span>
                    </el-col>
                </el-col>
                
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="calcel()">取 消</el-button>
            <el-button type="primary" @click="saveFn()" v-if="asyncIf">保存</el-button>
        </div>

        <!-- <div class="bigImgBox" v-if="ifBig" :style="{width:bodyWidth,height:bodyHeight}">
            <div class="shadowBox"></div>
            <img :src="bigImg" />
            <div class="close" @click="closeFn">X</div>
        </div> -->
        <el-dialog title="文件查看" v-dialogDrag ref="dialog__wrapper" :close-on-click-modal="false" :visible.sync="checkWJ" width="1100px" :modal="false">
            <div class="wjBox">
                <iframe class="iframeWJ" :src="wjSrc"></iframe>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="calcelWJ">取 消</el-button>
            </div>
        </el-dialog>

        <div class="bigImgBox" v-if="ifBig">
            <div style="" class="BigImgs" @mousedown="move">
                <div class="close" @click="closeFn">X</div>
                <img :src="bigImg" style="cursor:default;" />
            </div>
        </div>
    </el-dialog>
    

  </div>
</template>

<script>

export default {
    name: 'editDialogGroup',
    data() {
      return {
          disableds:true,
          asyncIf:false,
          hiddenCols:false,
          lockScroll:false,
        checkWJ:false,
        wjSrc:"",
        bodyWidth:"",
        bodyHeight:"",
        ruleForm:{},
        countyDrop:[],
        cityDrop:[],
        action1:"/fmsBizImageInfo/upload",
        uploadImg:{
            fileList1:[],
            fileList2:[],
            fileList3:[],
            fileList4:[],
            fileList5:[],
            fileList6:[],
            fileList7:[],
            fileList8:[],
            fileList9:[],
            fileList10:[],
            fileList11:[],
            fileList12:[],
            fileList13:[],
            fileList14:[],
            fileList15:[],
            fileList16:[],
            fileList17:[],
            fileList18:[],
        },
        uploadFile:{
            loading:false,
        },
        ifBig:false,
        bigImg:"",
        urlParams: {
            licUrl: null,//营业执照 1
            orgCreditCodeUrl:null,//机构信用代码 2
            idUrl: null,//法人身份证正面 3
            idUrlBack: null,//法人身份证反面 4
            compByelaw:null,//公司章程 5
            controllerIdCard:null,//实控人身份证 6
            billList:null,//发票流水 7
            payTaxesGrade:null,//纳税等级截图 8
            bankDealList:null,//银行账户流水 9
            financialTatement:null,//公司财务报表 10
            dutyForm:null,//增值税申报表 11
            tradeContract:null,//贸易合同 12
            transactionNote:null,//交易单据 13
            controllerCreditReport:null,//法人/实控人征信报告 14
            compCreditReport:null,//企业征信报告 15
            assetEvidence:null,//资产佐证 16 
            accountMoneyUrl:null,//账款信息 17
            otherFiles:null,//其他文件 18
        },

        // radio:"",
        
        basicInfo:{
            custNm:"",//申请企业名称
            custNo:"",//统一社会信用代码
            compLinkName:"",//联系人姓名
            compLinkPhone:"",//联系人电话
            compIndust:"",//所属行业
            area1:[],//企业所在区域
            // province:"",//省/市
            // city:"",//市/区
            // county:"",//县/街
            // 、、、、、、、、、、、、、、、、、、、、、、
            loanAmt:"",//申请融资金额(万元)
            financMaturi:"",//申请融资期限(月)////
            // financRateAccept:"",//可接受年利率(%)////
            num1:"0",
            num2:"0",
            loanPurp:"",//融资目的
            repaySource:"",//还款来源//
            ///......................................
            assetType:"",//资产类型//
            credPromt:[],//增信措施//
            guardFlag:"",//是否接受第三方担保  //单选框
            billFlag:"",//与交易方贸易往来是否已开具发票:
            // 1.应收账款
            coreComNm:"",//买方企业名称
            accountAmt:"",//合同金额(万元)
            accountDays:"",//账期
            payForm:"",//付款方式//
            setlForm:"",//结算方式
            antiAssign:"",//合同内是否有禁转条款
            
        },
        assetTypeDropDown:[
              {label:"应收账款融资",value:"a"},
              {label:"个人住房",value:"b"},
              {label:"银票",value:"c"},
              {label:"商票",value:"d"},
              {label:"机器/设备",value:"e"},
              {label:"信用",value:"f"},
              {label:"其他",value:"g"},
            ]
      }
    },
    props: {
        basicInfoGroup:Object,
    },
    watch: {
        "basicInfoGroup.dialogAsync":{//弹框弹出
            handler(to) {
                if (to){
                    console.log(111,this.basicInfo.isModify)
                }else{
                    console.log(22222)
                }
            }
        },
        "basicInfoGroup.isModify":{
            handler(to) {//编辑
                console.log(999999999,this.basicInfoGroup)
                to && this.init();
            }
        },
    },
    computed: {
    },
    created() {
        this.bodyWidth = document.body.clientWidth + 'px';
        this.bodyHeight = document.body.clientHeight + 'px';
    },
    methods: {
         move(e){
            let odiv = e.target;        //获取目标元素
            
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;
                
                //绑定元素位置到positionX和positionY上面
                this.positionX = top;
                this.positionY = left;
                
                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        checkBigWJ(num){
             for(let i in this.urlParams){
              if(i==num){
                if(!this.urlParams[i]){
                  this.$message.error('该文件未上传，请重新上传！');
                }else{
                  let src = this.apiAjax.getBaseUrl().baseURL+ '/' + this.urlParams[i];
                //   console.log(src)
                //   this.checkWJ = true;
                //   this.wjSrc = src;
                  window.open(src);
                }
              }
            }
        },
        calcelWJ(){
            this.checkWJ = false;
            this.wjSrc = "";
            
        },
        checkBig(num){
            for(let i in this.urlParams){
              if(i==num){
                if(!this.urlParams[i]){
                  this.$message.error('该图片未上传，请重新上传！');
                }else{
                  let src = this.apiAjax.getBaseUrl().baseURL+ '/' + this.urlParams[i];
               
                    // this.ifBig = true;
                    // this.bigImg = src;
                    let routeData = this.$router.resolve({
                        name: "img",
                        query: {
                            src:src
                        }
                    });
                    window.open(routeData.href, '_blank');
                }
              }
            }
        },
        downLoad(num){
            for(let i in this.urlParams){
              if(i==num){
                if(!this.urlParams[i]){
                  this.$message.error('该文件未上传，请重新上传！');
                }else{
                  let src = this.apiAjax.getBaseUrl().baseURL+ '/' + this.urlParams[i];
                  window.open(src);
                  // this.checkWJ = true;
                  // this.wjSrc = src;
                }
              }
            }
        },
        closeFn(){
            this.ifBig = false;
            this.bigImg = "";
        },
        handleExceed(files, fileList) {
          this.$message.error("只能上传一个文件，如果想重新上传，请删除下面的文件！");
        },
        beforeUploadImg(file){
          console.log(file,"上传之前");
          this.uploadFile.loading = this.$loading({lock: true,text: '正在上传图片',
            spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
        },
        uploadImgSuccess1(response, file, fileList){
            this.getSuccess("licUrl",response);
        },
        uploadImgSuccess2(response, file, fileList){
            this.getSuccess("orgCreditCodeUrl",response);
        },
        uploadImgSuccess3(response, file, fileList){
            this.getSuccess("idUrl",response);
        },
        uploadImgSuccess4(response, file, fileList){
            this.getSuccess("idUrlBack",response);
        },
        uploadImgSuccess5(response, file, fileList){
            this.getSuccess("compByelaw",response);
        },
        uploadImgSuccess6(response, file, fileList){
            this.getSuccess("controllerIdCard",response);
        },
        uploadImgSuccess7(response, file, fileList){
            this.getSuccess("billList",response);
        },
        uploadImgSuccess8(response, file, fileList){
            this.getSuccess("payTaxesGrade",response);
        },
        uploadImgSuccess9(response, file, fileList){
            this.getSuccess("bankDealList",response);
        },
        uploadImgSuccess10(response, file, fileList){
            this.getSuccess("financialTatement",response);
        },
        uploadImgSuccess11(response, file, fileList){
            this.getSuccess("dutyForm",response);
        },
        uploadImgSuccess12(response, file, fileList){
            this.getSuccess("tradeContract",response);
        },
        uploadImgSuccess13(response, file, fileList){
            this.getSuccess("transactionNote",response);
        },
        uploadImgSuccess14(response, file, fileList){
            this.getSuccess("controllerCreditReport",response);
        },
        uploadImgSuccess15(response, file, fileList){
            this.getSuccess("compCreditReport",response);
        },
        uploadImgSuccess16(response, file, fileList){
            this.getSuccess("assetEvidence",response);
        },
        uploadImgSuccess17(response, file, fileList){
            this.getSuccess("accountMoneyUrl",response);
        },
        uploadImgSuccess18(response, file, fileList){
            this.getSuccess("otherFiles",response);
        },
        getSuccess(name,response){
          this.urlParams[name]=response.data;
          this.$message.success({message: '上传成功'});
          this.uploadFile.loading.close();
        },
        uploadImgErro(err, file, fileList){
          console.log(err, file, fileList,222)
          this.$message.error('上传失败！');
          this.uploadFile.loading.close();
        },
        toprovince(num){//省1 市2 县3 做级联
            if(num==1){
                this.basicInfo.city = "";
                this.basicInfo.county = "";
                this.countyDrop = [];
                this.cityDrop = [];
                this.getCity(this.basicInfo.province);
            }else if(num==2){
                this.basicInfo.county = "";
                this.countyDrop = [];
                this.getCounty(this.basicInfo.city);
            }else if(num==3){
                console.log(3)
            }
        },
        getCity(id){
            this.apiAjax.post("/sysArea/queryList",{pid:id}).then((res) => {
            this.cityDrop = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        getCounty(id){
            this.apiAjax.post("/sysArea/queryList",{pid:id}).then((res) => {
            this.countyDrop = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        init(){
            console.log(this.basicInfoGroup,"bascinddd")
            for(let i in this.basicInfo){
                if(i=='area1'){
                    let array = [];
                    array.push(this.basicInfoGroup.currentRow['provinceCode']);
                    array.push(this.basicInfoGroup.currentRow['cityCode']);
                    array.push(this.basicInfoGroup.currentRow['countyCode']);
                    this.basicInfo[i] = array;
                    continue;
                }else if(i=='credPromt'){
                    this.basicInfo[i] = this.basicInfoGroup.currentRow['credPromt'].split(",");
                    continue;
                }else if(i == 'num1'){
                    this.basicInfo[i] = this.basicInfoGroup.currentRow['financRateAccept']?this.basicInfoGroup.currentRow['financRateAccept'].split("-")[0]:"";
                    continue;
                }else if(i == 'num2'){
                    this.basicInfo[i] = this.basicInfoGroup.currentRow['financRateAccept']?this.basicInfoGroup.currentRow['financRateAccept'].split("-")[1]:"";
                    continue;
                }
                for (let index in this.basicInfoGroup.currentRow) {
                    if(i == index){
                        this.basicInfo[i] = String(this.basicInfoGroup.currentRow[index]);
                    }
                }
            }
            for(let j in this.urlParams){
                for (let i in this.basicInfoGroup.currentRow) {
                    if(i == j){
                        this.urlParams[j] = this.basicInfoGroup.currentRow[i];
                    }
                }
            }
            console.log(this.urlParams)
        },
        saveFn(){
            let valid = this.valid();
            if(!valid){
                return;
            }
            let parames = Object.assign({},this.basicInfo);
            parames.province = this.basicInfo.area1[0]?this.basicInfo.area1[0]:"";
            parames.city = this.basicInfo.area1[1]?this.basicInfo.area1[1]:"";
            parames.county = this.basicInfo.area1[2]?this.basicInfo.area1[2]:"";
            parames.credPromt = this.basicInfo.credPromt.join(",");
            parames.financRateAccept = this.basicInfo.num1+'-'+this.basicInfo.num2;
            parames.caseId = this.basicInfoGroup.currentRow.caseId;
            delete parames['area1'];
            delete parames['num1'];
            delete parames['num2'];
            
            // for(let i in this.urlParams){
            //     parames[i] = this.urlParams[i];
            // }
            parames.licUrl = this.urlParams.licUrl;
            parames.idUrl= this.urlParams.idUrl;
            // parames.idUrlBack= this.urlParams.idUrlBack;
            parames.compCreditReport= this.urlParams.compCreditReport;
            parames.billList= this.urlParams.billList;
            parames.payTaxesGrade= this.urlParams.payTaxesGrade;
            parames.otherFiles= this.urlParams.otherFiles;
            this.apiAjax.post("/fmsBizCaseInfo/update",parames).then((res) => {
                this.$message({ showClose: true, message: "保存成功",type: 'success' });
                this.calcel();
                this.$emit("update");
                console.log(res,"11111111111111");
            }).catch(() => {
                console.log("联系管理员")
            });
        },
        calcel(){
            this.$nextTick(()=>{
                // this.$refs[formName].resetFields();
                // this.$emit("update");
                this.clear();
                this.$emit("on-cancel");
                 // 、、、、、、、、、、、关闭大图
                this.ifBig = false;
                this.booleans = false;
                this.bigImg = "";
                ////////////////////////////////////////结束
            })
            
        },
        clear(){
            for(let i in this.basicInfo){
                if(i == 'area1' || i =='credPromt'){
                     this.basicInfo[i] = [];
                }else{
                    this.basicInfo[i] = "";
                }
            }
            for(let i in this.uploadImg){
                this.uploadImg[i] = [];
            }
            for(let i in this.urlParams){
                this.urlParams[i] = null;
            }
        },
        valid(){
            if(!this.basicInfo.custNm){
                this.$message.error('申请企业名称不能为空！');return false;
            }
            if(!this.basicInfo.custNo){
                this.$message.error('统一社会信用代码不能为空！');return false;
            }
            if(!this.basicInfo.compLinkName){
                this.$message.error('联系人姓名不能为空！');return false;
            }
            if(!this.basicInfo.compLinkPhone){
                this.$message.error('联系人电话不能为空！');return false;
            }
            if(!this.basicInfo.compIndust){
                this.$message.error('所属行业不能为空！');return false;
            }
            if(this.basicInfo.area1.length==0){
                this.$message.error('企业所在区域不能为空！');return false;
            }
            if(!this.basicInfo.loanAmt){
                this.$message.error('申请融资金额不能为空！');return false;
            }
            if(!this.basicInfo.financMaturi){
                this.$message.error('申请融资期限不能为空！');return false;
            }
            if((this.basicInfo.num1 != 0 && this.basicInfo.num2 != 0) && (!this.basicInfo.num1 || !this.basicInfo.num2)){
                this.$message.error('可接受年利率不能为空！');return false;
            }
            if(Number(this.basicInfo.num1)>Number(this.basicInfo.num2)){
                this.$message.error('可接受年利率范围有误，后者必须大于前者！');return false;
            }
            if(!this.jsonName.valiNum(this.basicInfo.num1,0) || !this.jsonName.valiNum(this.basicInfo.num2,0)){
                this.$message.error('可接受年利率只能为整数！');return false;
            }
            if(!this.basicInfo.loanPurp){
                this.$message.error('融资目的不能为空！');return false;
            }
            if(!this.basicInfo.repaySource){
                this.$message.error('还款来源不能为空！');return false;
            }
            if(!this.basicInfo.assetType){
                this.$message.error('产品类型不能为空！');return false;
            }
            // if(this.basicInfo.credPromt.length==0){
            //     this.$message.error('增信措施不能为空！');return false;
            // }

            if(!this.basicInfo.guardFlag){
                this.$message.error('是否接受第三方担保不能为空！');return false;
            }
            if(!this.basicInfo.billFlag){
                this.$message.error('与交易方贸易往来是否已开具发票不能为空！');return false;
            }
            if(!this.basicInfo.coreComNm){
                this.$message.error('买方企业名称不能为空！');return false;
            }
            if(!this.basicInfo.accountAmt){
                this.$message.error('合同金额不能为空！');return false;
            }
            if(!this.basicInfo.accountDays){
                this.$message.error('账期不能为空！');return false;
            }
            if(!this.basicInfo.payForm){
                this.$message.error('付款方式不能为空！');return false;
            }
            if(!this.basicInfo.setlForm){
                this.$message.error('结算方式不能为空！');return false;
            }
            if(!this.basicInfo.antiAssign){
                this.$message.error('合同内是否有禁转条款不能为空！');return false;
            }
            // console.log(this.urlParams,'paramesurl')
            if(!this.urlParams.licUrl){
                this.$message.error('请上传营业执照！');return false;
            }
            // if(!this.urlParams.idUrlBack){
            //     this.$message.error('请上传法人身份证反面！');return false;
            // }
            if(!this.urlParams.idUrl){
                this.$message.error('请上传法人身份证！');return false;
            }
            // if(!this.urlParams.orgCreditCodeUrl){
            //     this.$message.error('请上传机构信用代码！');return false;
            // }
            // if(!this.urlParams.compByelaw){
            //     this.$message.error('请上传公司章程！');return false;
            // }
            // if(!this.urlParams.controllerIdCard){
            //     this.$message.error('请上传实控人身份证！');return false;
            // }
            if(!this.urlParams.billList){
                this.$message.error('请上传发票流水！');return false;
            }
            if(!this.urlParams.payTaxesGrade){
                this.$message.error('请上传纳税等级截图！');return false;
            }

            // if(!this.urlParams.bankDealList){
            //     this.$message.error('请上传银行账户流水！');return false;
            // }
            // if(!this.urlParams.financialTatement){
            //     this.$message.error('请上传公司财务报表！');return false;
            // }
            // if(!this.urlParams.dutyForm){
            //     this.$message.error('请上传增值税申报表！');return false;
            // }
            // if(!this.urlParams.tradeContract){
            //     this.$message.error('请上传贸易合同！');return false;
            // }

            // if(!this.urlParams.transactionNote){
            //     this.$message.error('请上传交易单据！');return false;
            // }
            // if(!this.urlParams.controllerCreditReport){
            //     this.$message.error('请上传法人/实控人征信报告！');return false;
            // }
            if(!this.urlParams.compCreditReport){
                this.$message.error('请上传企业征信报告！');return false;
            }
            // if(!this.urlParams.otherFiles){
            //     this.$message.error('请上传其他资料！');return false;
            // }
            // if(!this.urlParams.assetEvidence){
            //     this.$message.error('请上传资产佐证！');return false;
            // }
            return true;
        },
    }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
.upload-demo button{
    width:160px!important;
}
// .close{
//     width:30px;
//     height:30px;
//     position:absolute;
//     right:30px;
//     top:0;
//     font-size:28px;
//     text-align:center;
//     line-height:30px;
//     color:white;
//     cursor: pointer;
// }
// .bigImgBox{
//     position:fixed;
//     left:0;
//     top:0;
// }
.shadowBox{
    width:100%;
    height:100%;
    opacity:0.5;
    background:#000000;
}
// .bigImgBox img{
//     position:absolute;
//     left:50%;
//     top:50%;
//     transform: translate(-50%,-50%);
//     max-width:90%;
//     max-height:95%;
// }
// .strang 
.editDialog{
    .checkImg{
        color:#2782B0;
        margin-left:20px;
        cursor:pointer;
    }
    .clear{
        clear:both;
    }
    .title{
        width:100%;
        height:30px;
        font-weight:bolder;
        font-size:16px;
        color:#2782B0;
    }
    .el-dialog{
        border-radius: 10px!important;
    }
    .el-dialog__body{
        display: table!important;
    }
    .el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
        font-weight:normal!important
    }
    .el-input--medium .el-input__inner{
        width:220px;
    }
    .el-form-item{
        height: 40px;
    }
    .el-dialog__header{
        font-weight:bolder;
    }
}


.bigImgBox{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        top:0;
        overflow:auto;
        // z-index:999999999999;
        z-index:-1;
        .el-dialog{
            margin-top:40px;
            box-shadow:none!important;
            top:0;
            margin-right:0!important;
            right:0!important;
            background:none!important;
            .el-dialog__headerbtn .el-dialog__close{
                color:white;
                font-weight:bolder;
                font-size:20px;
            }
        }
        .el-dialog__body{
            width:100%!important;
        }
        .imgBox{
            background:#000000;
            opacity:0.7;
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0;
        }
        .BigImgs{
            max-width:90%;
            position:absolute;
            right:30px;
            top:0;
            padding-top:50px;
            display:table;
            background:#A9180A;
            cursor:move;
            img{
                width:100%;
            }
        }
        .close{
            position:absolute;
            right:20px;
            top:0;
            width:30px;
            height:30px;
            font-weight:bolder;
            color:white;
            font-size:20px;
            text-align:center;
            line-height:30px;
            cursor:pointer;
        }
    }
</style>
<style>
.editDialog .number .el-input--medium .el-input__inner{
  width:130px!important;
}
.editDialog .el-input-number--medium{
    z-index:0;
  width:130px!important;
}
.billFlagLabel .el-form-item__label{
  width:220px!important;
}
.antiAssignLabel  .el-form-item__label{
  width:180px!important;
}
.editDialog .el-checkbox__input{
    z-index:0!important;
}
.wjBox{
    width:100%;
    height:500px;
}
.iframeWJ{
    width:1050px;
    height:100%;
}
</style>
