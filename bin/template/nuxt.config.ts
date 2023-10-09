// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  // 更改模式
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  // 开发工具
  devtools: { enabled: false },
  plugins: [
    { src: '~/plugins/zoom.ts', mode: 'client' },
    { src: '~/plugins/vant.ts', mode: 'client' }
  ],
  // 全局css文件
  css: ['~/assets/main.css', 'vant/lib/index.css'],
  //没有 shim
  typescript: {
    shim: false
  },
  // ssr模式
  ssr: true,
  // 开发服务端口
  devServer: {
    port: 3000
  }
})
