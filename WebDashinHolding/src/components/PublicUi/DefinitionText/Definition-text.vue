<script setup>
const {fontSize, color, text} = defineProps(['fontSize', 'color', 'text'])
</script>

<template>
  <div :class="`${text}`" :style="`font-size: ${fontSize}px; color:${color};`">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.text1 {
  width: fit-content;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 文本阴影 */
  --text-stroke: 2px var(--bgColor2);
  -webkit-text-stroke: 2px var(--bgColor2);
  /* 设置背景只覆盖文字 */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 160px;
  font-weight: bolder;
}

.text2 {
  width: fit-content;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 160px;
  font-weight: bolder;
  color: var(--bgColor2);
}
</style>
