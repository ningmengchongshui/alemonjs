// https://nuxt.com/docs/api/configuration/nuxt-config
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
  // 全局css文件
  css: ['~/assets/main.css'],
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
