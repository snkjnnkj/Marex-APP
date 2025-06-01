<!-- components/GlobalLoader.vue -->
<script setup>
import {storeToRefs} from 'pinia'
import {useLoadingStore} from '@/stores/加载动画/loading.js'

const loadingStore = useLoadingStore()
const {isLoading} = storeToRefs(loadingStore)
</script>

<template>
  <transition name="fade">
    <div v-if="isLoading" class="global-loader">
      <div class="loader"></div>
    </div>
  </transition>
</template>

<style scoped>
.global-loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1s steps(4) infinite;
}
.loader:before {
  content:"Loading..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}
</style>