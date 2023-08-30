import { plugin, AMessage, createQrcode, getPathBuffer, getPluginHelp } from 'alemon'
import { obtainingImages, AppName } from '../../api.js'
export class TestShow extends plugin {
  constructor() {
    super({
      dsc: '发送图片',
      rule: [
        {
          reg: /^\/柠檬帮助.*$/,
          fnc: 'getHelp',
          dsc: '/柠檬帮助',
          doc: '获取所有指令'
        },
        {
          reg: /^\/百度一下$/,
          fnc: 'baidu',
          dsc: '/百度一下',
          doc: '自己百度吧'
        },
        {
          reg: /^\/柠檬图标$/,
          fnc: 'sculpture',
          dsc: '/柠檬图标',
          doc: '看看机器人定制的本地图标'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getHelp(e: AMessage): Promise<boolean> {
    const data = {
      body: [
        {
          group: '指令示范效果',
          list: getPluginHelp(AppName)
        }
      ],
      name: 'alemon-plugin',
      version: '1.0.0'
    }
    const img = await obtainingImages('/resources/html/help/help.html', data).catch(err => {
      console.log(err)
      return '未知错误'
    })
    if (img) {
      e.reply(img).catch(err => console.log(err))
    }
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async baidu(e: AMessage): Promise<boolean> {
    const img: false | Buffer = await createQrcode('https://www.baidu.com/').catch(err => {
      console.log(err)
      return false
    })
    if (img) {
      e.reply('百度一下,你就知道', img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AMessage): Promise<boolean> {
    const img = getPathBuffer('./plugins/alemon-plugin/resources/assets/img/help/icon.png')
    if (img) {
      e.reply(img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
}
