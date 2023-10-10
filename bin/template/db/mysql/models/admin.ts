import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
/**
 * 数据库模型
 * 与表对应即可直接进行无sql操作
 */
export const admin = <ModelStatic<Model<AdminType>>>sequelize.define(
  'admin',
  {
    // 定义模型属性
    id: {
      type: DataTypes.INTEGER, //int
      primaryKey: true
    },
    type: DataTypes.INTEGER,
    grade: DataTypes.INTEGER,
    account: DataTypes.STRING, // string
    password: DataTypes.STRING,
    doc: DataTypes.STRING
  },
  TableConfig
)
export interface AdminType {
  id: number
  type: number
  grade: number
  account: string
  password: string
  doc: string
}
