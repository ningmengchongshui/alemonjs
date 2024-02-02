import { APlugin, type AEvent } from 'alemonjs'
export class TestQrcode extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?百度一下$/,
          fnc: 'baidu'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async baidu(e: AEvent) {
    const segment = e.segment
    const img = await segment.qrcode('https://www.baidu.com/')
    if (typeof img != 'boolean') e.reply(['百度一下,你就知道', img])
    return
  }
}
