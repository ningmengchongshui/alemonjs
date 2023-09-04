/**
 * 平台枚举
 */
export const PlatformEnum = [
  "qq",
  "kook",
  "discord",
  "villa",
  "qqgroup",
  "wechat",
  "telegram",
  "dodo",
] as const;

/**
 * 消息枚举
 */
export const EventEnum = [
  /**
   * 频道消息
   */
  "GUILD",
  /**
   * 子频道消息
   */
  "CHANNEL",
  /**
   * 成员频道进出变动消息
   */
  "GUILD_MEMBERS",
  /**
   * 审核消息
   */
  "MESSAGE_AUDIT",
  /**
   * 私聊会话消息
   */
  "DIRECT_MESSAGE",
  /**
   * 论坛主题
   */
  "FORUMS_THREAD",
  /**
   * 论坛POST
   */
  "FORUMS_POST",
  /**
   * 论坛评论
   */
  "FORUMS_REPLY",
  /**
   * 会话消息:公私合并
   */
  "MESSAGES",
  /**
   * 小写兼容层
   */
  "message",
  /**
   * 频道表情点击会话消息
   */
  "GUILD_MESSAGE_REACTIONS",
  /**
   * 互动事件监听
   */
  "INTERACTION",
  /**
   * 音频事件
   */
  "AUDIO_FREQUENCY",
  /**
   * 麦克风事件
   */
  "AUDIO_MICROPHONE",
  /**
   * 兼容不响应
   */
  "notice.*.poke",
] as const;

/**
 * 消息判断
 */
export const EventType = ["CREATE", "UPDATE", "DELETE"] as const;

/**
 * 阿柠檬消息类型
 */
export interface AMessage {
  /**
   * 平台 qq | kook | discord | villa
   */
  platform: (typeof PlatformEnum)[number];
  /**
   * 当前机器人的信息
   */
  bot: {
    id: string;
    name: string;
    avatar?: string;
  };
  /**
   * 事件类型
   */
  event: (typeof EventEnum)[number];
  /**
   * 消息类型
   */
  eventType: (typeof EventType)[number];
  /**
   * 频道编号 | 服务器 | 群名
   */
  guild_id: string;
  /**
   *  频道名 |  服务器名 | 群号
   */
  guild_name?: string;
  /**
   * 子频道名 | 房间名 | 群名
   */
  channel_name?: string;
  /**
   * 子频道编号 | 房间编号 | 群号
   */
  channel_id?: string;
  /**
   * 是否是私域
   */
  isPrivate: boolean;
  /**
   * 是否是群聊
   */
  isGroup: boolean;
  /**
   * 是否是撤回
   */
  isRecall: boolean;
  /**
   * 是否是主人
   */
  isMaster: boolean;
  /**
   * 是否有@
   */
  at: boolean;
  /**
   * 当有艾特时
   * 第一个非机器人用户信息
   * 不管是公域或私域
   */
  at_user?: UserType | undefined;
  /**
   * 艾特得到的uid即可
   */
  at_users?: UserType[];
  /**
   * 消息编号
   */
  msg_id: string;
  /**
   * 消息创建时间
   */
  msg_create_time: number;
  /**
   * 原始消息内容
   */
  msg_txt?: string;
  /**
   * 纯消息
   */
  msg: string;
  /**
   * 用户编号
   */
  user_id: string;
  /**
   * 用户名
   */
  user_name: string;
  /**
   * 用户头像
   */
  user_avatar: string;
  /**
   * 快捷接口
   */
  segment: markdownType;
  /**
   * 权限
   */
  permissions?: permissionsType;
  /**
   * 消息发送机制
   * @param content 消息 | buffer
   * @param img  消息 | buffer
   * @returns
   */
  reply(content?: string | string[] | Buffer, img?: Buffer): Promise<boolean>;

  /**
   * 发送卡片
   * @param obj
   */
  replyCard?(obj?: object): Promise<boolean>;

  /**
   * 回复消息
   * @param obj
   */
  replyByMid?(
    mid: string,
    content?: string | string[] | Buffer,
    img?: Buffer
  ): Promise<boolean>;

  /**
   * 回复卡片
   * @param obj
   */
  replyByMidCard?(mid: string, obj: object): Promise<boolean>;

  /**
   * 撤回指定消息
   * @param cid 频道编号
   * @param mid 消息编号
   * @param hideTip 是否隐藏
   * @returns
   */
  replyDelete?(cid: string, mid: string, hideTip: boolean): Promise<any>;

  /**
   * 公信转私信
   * @param content 内容 | buffer
   * @param obj 消息对象 | buffer
   * @returns
   */
  replyPrivate?(
    content?: string | string[] | Buffer,
    obj?: Buffer
  ): Promise<boolean>;

  /**
   * 发送表态
   * @param boj
   */
  replyEmoji?(mid: string, boj: any): Promise<boolean>;

  /**
   * 删除表态
   * @param boj 表情对象
   * @returns
   */
  deleteEmoji?(mid: string, boj: any): Promise<boolean>;

  /**
   * 获取当前用户下的所有频道列表
   * @returns
   */
  getGuildList?(): Promise<boolean | any[]>;

  /**
   * 获取频道详情
   * @param gid 频道编号
   * @returns
   */
  getGuildMsg?(gid: string): Promise<boolean | any>;

  /**
   * 获取子频道列表
   * @param gid 频道编号
   * @returns
   */
  getChannels?(gid: string): Promise<boolean | any[]>;

  /**
   * 获取子频道详情
   * @param cid 子频道编号
   * @returns
   */
  getChannel?(cid: string): Promise<boolean | any>;

  /**
   * 获取频道下指定成员的信息
   * @param gid 频道
   * @param uid 用户
   * @returns
   */
  getGuildMemberMsg?(gid: string, uid: string): Promise<boolean | any>;
}

/**
 * 用户类型
 */
export interface UserType {
  /**
   * 用户编号
   */
  id: string;
  /**
   * 用户名称
   */
  name: string;
  /**
   * 用户头像地址
   */
  avatar: string;
  /**
   * 是否是机器人
   */
  bot: boolean;
}

/**
 * 权限类型
 */
export interface permissionsType {
  /**
   * 可否艾特成员
   */
  at?: boolean;
  /**
   * 可否艾特全体成员
   */
  atAll?: boolean;
  /**
   * 可否艾特频道
   */
  atChannel?: boolean;
  /**
   * 表态
   */
  statement?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  /**
   * 发言
   */
  speak?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  /**
   * 禁言
   */
  prohibition?: {
    member?: boolean;
    all?: boolean;
  };
  /**
   * 身份组
   */
  identityGroup?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  /**
   * 子频道
   */
  channel?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  /**
   * 公告/全局公告
   */
  Notice?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  /**
   * 精华 / 顶置 / 精选
   */
  essence?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
}

/**
 * segment
 */
export interface markdownType {
  /**
   * 艾特用户
   * @param uid
   */
  at(uid: string): string;
  /**
   * 艾特全体
   */
  atAll(): string;
  /**
   * 艾特频道
   * @param channel_id
   */
  atChannel(channel_id: string): string;
  /**
   *
   * @param role_id 角色
   */
  role?(role_id: string): string;
  /**
   *  点击后才显示
   * @param content 内容
   */
  spoiler?(content: string): string;
  /**
   *
   * @param name  服务器表情名
   * @param id   服务器表情id
   */
  expression?(name: string, id: string): string;
  /**
   * @param txt 链接文字
   * @param rul 链接地址
   */
  link?(txt: string, rul: string): string;
  /**
   * 加粗
   * @param txt
   */
  Bold?(txt: string): string;
  /**
   * 斜体
   * @param txt
   */
  italic?(txt: string): string;
  /**
   * 加粗斜体
   */
  boldItalic?(txt: string): string;
  /**
   * 删除线
   * @param txt
   */
  strikethrough?(txt: string): string;
  /**
   * 代码块
   * @param txt
   */
  block?(txt: string): string;
}

/**
 * 撤回控制器
 */
export interface WithdrawController {
  /**
   * 撤回消息
   */
  withdraw: Function;
  /**
   * 撤回表态
   */
  withdrawReaction: Function;
}

/**
 * 频道控制器
 */
export interface GuildController {
  /**
   * 得到频道列表
   */
  getGuild: Function;
  /**
   * 得到指定频道信息
   */
  getGuildMsg: Function;
  /**
   * 得到指定频道用户
   */
  getGuildUsers: Function;
  /**
   * 删除指定频道用户
   */
  deleteGuildUser: Function;
  /**
   * 创建频道公告
   */
  createGuildAnnounce: Function;
  /**
   * 删除频道公告
   */
  deleteGuildAnnounce: Function;
}

/**
 * 子频道控制器
 */
export interface ChannelController {
  /**
   * 得到子频道列表
   */
  getChannel: Function;
  /**
   * 得到子频道信息
   */
  getChannelMsg: Function;
  /**
   * 创建子频道
   */
  createChannel: Function;
  /**
   * 更新子频道
   */
  updateChannel: Function;
  /**
   * 删除子频道
   */
  deleteChannel: Function;
  /**
   * 得到子频道权限
   */
  getChannelPermissions: Function;
  /**
   * 更新子频道权限
   */
  updateChannelPermissions: Function;
  /**
   * 创建子频道精华
   */
  createChannelAnnounce: Function;
  /**
   * 创建子频道精华
   */
  deleteChannelAnnounce: Function;
  /**
   * 创建
   */
  createChannelEssence: Function;
  /**
   * 得到
   */
  getChannelEssence: Function;
  /**
   * 删除
   */
  deleteChannelEssence: Function;
}

/**
 * 身分组控制器
 */
export interface IdentityGroupController {
  /**
   * 得到身分组
   */
  getIdentityGroup: Function;
  /**
   * 得到身分组信息
   */
  getIdentityGroupMsg: Function;
  /**
   * 创建身分组
   */
  createIdentityGroup: Function;
  /**
   * 更新身分组
   */
  updateIdentityGroup: Function;
  /**
   * 删除身分组
   */
  deleteIdentityGroup: Function;
  /**
   * 得到身分组权限
   */
  getIdentityGroupPermissions: Function;
  /**
   * 更新身份组权限
   */
  updateIdentityGroupPermissions: Function;
}

/**
 * 用户控制器
 */
export interface UserController {
  /**
   * 得到用户信息
   */
  getUserMsg: Function;
}

/**
 * 禁言控制器
 */
export interface MuteController {
  /**
   * 全体禁言
   */
  muteAll: Function;
  /**
   * 成员禁言
   */
  muteMember: Function;
  /**
   * 部分成员禁言
   */
  muteMembers: Function;
}

/**
 * 表态控制器
 */
export interface ReactionController {
  /**
   * 得到表态列表
   */
  getReaction: Function;
}
