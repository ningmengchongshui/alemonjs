import { obtainingImages } from './src/img/index.js'
import { getYaml, getJson, getJsonPath, getYamlPath } from './db/local/config.js'
/**
 * ************
 * 配置管理对象
 * ************
 */
const Config = {
  getYaml,
  getJson,
  getJsonPath,
  getYamlPath
}
/**
 * ****************
 * API管理
 * ****************
 * 实例对象.方法
 * ****************
 */
export { obtainingImages, Config }
