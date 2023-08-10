import { createRedis } from 'alemon-redis'
// 不传入配置地址,默认读取config/redis.yaml
export const redisA = createRedis()
// 传入参数
export const redisC = createRedis({
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 1
})
