import 'afloat/utils/logs'
import 'afloat/utils/pkg'
import 'afloat/utils/version'
import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['a.*.{ts,js}', 'apps', 'apps.ts']
    // env 自动识别 .env文件
  }
})
