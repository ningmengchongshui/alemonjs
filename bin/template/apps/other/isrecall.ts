import { APlugin, AMessage } from 'alemonjs'
export class IsRecall extends APlugin {
  constructor() {
    super({
      dsc: '撤回消息',
      typing: 'DELETE',
      rule: [
        {
          fnc: 'onrecall',
          dsc: '撤回消息',
          doc: '有人撤回就会触发'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async onrecall(e: AMessage) {
    console.info(e.typing, '触发撤回消息')
    return
  }
}
