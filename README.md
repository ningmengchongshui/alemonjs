## Afloat

> 单元编译工具

```sh
npm init afloat
```

```ts
import { defineAfloat } from 'afloat'
export default defineAfloat({
  build: {
    input: 'apps/**/*.{ts,js}',
    output: 'alemon.app.js'
  },
  nodemon: {
    watch: ['a.login.config.ts', 'a.env.ts', 'src', 'db']
  }
})
```

## 开源协议

GNU GPL 是使用最广泛的自由软件许可证,并有强烈的版权要求

分发衍生作品时,作品的源代码必须在同一许可证下可用

GNUGPL 有多种变体,每个变体都有不同的要求
