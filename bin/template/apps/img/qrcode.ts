import { APlugin, AEvent } from 'alemonjs'
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
    const img = await e.segment.qrcode('https://www.baidu.com/')
    if (typeof img != 'boolean') e.reply(['百度一下,你就知道', img])
    return
  }
}
