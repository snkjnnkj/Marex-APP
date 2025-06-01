<script setup lang="ts">

</script>

<template>
  <div class="bx">
    <div class="top-title"><h3 class="yk-title">汇总</h3><!----></div>
    <div class="main-box">

    </div>
  </div>
</template>

<style scoped lang="scss">

.bx {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  --padding: 0 20px; //css变量，用于内边距
  --boderRadius: 4px; // 通用变量，用于圆角
  padding-top: 12px;

  .top-title {
    height: 48px;
    display: flex;
    align-items: center;
    padding: var(--padding);
    background: var(--bgColor2);
    box-shadow: 0 0 12px rgba(0, 0, 0, .12);
    border-radius: var(--boderRadius);

  }

  .yk-title {
    font-size: 20px;
  }

  .main-box {
    width: 100%;
    height: 100%;
    background: var(--bgColor2);
    box-shadow: 0 0 12px rgba(0, 0, 0, .12);
    border-radius: var(--boderRadius);
  }
}
</style>