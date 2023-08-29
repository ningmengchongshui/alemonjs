import { plugin, AMessage, EventType, EventEnum } from 'alemon'
export class People extends plugin {
  constructor() {
    super({
      dsc: '成员加入',
      event: EventEnum.GUILD_MEMBERS,
      eventType: EventType.CREATE,
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
  async peopleAdd(e: AMessage): Promise<boolean> {
    console.log(e.event, '成员加入')
    return false
  }
}

export class PeopleDelete extends plugin {
  constructor() {
    super({
      dsc: '成员更新',
      event: EventEnum.GUILD_MEMBERS,
      eventType: EventType.UPDATE,
      rule: [
        {
          fnc: 'peopleDelete'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async peopleDelete(e: AMessage): Promise<boolean> {
    console.log(e.event, '成员更新')
    return false
  }
}

export class PeopleUpdata extends plugin {
  constructor() {
    super({
      dsc: '成员退出',
      event: EventEnum.GUILD_MEMBERS,
      eventType: EventType.DELETE,
      rule: [
        {
          fnc: 'peopleUpdata'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async peopleUpdata(e: AMessage): Promise<boolean> {
    console.log(e.event, '成员退出')
    return false
  }
}
