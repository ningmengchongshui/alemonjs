<script>
  createApp({
    setup: () => ({
      data: BOT_DATA
    })
  }).mount('#app')
</script>

<template>
  <div class="body-top"></div>
  <div v-for="val of data">
    <div class="body-point">
      <div class="body-point-font">{{ val.group }}</div>
    </div>
    <div v-for="item of val.list" class="body-box">
      <div class="body-box-font-title">{{ item.priority }}</div>
      <div class="body-box-font-desc">{{ item.func }}</div>
    </div>
  </div>
  <div class="body-buttom"></div>
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
