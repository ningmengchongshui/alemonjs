import { AlemonOptions } from 'alemonjs'
export const redis: AlemonOptions['redis'] = {
  password: '',
  port: 6379,
  host: '127.0.0.1',
  db: 1
}
export const mysql: AlemonOptions['mysql'] = {
  user: 'root',
  port: 3306,
  password: 'Qq002580!',
  host: 'localhost',
  database: 'alemonjs'
}
