## 前言

[QQ 开放平台](https://q.qq.com/#/)

[Miyoushe 开放平台](https://open.miyoushe.com/#/login)

[KOOK 平台](https://developer.kookapp.cn/doc/)

> 配置了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

## 使用方法

```ts
npm run dev
```

## 目录

```sh
|-- .vscode/     代码片段
|-- apps/    开发应用
|-- plugins/ 集成应用
|-- a.db.config.ts        数据登录配置
|-- a.login.config.ts     个人登录配置
|-- afloat.config.ts      热开发配置
|-- alemon.config.ts      机器运行配置
|-- main.ts               开发应用入口
|-- afloat.run.js         PM2运行调用
|-- pm2.cmd.cjs           PM2指令解析
|-- pm2.config.cjs        PM2启动
```