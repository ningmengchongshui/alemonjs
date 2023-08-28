import { plugin, Messagetype } from 'alemon'
/**
 * 当私聊机器人超过三次时,
 * 机器人仍未回复消息,立即会被频道禁止
 * 频道拒绝用户向该机器人发送消息
 * 除非机器人主动在子频道中开通私信并回复消息才能接触禁止状态~
 * 此时要注意频道主允许机器人主动私聊
 */
export class groupme extends plugin {
  constructor() {
    super({
      /* 说明集*/
      dsc: '指令用法示范',
      /* 指令集 */
      rule: [
        {
          reg: /^\/私聊我$/,
          fnc: 'isGroup'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async isGroup(e: Messagetype): Promise<boolean> {
    /* 公信转私信 */
    const is = await e.replyPrivate('私聊你了哟~').catch(err => {
      console.log(err)
      return false
    })
    if (!is)
      e.reply('失败了~').catch(err => {
        console.log(err)
      })
    return false
  }
}
