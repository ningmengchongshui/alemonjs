import { APlugin, AEvent } from 'alemonjs'
export class TestMessage extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?数组消息$/,
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
  async getArrMsg(e: AEvent) {
    e.reply(['123\n', '456', '789'])
    return
  }
}
