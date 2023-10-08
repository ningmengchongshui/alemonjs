<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ResServe } from '../components/fetch'
// http://127.0.0.1:3000?name=help
onMounted(() => {
  const {
    query: { name }
  } = useRoute()
  ResServe(`/defset/${name}.json`).then(ret => {
    data.value = ret
  })
  ResServe('/api/test', {
    name
  }).then(ret => {
    console.log('测试接口', ret)
  })
})
const data = ref<
  {
    group: string
    list: {
      title: string
      icon: number
      desc: string
    }[]
  }[]
>()
</script>

<template>
  <div class="help">
    <div style="height: 350px"></div>
    <div v-for="val in data" :key="val.group" class="cont-box">
      <div class="help-group">{{ val.group }}</div>
      <div class="help-table">
        <div class="tr">
          <div v-for="item in val.list" :key="item.title" class="td">
            <span :class="'help-icon help-icon-' + item.icon"></span>
            <strong class="help-title">{{ item.title }}</strong>
            <span class="help-desc">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <span>AlemonBot | 测试插件</span>
      <span class="version">@2.2</span>
    </div>
  </div>
</template>

<style>
@import '@/public/css/help.css';
</style>
