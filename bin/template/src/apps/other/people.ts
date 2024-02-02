import { APlugin, type AEvent } from 'alemonjs'
export class TestPeople extends APlugin {
  constructor() {
    super({
      // 成员加入
      event: 'MEMBERS',
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
  async peopleAdd(e: AEvent) {
    console.log(e.event, '成员加入')
    return
  }
}

export class PeopleDelete extends APlugin {
  constructor() {
    super({
      // 成员更新
      event: 'MEMBERS',
      typing: 'UPDATE',
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
  async peopleDelete(e: AEvent) {
    console.log(e.event, '成员更新')
    return
  }
}

export class PeopleUpdata extends APlugin {
  constructor() {
    super({
      // 成员退出
      event: 'MEMBERS',
      typing: 'DELETE',
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
  async peopleUpdata(e: AEvent) {
    console.log(e.event, '成员退出')
    return
  }
}
