import { createAlemon } from 'alemon-qq'
// import ffmpegDownload from 'alemon-ffmpeg'
// await ffmpegDownload()
await createAlemon().catch(err => {
  console.log('启动失败~', err)
  return
})

// 监听退出,防止ts-node退出报错
process.on('SIGINT', signals => {
  console.log(signals)
  if (process.pid) {
    process.exit()
  }
  return
})
