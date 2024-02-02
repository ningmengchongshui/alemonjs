import { createImage, importPath } from 'alemonjs'
const app = importPath(import.meta.url)
// 绑定@的位置
const Image = createImage(app.cwd())
/**
 * 图片发送
 * @param key 路由
 * @param params 数据
 * @returns
 */
export function obtainingImages(KEY: string, params: any) {
  // 创建字符
  Image.create({
    late: KEY,
    data: params
  })
  // 截图
  return Image.screenshot()
}
