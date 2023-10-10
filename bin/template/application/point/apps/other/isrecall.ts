import { plugin, AMessage } from 'alemon'
export class IsRecall extends plugin {
  constructor() {
    super({
      dsc: '撤回消息',
      eventType: 'DELETE',
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
  async onrecall(e: AMessage): Promise<boolean> {
    console.info(e.eventType, '触发撤回消息')
    return false
  }
}
