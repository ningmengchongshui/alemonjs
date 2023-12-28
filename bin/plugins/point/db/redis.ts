import { getBotConfigByKey } from 'alemonjs'
import redisClient, { Redis as RedisClient } from 'ioredis'
const RDB = getBotConfigByKey('redis')
function createRedis() {
  const ALRedis = new redisClient({
    host: process.env?.POINT_REDIS_HOST ?? RDB?.host,
    port: Number(process.env?.POINT_REDIS_PORT ?? RDB?.port),
    password: process.env?.POINT_REDIS_PASSWORD ?? RDB?.password,
    db: Number(process.env?.POINT_REDIS_DB ?? RDB?.db ?? 3),
    maxRetriesPerRequest: null
  })
  ALRedis.on('error', (err: any) => {
    console.error('\n[REDIS]', err)
    console.error('\n[REDIS]', '请检查配置')
  })
  return ALRedis
}
export const Redis: RedisClient = createRedis()