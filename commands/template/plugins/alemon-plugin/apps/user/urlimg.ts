import { plugin, Messagetype, segment } from 'alemon'
export class urlimg extends plugin {
  constructor() {
    super({
      dsc: '开发简单示例演示',
      rule: [
        {
          reg: /^\/原神黄历$/,
          fnc: 'getAlmanac'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getAlmanac(e: Messagetype): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(segment.image('https://api.xingzhige.com/API/yshl/')).catch(err => {
      console.log(err)
    })
    return false
  }
}
