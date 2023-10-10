import { defineNuxtPlugin } from 'nuxt/app'
/**
 * 插件中间件
 * 用于机器人图片在pc上缩放
 * 非必须可删除
 */
export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    const updateZoom = () => {
      const screenWidth = window.innerWidth
      const zoomLevel = Math.min(screenWidth / 800, 1)
      document.body.style.transform = `scale(${zoomLevel})`
      document.body.style.transformOrigin = 'top left'
    }
    window.addEventListener('resize', updateZoom)
    updateZoom()
  }
})
