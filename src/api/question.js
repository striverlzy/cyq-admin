import Request from '@/utils/request'

const baseUrl = 'question/question'

// 多条件分页查询
export function getQuestion(params = {
  userId: '',
  userName: '',
  title: '',
  content: '',
  searchState: '1',
  page: null,
  size: null
}) {
  return Request.post(baseUrl + '/question/search', params)
}

export function countQuestion() {
  return Request.get(baseUrl + '/count')
}

// 删除问答
export function deleteQuestion(questionId) {
  return Request.get(baseUrl + '/delete?questionId=' + questionId)
}



