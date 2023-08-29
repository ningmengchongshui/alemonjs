import { segmentType } from "./segment.js";

/**
 * qq-types 不能导出
 */

// 用户
interface IUser {
  // 用户编号
  id: string;
  // 用户名称
  username: string;
  // 用户头像地址
  avatar: string;
  // 是否是机器人
  bot: boolean;
}

// 成员
interface IMember {
  // 频道编号
  guild_id: string;
  joined_at: string;
  nick: string;
  user: IUser;
  roles: string[];
  deaf: boolean;
  mute: boolean;
}
// 消息类型
interface IMessage {
  // 消息编号
  id: string;
  // 子频道编号
  channel_id: string;
  // 频道编号
  guild_id: string;
  // 消息内容
  content: string;
  timestamp: string;
  edited_timestamp: string;
  mention_everyone: boolean;
  // 消息创建者
  author: IUser;
  //
  member: IMember;
  attachments: {
    url: string;
  }[];
  //
  embeds: EmbedsType[];
  mentions: IUser[];
  //
  ark: ArkType;
  seq?: number;
  seq_in_channel?: string;
}

interface EmbedsType {
  title: string;
  description?: string;
  prompt?: string;
  thumbnail?: {
    url: string;
  };
  fields?: {
    name: string;
  }[];
}

interface ArkType {
  template_id: string;
  kv: {
    key: string;
    value: string;
    obj: {
      obj_kv: {
        key: string;
        value: string;
      }[];
    }[];
  }[];
}

// 表态
interface ReactionObj {
  // 消息编号
  message_id: string;
  // 表情类型
  emoji_type: number;
  // 表情编号
  emoji_id: string;
}

// ws配置
interface GetWsParam {
  // 应用编号
  appID: string;
  // 机器令牌
  token: string;
  // 是否是沙河环境
  sandbox?: boolean;
  // 分发推荐
  shards?: number[];
  //事件响应
  intents?: AvailableIntentsEventsEnum[];
  //
  maxRetry?: number;
}

// 引用类型
interface MessageReference {
  message_id: string;
  ignore_get_message_error?: boolean;
}

// guiles
enum AvailableIntentsEventsEnum {
  // 频道
  GUILDS = "GUILDS",
  // 频道消息
  GUILD_MEMBERS = "GUILD_MEMBERS",
  // 私域消息
  GUILD_MESSAGES = "GUILD_MESSAGES",
  //
  GUILD_MESSAGE_REACTIONS = "GUILD_MESSAGE_REACTIONS",
  //
  DIRECT_MESSAGE = "DIRECT_MESSAGE",
  //
  FORUMS_EVENT = "FORUMS_EVENT",
  // 音频and麦克风消息
  AUDIO_ACTION = "AUDIO_ACTION",
  // 公域消息
  PUBLIC_GUILD_MESSAGES = "PUBLIC_GUILD_MESSAGES",
  //
  MESSAGE_AUDIT = "MESSAGE_AUDIT",
  //
  INTERACTION = "INTERACTION",
}

//
interface IGuild {
  id: string;
  name: string;
  icon: string;
  owner_id: string;
  owner: boolean;
  member_count: number;
  max_members: number;
  description: string;
  joined_at: number;
  channels: IChannel[];
  unionworld_id: string;
  union_org_id: string;
}

//
interface IChannel extends PostChannelObj {
  id: string;
  guild_id: string;
  owner_id: string;
  speak_permission?: number;
  application_id?: string;
}

//
interface PostChannelObj {
  name: string;
  type: ChannelType;
  sub_type?: ChannelSubType;
  position: number;
  parent_id: string;
  private_type?: number;
  private_user_ids?: string[];
  permissions?: string;
}

type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;
type ChannelSubType = 0 | 1 | 2 | 3;

/**
 * alemon-types  可以导出
 *
 *
 * api需要什么就保留什么
 *
 * 交互信息用到什么就保留什么
 *
 * 其他的数据都清除,减少e消息数据包大小
 *
 */

// 玩家信息
export interface UserType {
  //编号
  id: string;
  //用户名
  username: string;
  //状态
  status: number;
  //是否是机器
  bot: boolean;
}

// 截图文件类型
export enum ScreenshotType {
  JPEG = "jpeg",
  PNG = "png",
  WEBP = "webp",
}

// 消息类型
export enum EventEnum {
  /* 频道消息 */
  GUILD = "GUILD",
  /* 子频道消息 */
  CHANNEL = "CHANNEL",
  /* 成员频道进出变动消息 */
  GUILD_MEMBERS = "GUILD_MEMBERS",
  /* 审核消息 */
  MESSAGE_AUDIT = "MESSAGE_AUDIT",
  /* 私聊会话消息 */
  DIRECT_MESSAGE = "DIRECT_MESSAGE",
  /* 论坛消息:公私合并 */
  FORUMS_THREAD = "FORUMS_THREAD", //主题
  FORUMS_POST = "FORUMS_POST", //POST
  FORUMS_REPLY = "FORUMS_REPLY", //评论
  /* 会话消息:公私合并 */
  MESSAGES = "MESSAGES",
  /* 小写兼容层 */
  message = "message",
  /* 频道表情点击会话消息 */
  GUILD_MESSAGE_REACTIONS = "GUILD_MESSAGE_REACTIONS",
  /* 互动事件监听 */
  INTERACTION = "INTERACTION",
  /* 音频事件 */
  AUDIO_FREQUENCY = "AUDIO_FREQUENCY",
  /* 麦克风事件 */
  AUDIO_MICROPHONE = "AUDIO_MICROPHONE",
  // 兼容不响应
  "notice.*.poke" = "notice.*.poke",
}

// 消息判断
export enum EventType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

// 应用类型
export interface AppType {
  [key: string]: object;
}

// 指令类型
export type CmdType = {
  [Event in EventEnum]: CmdItemType[];
};

// 机器人信息
export interface BotType {
  version: number;
  session_id: string;
  user: UserType; //机器人信息
  shard: number[]; //分发建议
}

// 消息类型
export interface EMessageType extends IMessage {
  // 机器人
  version: number;
  session_id: string;
  user: UserType; //机器人信息
  shard: number[]; //分发建议
  // 用户
  message_reference: MessageReference; //引用消息
  author: IUser; //消息作者
  channel_name: string; //子频道名称
  channel_id: string; //子频道号
  content: string; //消息内容
  guild_name: string; //频道名
  owner_id: string; //频道主 // 删除
  guild_id: string; //频道号
  id: string; //消息id
  member: IMember; //消息用户
  mentions: IUser[]; //ai消息对象数组
  seq?: number; //消息间的排序,已废弃
  seq_in_channel: string; //消息间的排序,仅限于子频道
  timestamp: string; //消息时间
}

// 权限类型
export interface PermissionsType {
  //子频道权限
  state: boolean;
  //可查看
  look: boolean;
  //可管理
  manage: boolean;
  //可发言
  speak: boolean;
  //可直播
  broadcast: boolean;
  //权限权重
  botmiss: number;
}

// 身份类型
export interface IdentityType {
  //频道主人
  master: boolean;
  //成员
  member: boolean;
  //等级
  grade: string;
  //管理员
  admins: boolean;
  //子频道管理也
  wardens: boolean;
}

export interface UserType {
  // 用户编号
  id: string;
  // 用户名称
  name: string;
  // 用户头像地址
  avatar: string;
  // 是否是机器人
  bot: boolean;
}

// 消息对象类型
export interface AMessage {
  segment: segmentType;
  // 消息事件
  eventId: string;
  // 事件类型
  event: EventEnum;
  // 消息类型
  eventType: EventType;
  // 是否是私域
  isPrivate: boolean;
  // 是否是群聊
  isGroup: boolean;
  // 是否是撤回
  isRecall: boolean;
  // 艾特得到的qq
  atuid: UserType[];
  // 是否是艾特
  at: boolean;

  // 子频道编号
  channel_id: string;

  // 频道编号
  guild_id: string;

  // 是否是机器人主人
  isMaster: boolean;

  // 当前机器人的信息
  bot?: {
    id: string;
    name: string;
    avatar: string;
  };

  // 身份(触发该消息的用户的身份)
  identity?: IdentityType; // 可以计算得出

  // 消息对象
  EMessage?: EMessageType;

  // 消息编号
  msg_id: string;

  /**
   * @deprecated 已废弃,请使用 msg
   */
  cmd_msg: string;

  // 消息创建时间
  createTime: number;

  // 原始消息内容
  txt: string;

  /**
   * @deprecated QQ频道插件请使用 EMessage 该属性已被占用为指令消息
   */
  msg: string;

  // 用户编号
  user_id: string;
  // 用户名
  user_name: string;
  // 用户头像
  user_avatar: string;

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
  replyCard(obj?: object): Promise<boolean>;

  /**
   * 回复消息
   * @param obj
   */
  replyMsg(
    mid?: string,
    content?: string | string[] | Buffer,
    img?: Buffer
  ): Promise<boolean>;

  /**
   * 发送表态
   * @param boj
   */
  replyEmoji(boj: ReactionObj): Promise<boolean>;

  /**
   * 删除表态
   * @param boj 表情对象
   * @returns
   */
  deleteEmoji(boj: ReactionObj): Promise<boolean>;

  /**
   * 公信转私信
   * @param content 内容 | buffer
   * @param obj 消息对象 | buffer
   * @returns
   */
  replyPrivate(
    content?: string | string[] | Buffer,
    obj?: Buffer
  ): Promise<boolean>;

  /**
   * 获取当前用户下的所有频道列表
   * @returns
   */
  getGuildList(): Promise<boolean | IGuild[]>;

  /**
   * 获取频道详情
   * @param gid 频道编号
   * @returns
   */
  getGuildMsg(gid: string): Promise<boolean | IGuild>;

  /**
   * 获取子频道列表
   * @param gid 频道编号
   * @returns
   */
  getChannels(gid: string): Promise<boolean | IChannel[]>;

  /**
   * 获取子频道详情
   * @param cid 子频道编号
   * @returns
   */
  getChannel(cid: string): Promise<boolean | IChannel>;

  /**
   * 获取频道下指定成员的信息
   * @param gid 频道
   * @param uid 用户
   * @returns
   */
  getGuildMemberMsg(gid: string, uid: string): Promise<boolean | IMember>;

  /**
   * 撤回指定消息
   * @param cid 频道编号
   * @param mid 消息编号
   * @param hideTip 是否隐藏
   * @returns
   */
  deleteMsg(cid: string, mid: string, hideTip: boolean): Promise<any>;

  /**
   * 权限api
   */
  permissions: {
    /**
     * 查询机器人权限
     * @param channel_id 子频道编号
     * @param id  用户编号
     * @returns
     */
    searchByBot(
      channel_id: any,
      id: any
    ): Promise<{
      botmiss: any;
      look: boolean;
      manage: boolean;
      speak: boolean;
      broadcast: boolean;
      state: boolean;
    }>;

    /**
     * 查询用户权限
     * @param channel_id 子频道编号
     * @param id  用户编号
     * @returns
     */
    searchByUer(
      channel_id: any,
      id: any
    ): Promise<{
      botmiss: any;
      look: boolean;
      manage: boolean;
      speak: boolean;
      broadcast: boolean;
      state: boolean;
    }>;
  };
}

/**
 * 父类属性
 * @param name 类名
 * @param dsc 类说明
 * @param event 事件响应
 * @param eventType 事件类型
 * @param priority 正则指令匹配数组
 * @param rule 事件类型
 */
export interface SuperType {
  name?: string;
  dsc?: string;
  event?: EventEnum;
  eventType?: EventType;
  priority?: number;
  rule?: {
    //正则
    reg?: RegExp | string;
    //方法(函数)
    fnc: string;
  }[];
}

export interface CmdItemType {
  reg: RegExp | string;
  priority: number;
  event: EventEnum;
  eventType: EventType;
  belong: "plugins" | "example";
  AppName: string;
  fncName: string;
  fnc: Function;
  dsc: string;
}
