import { plugin, Messagetype } from 'alemon'
export class msg extends plugin {
  constructor() {
    super({
      dsc: '开发简单示例演示',
      rule: [
        {
          reg: /^\/数组信息$/,
          fnc: 'getArrMsg'
        }
      ]
    })
  }
  /**
   * 指令方法
   * @param e 消息对象
   * @returns
   */
  async getArrMsg(e: Messagetype): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(['123\n', '456', '789']).catch(err => {
      console.log(err)
    })
    return false
  }
}
