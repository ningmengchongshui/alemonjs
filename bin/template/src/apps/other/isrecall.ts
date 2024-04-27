import { APlugin, type AEvent } from 'alemonjs'
export class IsRecall extends APlugin {
  constructor() {
    super({
      typing: 'DELETE',
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
  async onrecall(e: AEvent) {
    console.info(e.typing, '触发撤回消息')
    return
  }
}
