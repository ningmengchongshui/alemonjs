<h1 align="center">
 <span> Alemon-Bot</span> 
<a  href='https://github.com/ningmengchongshui/alemon-bot/stargazers'>

[![](https://profile-counter.glitch.me/alemon-bot/count.svg)](https://gitee.com/ningmengchongshui/alemon-bot)

Node.js>=V16

[☞ 参考文档](http://three-point-of-water.gitee.io/point/)

Windows/Linux,Node.js,TypeScript

Express,Redis,Sequelize,PM2

</a>
</h1>

## 频道机器人

一款基于官方 SDK 所构造的频道机器人开发框架,让开发者更专注于业务逻辑,是一种面向执行消息匹配指令的开发模式.

| 指令      | 说明         |
| --------- | ------------ |
| /柠檬帮助 | 查看所以指令 |
| /柠檬版本 | 查看版本记录 |
| /原神黄历 | 简单调用功能 |

## 起步

拉取代码

```
#github
git clone --depth=1 https://github.com/ningmengchongshui/alemon-bot.git
#gitee
git clone --depth=1 https://gitee.com/ningmengchongshui/alemon-bot.git
```

加载依赖

```
cd alemon-bot
npm install cnpm -g #全局安装cnpm
cnpm install
```

## 运行

#### 脚本运行 1 登录验证

```
npm run app  #前台运行
```

#### 后台运行 2 负载均衡

```
npm install pm2 -g #安装全局pm2
npm install ts-node -g #安装全局ts-node
```

#### 扩展指令

```
npm run start #运行
npm run stop #停止
npm run restart #重启
npm run delete #删除
npm run login #登录
npm run log #打印
npm run monit #管理

```

#### 可能出现的问题

pm2 环境变量问题
```
pm2 env #检查
```
```
pm2 env set PATH "./node_modules/.bin:$PATH" #没有则需要添加
```
pm2 Modules with id set not found  没找到
```
pm2 update  #更新最新版
pm2 kill   #杀死所有进程
rm -rf ~/.pm2  #删除后重新启动即可
```

## linux

puppeteer 环境

#### centos

```
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y && yum install libdrm libgbm libxshmfence -y && yum install nss -y && yum update nss -y;
```

安装中文字体

```
yum groupinstall fonts -y
```

#### ubuntu

## 友情链接

官方代码包[☞SDK](https://github.com/tencent-connect/bot-node-sdk)

官方开发文档[☞API](https://bot.q.qq.com/wiki/develop/nodesdk/guild/guilds.html)

开发交流地 806943302

函数命名部分借鉴于 oicq/icqq

插件设计思想借鉴于 Yunzai-Bot
