/* 实例 */
import { Sequelize } from 'sequelize'
/* 配置 */
export const host = 'localhost' //地址
export const port = 3306 //端口
export const user = 'root' //用户名
export const password = '' //密码
export const database = 'alement' //数据库名
export const sequelize = new Sequelize(database, user, password, { host, port, dialect: 'mysql' })
/* 测试 */
export const mysqlInit = async () => {
  try {
    await sequelize.authenticate().catch(err => {
      console.log(err)
      return false
    })
    console.info('[mysql]', ` OK`)
  } catch (error) {
    console.error(`[mysql] ${error}`)
  }
}
