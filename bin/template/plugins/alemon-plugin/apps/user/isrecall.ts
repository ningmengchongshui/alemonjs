import { plugin, Messagetype, EventType } from 'alemon'
export class isrecall extends plugin {
  constructor() {
    super({
      dsc: '撤回消息',
      eventType: EventType.DELETE,
      rule: [
        {
          fnc: 'onrecall'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async onrecall(e: Messagetype): Promise<boolean> {
    console.info(e.eventType, '触发撤回消息')
    return false
  }
}
