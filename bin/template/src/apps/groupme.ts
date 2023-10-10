import { plugin, AMessage } from 'alemonjs'
/**
 * QQ频道专用方法
 * 当私聊机器人超过三次时,
 * 机器人仍未回复消息,立即会被QQ频道禁止
 * 频道拒绝用户向该机器人发送消息
 * 除非机器人主动在子频道中开通私信并回复消息才能接触禁止状态~
 * 此时要注意频道主允许机器人主动私聊
 */
export class TestGroupme extends plugin {
  constructor() {
    super({
      /* 说明集*/
      dsc: '指令用法示范',
      /* 指令集 */
      rule: [
        {
          reg: /^(#|\/)?私聊我$/,
          fnc: 'isGroup',
          dsc: '/私聊我',
          doc: '解除QQ频道私聊禁止'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async isGroup(e: AMessage): Promise<boolean> {
    if (e.replyPrivate) {
      const T = await e.replyPrivate('私聊你了哟~').catch(err => {
        console.log(err)
        return false
      })
      if (!T) {
        e.reply('失败了~').catch(err => {
          console.log(err)
        })
      }
    }
    return false
  }
}
