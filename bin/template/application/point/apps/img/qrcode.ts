import { plugin, AMessage, createQrcode } from 'alemonjs'
export class TestQrcode extends plugin {
  constructor() {
    super({
      dsc: '发送图片',
      rule: [
        {
          reg: /^(#|\/)?百度一下$/,
          fnc: 'baidu',
          dsc: '/百度一下',
          doc: '自己百度吧'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async baidu(e: AMessage): Promise<boolean> {
    const img: false | Buffer = await createQrcode(
      'https://www.baidu.com/'
    ).catch(err => {
      console.log(err)
      return false
    })
    if (img) {
      e.reply('百度一下,你就知道', img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
}
