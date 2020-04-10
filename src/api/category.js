import Request from '@/utils/request'

const baseUrl = 'article/category'

// 标签分页+多条件查询
export function getCategory(params) {
  return Request.post(baseUrl + '/category/search', params)
}

// 添加标签
export function addCategory(params) {
  return Request.post(baseUrl + '/add/category', params)
}

// 删除标签
export function deleteCategory(categoryId) {
  return Request.get(baseUrl + '/delete/category?categoryId=' + categoryId)
}

// 修改标签
export function updateCategory(params) {
  return Request.post(baseUrl + '/update/category', params)
}

// 禁用标签
export function lockCategory(categoryId) {
  return Request.get(baseUrl + '/lock?categoryId=' + categoryId)
}

// 解封标签
export function unlockCategory(categoryId) {
  return Request.get(baseUrl + '/unlock?categoryId=' + categoryId)
}

// 解封标签
export function findByCategoryId(categoryId) {
  return Request.get(baseUrl + '/findByCategoryId?categoryId=' + categoryId)
}


export function getAllCategory(categoryId) {
  return Request.get(baseUrl + '/getcategory')
}
