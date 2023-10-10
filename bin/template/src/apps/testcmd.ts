import { plugin, AMessage } from 'alemonjs'
/**
 * QQ频道专用方法
 * 该ts插件指令的api只有qq频道能使用
 */
export class TestCmd extends plugin {
  constructor() {
    super({
      /* 指令集 */
      dsc: '特殊消息',
      rule: [
        {
          reg: /^(#|\/)?回复我$/, //正则指令
          fnc: 'replyCat', //函数匹配10
          dsc: '/回复我',
          doc: '响应回复消息'
        },
        {
          reg: /^(#|\/)?泰裤辣$/, //正则指令
          fnc: 'getCool', //函数匹配10
          dsc: '/泰裤辣',
          doc: '得到一个卡片示范效果'
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
    if (e.replyByMid) {
      e.replyByMid(e.msg_id, `😂 不要急嘛~`).catch(err => {
        console.log(err)
      })
    }
    return false
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async getCool(e: AMessage): Promise<boolean> {
    if (e.replyCard) {
      e.replyCard([
        {
          type: 'qq_embed',
          card: {
            embed: {
              title: '新人任务',
              prompt: '新人任务',
              thumbnail: {
                url: 'http://tva1.sinaimg.cn/bmiddle/6af89bc8gw1f8ub7pm00oj202k022t8i.jpg'
              },
              fields: [
                {
                  name: '一库一库'
                },
                {
                  name: '一库一库'
                },
                {
                  name: '😁继续努力'
                }
              ]
            }
          }
        }
      ]).catch(err => {
        console.log(err)
      })
    }
    return false
  }
}
