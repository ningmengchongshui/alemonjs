> 米游社特别版,正在努力看文档中

拉取代码

```
git clone --depth=1 -b mys https://gitee.com/ningmengchongshui/alemon-bot.git
```

安装依赖

```
cd alemon-bot
npm install
```

正常登录（公私/环境随便填）

```
npm run app
```

配置对象存储、回调地址、回调端口

`config/mys.yaml` 按提示修改即可

因官网暂未更新处理文件上传流写法

该项目选择对象存储作为替代方案

`src/alemon/alemonapi.ts` 集合接口

## alemon-mys

点击了解 ☞[alemon 米游社写法](./doc.md)

## 友情链接

官方开发文档[☞API](https://webstatic.mihoyo.com/)

## almeon

`alemon` 框架逻辑块

点击了解 ☞[alemon 开发文档](http://ningmengchongshui.gitee.io/lemonade)

点击了解 ☞[alemon 核心源码](https://gitee.com/ningmengchongshui/alemon-bot/tree/core/)

## 开源协议

GNU GPL 是使用最广泛的自由软件许可证,并有强烈的版权要求

分发衍生作品时,作品的源代码必须在同一许可证下可用

GNUGPL 有多种变体,每个变体都有不同的要求
