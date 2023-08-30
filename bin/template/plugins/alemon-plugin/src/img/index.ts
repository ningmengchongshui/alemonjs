import { createPicture } from 'alemon'
import { DirPath, AppName } from '../../app.config.js'
/**
 * @param directory 文件
 * @param data 数据
 * @returns
 */
export const obtainingImages = async (
  directory: string,
  data: object
): Promise<string | false | Buffer> =>
  await createPicture({
    AppName, // 插件名
    tplFile: `${DirPath}${directory}`,
    data
  }).catch(err => {
    console.log(err)
    return false
  })
