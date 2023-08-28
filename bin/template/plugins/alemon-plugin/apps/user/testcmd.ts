import { plugin, Messagetype, segment } from 'alemon'
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
  async replyCat(e: Messagetype): Promise<boolean> {
    /* 封装好的消息发送机制 */
    e.reply(`😂 不要急嘛~`, segment.reply(e.msg.id)).catch(err => {
      console.log(err)
    })
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async userCark(e: Messagetype): Promise<boolean> {
    e.reply(
      segment.embed(e.msg.author.username, '个人卡片', e.msg.author.avatar, [
        '编号',
        e.msg.author.id
      ])
    ).catch(err => {
      console.log(err)
    })
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async ontest(e: Messagetype): Promise<boolean> {
    /* 封装好的消息发送机制 */
    e.reply(`😂 你干嘛,哎哟~`, segment.reply(e.msg.id)).catch(err => {
      console.log(err)
    })
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getCool(e: Messagetype): Promise<boolean> {
    e.reply(
      segment.embed(
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
