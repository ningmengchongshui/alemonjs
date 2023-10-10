/**
 * **********
 * 新建数据库
 * alemonjs
 * 编码选择
 * utf8mb4
 * utf8mb4_general_ci
 * 执行amin.sql
 * **********
 */
import { Sequelize } from 'sequelize'
import { getBotConfigByKey } from 'alemonjs'
/**
 * *****
 * 默认配置
 * *****
 */
let host = '127.0.0.1' //地址
let port = 6379 //端口
let user = 'root' //用户名
let password = 'Qq002580!' //密码
let database = 'alemonjs' //数据库名
/**
 * 读取配置
 */
const mysql = getBotConfigByKey('mysql')
if (mysql) {
  host = mysql.host
  port = mysql.port
  user = mysql.user
  password = mysql.password
  database = mysql.database
}
// 创建实例
export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false // 禁用日志记录
})
export const TableConfig = {
  freezeTableName: true, //不增加复数表名
  createdAt: false, //去掉
  updatedAt: false //去掉
}
