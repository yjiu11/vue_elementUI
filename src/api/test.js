/**
 * “融资信息管理”相关接口
 */
import request from '@/utils/request'

export default {
  /**
   * 添加融资信息
   * @param data
   */
  addData(data) {
    return request({
      url: '/vue/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除融资信息
   * @param data
   */
  deleteData(data) {
    return request({
      url: '/vue/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 查询融资信息
   * @param queryParam
   * @param pageParam
   */
  queryList(queryParam,pageParam) {
    return request({
      url: '/vue/queryList',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },
  
  queryList1(queryParam,pageParam) {
	    return request({
	      url: '/vue/queryList1',
	      method: 'post',
	      data: {
	        ...queryParam,
	        current: pageParam.current,
	        size: pageParam.size
	      }
	    })
	  },
  

  /**
   * 更新融资信息
   * @param data
   */
  updateData(data) {
    alert(222)
    return request({
      url: '/vue/update',
      method: 'post',
      data
    })
  }

}

