import { createRedis, Redis as RedisClient } from 'alemon-redis'
// 不传入配置则使用默认参数
export const redisA: RedisClient = createRedis()
// 传入参数
export const redisC: RedisClient = createRedis({
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 1
})
