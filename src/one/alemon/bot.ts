interface BotMessage {
  id: string
  name: string
  avatar?: string
}

let bot: BotMessage = {
  id: '',
  name: '',
  avatar: 'string'
}

export function setBotMsgByONE(val: BotMessage) {
  bot = val
}

export function getBotMsgByONE() {
  return bot
}