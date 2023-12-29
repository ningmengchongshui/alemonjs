import 'afloat/utils/logs'
import 'afloat/utils/pkg'
import 'afloat/utils/version'
import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['a.*.{ts,js}', 'apps']
    // env 自动识别 .env文件
    // 关闭 data 监听打印,请删除.env
  }
})
