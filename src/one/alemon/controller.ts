/**
 * 客户端控制器
 * @param select
 * @returns
 */
export const ClientController = (data: {
  guild_id: string
  channel_id: string
  msg_id: string
  send_at: number
}) => {
  return (select?: {
    guild_id?: string
    channel_id?: string
    msg_id?: string
    send_at?: number
  }) => {
    const villa_id = select?.guild_id ?? data.guild_id
    const room_id = select?.channel_id ?? data.channel_id
    const msg_uid = select?.msg_id ?? data.msg_id
    const send_at = select?.send_at ?? data.send_at
    return {
      reply: async (
        content: Buffer | string | number | (Buffer | number | string)[]
      ) => {},
      quote: async (
        content: Buffer | string | number | (Buffer | number | string)[]
      ) => {},
      withdraw: async (hideTip: boolean) => {},
      pinning: async (cancel?: boolean) => {},
      forward: async () => {},
      horn: async (cancel?: boolean) => {},
      emoji: async (msg: any[], cancel?: boolean) => {},
      card: async (msg: any[]) => {},
      allEmoji: async () => {}
    }
  }
}