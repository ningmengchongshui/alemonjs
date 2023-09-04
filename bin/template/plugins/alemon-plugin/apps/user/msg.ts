import { plugin, AMessage } from 'alemon'
export class TestMessage extends plugin {
  constructor() {
    super({
      dsc: '开发简单示例演示',
      rule: [
        {
          reg: /^(#|\/)数组消息$/,
          fnc: 'getArrMsg',
          dsc: '/数组消息',
          doc: '数组类型消息也是支持的'
        }
      ]
    })
  }
  /**
   * 指令方法
   * @param e 消息对象
   * @returns
   */
  async getArrMsg(e: AMessage): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(['123\n', '456', '789']).catch(err => {
      console.log(err)
    })
    return false
  }
}
