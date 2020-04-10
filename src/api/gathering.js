import Request from '@/utils/request'

const baseUrl = 'gathering/gathering'

// 活动分页+多条件查询
export function getGathering(params) {
  return Request.post(baseUrl + '/search', params)
}

// 发布活动
export function publishGathering(params) {
  return Request.post(baseUrl + '/publish', params)
}

// 删除活动
export function deleteGathering(gatheringId) {
  return Request.get(baseUrl + '/delete?gatheringId=' + gatheringId)
}

// 修改活动
export function updateGathering(params) {
  return Request.post(baseUrl + '/update', params)
}

// 根据id查询
export function findGathingById(gatheringId) {
  return Request.get(baseUrl + '/findGathingById?gatheringId=' + gatheringId)
}
