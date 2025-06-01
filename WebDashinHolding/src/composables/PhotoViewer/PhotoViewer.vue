<script setup>
import { ref } from 'vue'
import { stop, move } from '@/utils/static.js'

const { res } = defineProps({
  res: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['click'])
let index = ref(0)
/*切换照片*/
const increase = () => {
  if (index.value === res.length - 1) {
    return (index.value = 0)
  }
  handed.value = 0
  // vDrag.value.style.top = '0px'
  // vDrag.value.style.left = '0px'
  index.value++
}
const subtract = () => {
  if (index.value === 0) {
    return (index.value = res.length - 1)
  }
  handed.value = 0
  index.value--
}
/*旋转*/
let handed = ref(0)
const leftHanded = () => {
  handed.value += 90
}
const dextrorotary = () => {
  handed.value -= 90
}
/*放大/缩小*/
let proportion = ref(1)
let OriginalProportion = ref(100)
const amplificationRatio = () => {
  stop()
  if (~~proportion.value == 10) {
    return (proportion.value = 10)
  }
  proportion.value += 0.1
  OriginalProportion.value += 10
}
const reduce = () => {
  if (proportion.value.toFixed(1) == 0.1) {
    return proportion.value == 0.1
  }
  proportion.value -= 0.1
  OriginalProportion.value -= 10
}
/*原始比例*/
const OriginalScale = () => {
  proportion.value = 1
  OriginalProportion.value = 100
}

/*鼠标滚轮放大图片*/
function scrollbar(e) {
  const deltaY = e.deltaY
  if (deltaY > 0) {
    reduce()
  } else {
    amplificationRatio()
  }
}
</script>

<template>
  <div class="yk-image-preview" style="z-index: 220000">
    <div class="yk-image-preview__mask"></div>
    <div class="yk-image-preview__body">
      <img
        oncontextmenu="return false;"
        onselectstart="return false;"
        :src="res[index]"
        :style="`transform: rotate(${handed}deg) scale(${proportion.toFixed(1)});`"
        class="yk-image-preview__img"
        @wheel="scrollbar"
        ref="vDrag"
        alt=""
      />
    </div>
    <button class="yk-image-preview__close-btn" @click="emit('click', move)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class="yk-icon icon-close-outline"
        stroke-width="0"
        stroke-linecap="butt"
        style="fill: currentcolor; font-size: inherit"
      >
        <path
          d="m792.576 177.126 54.298 54.272L566.298 512l280.55 280.576-54.272 54.298L512 566.298l-280.576 280.55-54.298-54.272L457.702 512 177.126 231.424l54.272-54.298L512 457.702l280.576-280.576z"
        ></path>
      </svg>
    </button>
    <button class="yk-image-preview__arrow-left" @click="subtract" style="z-index: 2475">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class="yk-icon icon-left-outline"
        stroke-width="0"
        stroke-linecap="butt"
        style="fill: currentcolor; font-size: inherit"
      >
        <path
          d="m624.998 113.766 54.324 54.298L335.36 512l343.962 343.936-54.324 54.298L226.765 512l398.233-398.234z"
        ></path>
      </svg>
    </button>
    <button class="yk-image-preview__arrow-right" @click="increase" style="z-index: 2476">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class="yk-icon icon-right-outline"
        stroke-width="0"
        stroke-linecap="butt"
        style="fill: currentcolor; font-size: inherit"
      >
        <path
          d="M797.235 512 399.002 910.234l-54.324-54.298L688.64 512 344.678 168.064l54.324-54.298z"
        ></path>
      </svg>
    </button>
    <div class="yk-image-preview__toolbar">
      <div class="yk-tooltip" @click="leftHanded">
        <button class="yk-image-preview__toolbar-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="yk-icon icon-rotate-left-outline"
            stroke-width="0"
            stroke-linecap="butt"
            style="fill: currentcolor; font-size: inherit"
          >
            <path
              d="M742.4 384a51.2 51.2 0 0 1 51.2 51.2V896a51.2 51.2 0 0 1-51.2 51.2H153.6a51.2 51.2 0 0 1-51.2-51.2V435.2a51.2 51.2 0 0 1 51.2-51.2zm-25.6 76.8H179.2v409.6h537.6V460.8zM514.765 71.68l54.323 54.298-36.557 36.556a473.856 473.856 0 0 1 425.677 314.804l-72.397 25.625A397.056 397.056 0 0 0 538.01 239.744l31.078 31.053-54.323 54.297-126.72-126.72L514.765 71.68z"
            ></path>
          </svg>
        </button>
        <div class="personage">向左旋转</div>
      </div>
      <div class="yk-tooltip" @click="dextrorotary">
        <button class="yk-image-preview__toolbar-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="yk-icon icon-rotate-right-outline"
            stroke-width="0"
            stroke-linecap="butt"
            style="fill: currentcolor; font-size: inherit"
          >
            <path
              d="M870.4 384a51.2 51.2 0 0 1 51.2 51.2V896a51.2 51.2 0 0 1-51.2 51.2H281.6a51.2 51.2 0 0 1-51.2-51.2V435.2a51.2 51.2 0 0 1 51.2-51.2h588.8zm-25.6 76.8H307.2v409.6h537.6V460.8zM491.11 53.58l90.496 90.497 54.298 54.323-54.272 54.272-90.522 90.522-54.272-54.324 53.786-53.836a397.056 397.056 0 0 0-354.79 267.238l-72.602-25.011a473.856 473.856 0 0 1 424.013-318.95l-50.432-50.433 54.297-54.297z"
            ></path>
          </svg>
        </button>
        <div class="personage">向右旋转</div>
      </div>
      <div class="yk-tooltip" @click="amplificationRatio">
        <button class="yk-image-preview__toolbar-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="yk-icon icon-zoom-in-outline"
            stroke-width="0"
            stroke-linecap="butt"
            style="fill: currentcolor; font-size: inherit"
          >
            <path
              d="M435.2 76.8c197.94 0 358.4 160.46 358.4 358.4a356.864 356.864 0 0 1-78.029 223.258l253.107 253.081-54.297 54.272-252.8-252.749A356.915 356.915 0 0 1 435.2 793.6c-197.94 0-358.4-160.46-358.4-358.4S237.26 76.8 435.2 76.8zm0 76.8c-155.52 0-281.6 126.08-281.6 281.6s126.08 281.6 281.6 281.6 281.6-126.08 281.6-281.6c0-153.062-122.112-277.58-274.227-281.498l-7.373-.102zm38.4 128v115.2h115.2v76.8H473.6v115.2h-76.8V473.6H281.6v-76.8h115.2V281.6h76.8z"
            ></path>
          </svg>
        </button>
        <div class="personage">放大</div>
      </div>
      <div class="yk-tooltip" @click="reduce">
        <button class="yk-image-preview__toolbar-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class="yk-icon icon-zoom-out-outline"
            stroke-width="0"
            stroke-linecap="butt"
            style="fill: currentcolor; font-size: inherit"
          >
            <path
              d="M435.2 76.8c197.94 0 358.4 160.46 358.4 358.4a356.864 356.864 0 0 1-78.029 223.258l253.107 253.081-54.297 54.272-252.8-252.749A356.915 356.915 0 0 1 435.2 793.6c-197.94 0-358.4-160.46-358.4-358.4S237.26 76.8 435.2 76.8zm0 76.8c-155.52 0-281.6 126.08-281.6 281.6s126.08 281.6 281.6 281.6 281.6-126.08 281.6-281.6c0-153.062-122.112-277.58-274.227-281.498l-7.373-.102zm153.6 243.2v76.8H281.6v-76.8h307.2z"
            ></path>
          </svg>
        </button>
        <div class="personage">缩小</div>
      </div>
      <div class="yk-tooltip" @click="OriginalScale">
        <button class="yk-image-preview__toolbar-btn" style="width: 50px">
          <span>{{ OriginalProportion }}%</span>
        </button>
        <div class="personage">原始比例</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.yk-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.yk-image-preview__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000e;
  transition: all 0.3s ease;
}

.yk-image-preview__body {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .yk-image-preview__img {
    transition: transform 0.2s ease;
  }
}

.yk-image-preview__close-btn,
.yk-image-preview__arrow-left,
.yk-image-preview__arrow-right {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 18px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.yk-image-preview__close-btn {
  top: 20px;
  right: 20px;
  background: #fff2;
}

.yk-image-preview__close-btn,
.yk-image-preview__arrow-left,
.yk-image-preview__arrow-right {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 18px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.yk-image-preview__arrow-left {
  left: 20px;
}

.yk-image-preview__arrow-left,
.yk-image-preview__arrow-right {
  top: 50%;
  transform: translateY(-50%);
  background: #fff2;
}

.yk-image-preview__close-btn,
.yk-image-preview__arrow-left,
.yk-image-preview__arrow-right {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 18px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.yk-image-preview__arrow-right {
  right: 20px;
}

.yk-image-preview__arrow-left,
.yk-image-preview__arrow-right {
  top: 50%;
  transform: translateY(-50%);
  background: #fff2;
}

.yk-image-preview__toolbar {
  position: absolute;
  bottom: 46px;
  left: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  background: #ffffff6a;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transform: translate(-50%);
}

.yk-tooltip {
  --tooltip-theme-bg-color: var(--bgColor6);
  --tooltip-theme-font-color: #ffffff;
  --tooltip-theme-min-width: 2em;
  --tooltip-theme-min-height: 2em;
  --tooltip-theme-max-width: 250px;
  --tooltip-theme-max-hegiht: fit-contnet;
  position: relative;
  width: fit-content;

  .personage {
    position: absolute;
    top: -20px;
    left: 5px;
    z-index: 2000;
    padding: 16px 24px;
    width: max-content;
    min-width: var(--tooltip-theme-min-width);
    max-width: var(--tooltip-theme-max-width);
    min-height: var(--tooltip-theme-min-height);
    max-height: var(--tooltip-theme-max-hegiht);
    font-size: 14px;
    line-height: 1.54;
    border-radius: 8px;
    text-align: start;
    color: var(--tooltip-theme-font-color);
    background-color: var(--tooltip-theme-bg-color);
    box-shadow: 0 4px 16px #00000029;
    word-wrap: break-word;
    left: 36%;
    translate: -50% calc(-100% - 1em);
    display: none;
  }

  .personage:before {
    content: '';
    position: absolute;
    bottom: -15px;
    width: 20px;
    height: 20px;
    background-color: var(--tooltip-theme-bg-color);
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
    border-radius: 1px;
    z-index: 1500;
  }
}

.yk-image-preview__toolbar-btn {
  width: 36px;
  height: 36px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  color: #374151;
  background: transparent;
  transition: background 0.2s ease;
  cursor: pointer;
}

.yk-tooltip:hover {
  .yk-image-preview__toolbar-btn {
    background: #f3f3f4;
  }

  .personage {
    display: block;
  }
}
</style>
