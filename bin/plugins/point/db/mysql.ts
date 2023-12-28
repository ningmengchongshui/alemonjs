import { getBotConfigByKey } from 'alemonjs'
import { Sequelize } from 'sequelize'
const MDB = getBotConfigByKey('mysql')
export const sequelize = new Sequelize(
  process.env?.POINT_MYSQL_DATABASE ?? MDB?.database,
  process.env?.POINT_MYSQL_USER ?? MDB?.user,
  process.env?.POINT_MYSQL_PASSWORD ?? MDB?.password,
  {
    host: process.env?.POINT_MYSQL_HOST ?? MDB?.host,
    port: Number(process.env?.POINT_MYSQL_PROT ?? MDB?.port),
    dialect: 'mysql',
    logging: false // 禁用日志记录
  }
)
export const TableConfig = {
  freezeTableName: true, //不增加复数表名
  createdAt: false, //去掉
  updatedAt: false //去掉
}
export { Op, literal } from 'sequelize'