<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted} from "vue";

const {rou, title, navFalse} = defineProps(['rou', 'title', 'navFalse'])
const router = useRouter();
const route = useRoute();
const isActiveTop = ref(false);
const off = () => {
  isActiveTop.value = false;
  if (rou !== '') {
    router.push(rou)
  } else {
    router.go(-1);
  }
}
// 暴露动画状态给路由守卫
defineExpose({
  isActiveTop,
});
onMounted(() => {
  setTimeout(() => {
    isActiveTop.value = true;
  })
})
const sivsjf = ref()
onMounted(() => {
  if (navFalse == false) {
    sivsjf.value = false
  } else {
    sivsjf.value = true
  }
})
</script>

<template>
  <transition name="fade">
    <div class="box" v-if="isActiveTop">
      <div class="nva" v-if="sivsjf">
        <span class="hover" @click="off">
          <svg t="1747577199250" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="2821" width="20" height="20"><path
              d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"
              fill="#2c2c2c" p-id="2822"></path></svg>
        </span>
        <span>
          {{ title }}
        </span>
        <span style="justify-content: flex-end;">
          <slot :name="'function'"></slot>
        </span>
      </div>
      <slot :name="'mian'">
      </slot>
    </div>

  </transition>
</template>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: #eee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 120;
}

.nva {
  width: 100vw;
  height: 55px;
  background: rgba(61, 199, 153, 0.32);
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  padding-left: 8px;

  span:nth-child(1) {
    justify-content: flex-start;
  }

  span {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span:nth-child(2) {
    width: fit-content;
    transform: translateX(5px);
  }

  .hover {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hover:hover {
    background-color: #ffffff1a;
  }
}

.fade-enter-active {
  transition: all 0.2s ease-out;
  transform: translateY(0px);
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  transition: all 0.2s ease-out;
  transform: translateY(100px);
  opacity: 0;
}
</style>
