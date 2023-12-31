import { APlugin, AMessage } from 'alemonjs'
export class TestPeople extends APlugin {
  constructor() {
    super({
      dsc: '成员加入',
      event: 'GUILD_MEMBERS',
      typing: 'CREATE',
      rule: [
        {
          fnc: 'peopleAdd'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async peopleAdd(e: AMessage) {
    console.log(e.event, '成员加入')
    return
  }
}

export class PeopleDelete extends APlugin {
  constructor() {
    super({
      dsc: '成员更新',
      event: 'GUILD_MEMBERS',
      typing: 'UPDATE',
      rule: [
        {
          fnc: 'peopleDelete',
          dsc: '成员更新',
          doc: '成员更新'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async peopleDelete(e: AMessage) {
    console.log(e.event, '成员更新')
    return
  }
}

export class PeopleUpdata extends APlugin {
  constructor() {
    super({
      dsc: '成员退出',
      event: 'GUILD_MEMBERS',
      typing: 'DELETE',
      rule: [
        {
          fnc: 'peopleUpdata',
          dsc: '成员退出',
          doc: '成员退出'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async peopleUpdata(e: AMessage) {
    console.log(e.event, '成员退出')
    return
  }
}
