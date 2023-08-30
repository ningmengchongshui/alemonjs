import { plugin, AMessage, getUrlbuffer } from 'alemon'
export class TestUrl extends plugin {
  constructor() {
    super({
      dsc: '开发简单示例演示',
      rule: [
        {
          reg: /^\/原神黄历$/,
          fnc: 'getAlmanac',
          dsc: '/柠檬帮助',
          doc: '获取所有指令'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getAlmanac(e: AMessage): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(await getUrlbuffer('https://api.xingzhige.com/API/yshl/')).catch(err => {
      console.log(err)
    })
    return false
  }
}
