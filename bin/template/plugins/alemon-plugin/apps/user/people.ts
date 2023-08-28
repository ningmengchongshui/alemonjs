import { plugin, Messagetype, EventType, EType } from 'alemon'
export class People extends plugin {
  constructor() {
    super({
      dsc: '成员加入',
      event: EType.GUILD_MEMBERS,
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
  async peopleAdd(e: Messagetype): Promise<boolean> {
    console.log(e.event, '成员加入')
    return false
  }
}

export class PeopleDelete extends plugin {
  constructor() {
    super({
      dsc: '成员更新',
      event: EType.GUILD_MEMBERS,
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
  async peopleDelete(e: Messagetype): Promise<boolean> {
    console.log(e.event, '成员更新')
    return false
  }
}

export class PeopleUpdata extends plugin {
  constructor() {
    super({
      dsc: '成员退出',
      event: EType.GUILD_MEMBERS,
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
  async peopleUpdata(e: Messagetype): Promise<boolean> {
    console.log(e.event, '成员退出')
    return false
  }
}
