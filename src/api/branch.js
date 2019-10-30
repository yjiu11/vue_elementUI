/**
 * “机构管理”相关接口
 */
import request from '@/utils/request'

export default {
  /**
   * 添加机构
   * @param data
   */
  addBranch(data) {
    return request({
      url: '/sys_branch',
      method: 'post',
      data
    })
  },

  /**
   * 删除机构
   * @param data
   */
  deleteBranch(data) {
    return request({
      url: '/sys_branch',
      method: 'delete',
      data
    })
  },

  /**
   * 查询机构
   * @param queryParam
   * @param pageParam
   */
  queryBranch(queryParam,pageParam) {
    return request({
      url: '/sys_branch/query',
      method: 'post',
      data: {
        ...queryParam,
        current: pageParam.current,
        size: pageParam.size
      }
    })
  },

  /**
   * 更新机构
   * @param data
   */
  updateBranch(data) {
    return request({
      url: '/sys_branch/update',
      method: 'patch',
      data
    })
  },

  /**
   * 查询机构
   * @param queryParam
   * @param pageParam
   */
  queryTreeList(data) {
    return request({
      url: '/sys_branch/treeList',
      method: 'post',
      data
    })
  }

}

