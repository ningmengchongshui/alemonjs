import { createPicture } from 'alemon'
import { DirPath, AppName } from '../../app.config.js'
/**
 * @param directory 拼接路径
 * @param PageName 文件名
 * @param data 数据
 * @returns
 */
export const obtainingImages = async (
  directory: string,
  PageName: string,
  data: object
): Promise<string | false | Buffer> =>
  await createPicture(
    AppName, // 插件名
    `${DirPath}/resources/html/${directory}/${PageName}.html`, // 模板地址
    directory, // 拼接路径
    PageName, // 文件名
    /** 数据 */
    {
      RootDirectory: `${DirPath}`, // 插件根目录(绝对路径写法)
      ...data
    }
  ).catch(err => {
    console.log(err)
    return false
  })
