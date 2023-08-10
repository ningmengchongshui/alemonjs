import express from 'express'
import { getData } from './data.js'
import { DirPath } from '../app.config.js'
const app = express()
const port = process.argv[2] ?? 3000
// 静态文件
app.use('resources', express.static(`${DirPath}/resources`))

/// 挂载
app.get('/', (req, res) => {
  var html = getData()
  res.send(html)
})

// 监听
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
  console.info(`http://127.0.0.1:${port}`)
})
