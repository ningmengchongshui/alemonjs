import { plugin, AMessage } from 'alemon'
export class testcmd extends plugin {
  constructor() {
    super({
      /* 指令集 */
      dsc: '特殊消息',
      rule: [
        {
          reg: /^\/回复我$/, //正则指令
          fnc: 'replyCat' //函数匹配10
        },
        {
          reg: /^\/鸡你太美$/, //正则指令
          fnc: 'ontest' //函数匹配10
        },
        {
          reg: /^\/个人卡片$/, //正则指令
          fnc: 'userCark' //函数匹配10
        },
        {
          reg: /^\/泰裤辣$/, //正则指令
          fnc: 'getCool' //函数匹配10
        }
      ]
    })
  }
  /**
   *
   * @param e 消息对象
   * @returns
   */
  async replyCat(e: AMessage): Promise<boolean> {
    /* 封装好的消息发送机制 */
    e.replyByMid(e.msg_id, `😂 不要急嘛~`).catch(err => {
      console.log(err)
    })
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async userCark(e: AMessage): Promise<boolean> {
    e.replyCard(e.segment.embed(e.user_name, '个人卡片', e.user_avatar, ['编号', e.user_id])).catch(
      err => {
        console.log(err)
      }
    )
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async ontest(e: AMessage): Promise<boolean> {
    /* 封装好的消息发送机制 */
    e.replyByMid(e.msg_id, `😂 你干嘛,哎哟~`).catch(err => {
      console.log(err)
    })
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getCool(e: AMessage): Promise<boolean> {
    e.replyCard(
      e.segment.embed(
        '新人任务',
        '一库一库',
        'http://tva1.sinaimg.cn/bmiddle/6af89bc8gw1f8ub7pm00oj202k022t8i.jpg',
        ['一库一库', '一库一库']
      )
    ).catch(err => {
      console.log(err)
    })
    return false
  }
}
