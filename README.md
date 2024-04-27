# AlemonJS [https://alemonjs.com](https://alemonjs.com)

<div align="center">
  <a 
  href="https://alemonjs.com/" 
  target="_blank" 
  rel="noopener noreferrer">
  <img 
   width="256" 
   height="128"
   src="https://alemonjs.com/img/alemon.jpg" 
   alt="AlemonJS LOGO"
   >
  </a>
</div>

<div align="center">
  
事件驱动机器人 | 支持 QQ (群&频道)、KOOK、DC

</div>

### Ecosystem

| Project           | Status                                               | Description     |
| ----------------- | ---------------------------------------------------- | --------------- |
| [alemonjs]        | [![alemonjs-status]][alemonjs-package]               | 标准应用解析器  |
| [create-alemonjs] | [![create-alemonjs-status]][create-alemonjs-package] | 模板创建脚手架  |
| [alemon-ffmpeg]   | [![alemon-ffmpeg-status]][alemon-ffmpeg-package]     | ffmpeg 自动下载 |

[alemonjs]: https://github.com/ningmengchongshui/alemonjs
[alemonjs-status]: https://img.shields.io/npm/v/alemonjs.svg
[alemonjs-package]: https://www.npmjs.com/package/alemonjs
[create-alemonjs]: https://github.com/ningmengchongshui/alemonjs/tree/create-alemonjs
[create-alemonjs-status]: https://img.shields.io/npm/v/create-alemonjs.svg
[create-alemonjs-package]: https://www.npmjs.com/package/create-alemonjs
[alemon-ffmpeg]: https://github.com/kongxiangyiren/alemon-ffmpeg
[alemon-ffmpeg-status]: https://img.shields.io/npm/v/alemon-ffmpeg.svg
[alemon-ffmpeg-package]: https://www.npmjs.com/package/alemon-ffmpeg

### Quick Start

可直接执行脚手架 并快速启动程序

```sh
npm install pnpm -g
pnpm create alemonjs@latest -y
cd alemonb
npm install
npx alemonjs
```

连接平台需要正确配置登录

`alemon.login.ts`

```ts
import { defineConfig } from 'alemonjs'
export default defineConfig({
  // 配置名 test
  test: {
    // qq平台配置
    qq: {
      appID: 'your app id',
      token: 'your token'
    }
  },
  // 配置名 pro
  pro: {
    // kook平台配置
    kook: {}
  }
})
```

> npm run [脚本名] [配置名] [平台名]

启动时带上匹配规则机器人正确启动

```sh
npx alemonjs test qq
```

### Development Examples

- 模板继承

继承写法可使用多个配置函数

```ts
import { createApp, type AEvent, APlugin } from 'alemonjs'
class word extends APlugin {
  constructor() {
    super({
      // 优先级,默认9000
      priority: 500,
      rule: [
        {
          reg: /^\/滴滴$/,
          fnc: 'post',
          // 提高优先级
          priority: 300
        }
      ]
    })
  }
  async post(e: AEvent) {
    e.reply('哒哒')
  }
}
// 构建应用
createApp(import.meta.url)
  //使用指令
  .use({ word })
  // 把所有 / 或 # 开头的消息 替换为 /
  // 表示#滴滴 和 /滴滴 消息一致
  .replace(/^(#|\/)/, '/')
  // 挂载
  .mount()
```

- 自由回调

比继承优先的自由写法

```ts
import { createApp } from 'alemonjs'
createApp(import.meta.url)
  .on('MESSAGE', e => {
    if (/^你好$/.test(e.msg)) e.reply('你好呀', e.user_name)
  })
  .on('GUILD_MEMBERS', e => {
    console.log('成员', e.user_name, '加入')
  })
```

# Unknown file ".ts"

node >= 20.0.0

```sh
npx ts-node node_modules/alemonjs/bin/index.js
```

更改为

```sh
node --no-warnings=ExperimentalWarning --loader ts-node/esm node_modules/alemonjs/bin/index.js
```

### Community

QQ Group 806943302
