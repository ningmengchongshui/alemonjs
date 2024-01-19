<script>
Vue.createApp({
  setup: () => ({
    data: BOT_DATA
  })
}).mount('#app')
</script>

<template>
  <div id="app">
    <div class="body-top"></div>
    <div v-for="val of data">
      <div class="body-point">
        <div class="body-point-font">{{ val.group }}</div>
      </div>
      <div v-for="item of val.list" class="body-box">
        <div class="body-box-font-title">{{ item.name }}</div>
        <div class="body-box-font-desc">{{ item.doc }}</div>
      </div>
    </div>
    <div class="body-buttom"></div>
  </div>
</template>

<head>
    <link
      rel="stylesheet"
      type="text/css"
      href="@/css/help.css"
    />
</head>

<style>
.body-top {
  background: url('@/img/help/top.jpg');
}

.body-point {
  background: url('@/img/help/point.jpg');
}

.body-box {
  background: url('@/img/help/box.jpg');
}

.body-buttom {
  background: url('@/img/help/buttom.jpg');
}
</style>
