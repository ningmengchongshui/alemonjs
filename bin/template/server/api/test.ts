/**
 * 接口示例
 */
export default defineEventHandler(async event => {
  const query = getQuery(event)
  console.log('query=', query)
  return {
    status: 200,
    msg: '请求成功',
    body: {
      data: query
    }
  }
})
