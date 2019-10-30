/**
 * “客户信息管理”相关接口
 */
import request from '@/utils/request'

export default {
  /**
   * 添加客户信息
   * @param data
   */
  addCustInfo(data) {
    return request({
      url: '/fmsBizCustInfo/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除客户信息
   * @param data
   */
  deleteBanCustInfo(data) {
    return request({
      url: '/fmsBizCustInfo/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 查询客户信息
   * @param queryParam
   * @param pageParam
   */
  queryList(queryParam,pageParam) {
    return request({
      url: '/fmsBizCustInfo/queryList',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

  /**
   * 更新客户信息
   * @param data
   */
  updateCustInfo(data) {
    return request({
      url: '/fmsBizCustInfo/update',
      method: 'patch',
      data
    })
  }

}

