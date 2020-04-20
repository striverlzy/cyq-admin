import Request from '@/utils/request'

const baseUrl = 'user/user'

// 用户分页+多条件查询
export function getUser(params) {
  return Request.post(baseUrl + '/searchList', params)
}

// 禁用
export function lockUser(userId) {
  return Request.get(baseUrl + '/lock?userId=' + userId)
}


export function countUser() {
  return Request.get(baseUrl + '/count')
}

// 解封
export function unlockUser(userId) {
  return Request.get(baseUrl + '/unlock?userId=' + userId)
}

// 根据Id查询
export function getUserById(userId) {
  return Request.get(baseUrl + '/findById?id=' + userId)
}
