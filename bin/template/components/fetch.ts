import queryString from 'query-string'
export function ResServe(url: string, params: any = {}) {
  const query = queryString.stringify(params)
  return fetch(`${url}?${query}`)
    .then(async (res: any) => {
      return await res.json()
    })
    .catch(err => {
      console.log('出错啦', err)
    })
}
