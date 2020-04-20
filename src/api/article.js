import Request from '@/utils/request'

const baseUrl = 'article/article'

// 文章分页+多条件查询
export function getArticle(params) {
  return Request.post(baseUrl + '/article/search', params)
}

export function countArticle() {
  return Request.get(baseUrl + '/count/article')
}

// 添加文章
export function addArticle(params) {
  return Request.post(baseUrl + '/add/article', params)
}

// 审核文章通过
export function checkArticle(ArticleId) {
  return Request.get(baseUrl + '/check?articleId=' + ArticleId)
}

// 审核文章不通过
export function unCheckArticle(ArticleId) {
  return Request.get(baseUrl + '/unCheck?articleId=' + ArticleId)
}

export function deleteArticle(ArticleId) {
  return Request.get(baseUrl + '/delete?articleId=' + ArticleId)
}
// 审核文章不通过
export function findByArticleId(ArticleId) {
  return Request.get(baseUrl + '/findByArticleId?articleId=' + ArticleId)
}
