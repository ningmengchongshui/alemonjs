<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ResServe } from '../components/fetch'
// http://localhost:3000?name=point
onMounted(() => {
  const {
    query: { name }
  } = useRoute()
  ResServe(`/defset/${name ?? 'point'}.json`).then(ret => {
    console.log('ret', ret)
    data.value = ret
  })
})
const data = ref<{
  dsc: string
  doc: string
}[]
>()
</script>

<template>
  <div class="help">
    <div class="body-top">
    </div>
    <div class="body-point">
      <div class="body-point-font"> 指令演示</div>
    </div>
    <div v-for="item of data" class="body-box">
      <div class="body-box-font-title">{{ item.dsc }}</div>
      <div class="body-box-font-desc">{{ item.doc }}</div>
    </div>
    <div class="body-buttom"></div>
  </div>
</template>

<style>
@import '@/public/css/index.css';
</style>
