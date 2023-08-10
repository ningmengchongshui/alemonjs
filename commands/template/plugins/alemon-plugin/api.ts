import { obtainingImages } from './src/img/index.js'
import { getJson, getJsonPath } from './db/local/config.js'
/**
 * ************
 * 配置管理对象
 * ************
 */
const Config = {
  getJson,
  getJsonPath
}
/**
 * ****************
 * API管理
 * ****************
 * 实例对象.方法
 * ****************
 */
export { obtainingImages, Config }
