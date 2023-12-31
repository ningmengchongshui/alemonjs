import { APlugin, AMessage } from 'alemonjs'
export class TestMessage extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?数组消息$/,
          fnc: 'getArrMsg',
          dsc: '/数组消息',
          doc: '支持数组类型消息'
        }
      ]
    })
  }
  /**
   * 指令方法
   * @param e 消息对象
   * @returns
   */
  async getArrMsg(e: AMessage) {
    e.reply(['123\n', '456', '789'])
    return
  }
}
