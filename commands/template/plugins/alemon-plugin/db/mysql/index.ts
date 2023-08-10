/* 实例 */
import { Sequelize, DataTypes, Model } from 'sequelize'
/* 配置 */
import { database, user, password, host, port } from './config.js'
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
export { DataTypes, Model }
