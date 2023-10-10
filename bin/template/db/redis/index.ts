/**
 * *******
 * 所有插件皆可使用
 * alemon-redis
 * 会根据alemon匹配
 * 自动创建实例并调用
 * *******
 */
import { createRedis, Redis as RedisClient } from 'alemon-redis'

// 不传入配置则使用alemon配置
export const redis: RedisClient = createRedis()

// 传入参数:插件模式不推荐,推荐使用alemon默认配置
export const redisA: RedisClient = createRedis({
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 1
})
