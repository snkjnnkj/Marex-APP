<script setup>
import {ref} from 'vue'
import from from '@/components/Main/form/from.vue'
import {useRepairs} from '@/stores/useRepairs'
import {onMounted} from "vue";
import {setRepairs} from '@/api/index'

const repairRecords = ref([])

async function setRepairsData() {
  const res = await setRepairs()
  repairRecords.value = res
  repairRecords.value.sort((a, b) => a.id - b.id)
}

onMounted(() => {
  // await fetchRepairRecords()
  setRepairsData()
})
</script>

<template>
  <div class="Examine">
    <div class="top-title">
      <h3 class="yk-title">维修派遣</h3><!---->
      <div class="option">

      </div>
    </div>
    <div class="main">
      <from></from>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Examine {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  --padding: 0 20px; //css变量，用于内边距
  --boderRadius: 4px; // 通用变量，用于圆角
  padding-top: 12px;
  position: relative;

  .top-title {
    height: 48px;
    display: flex;
    align-items: center;
    padding: var(--padding);
    background: var(--bgColor2);
    border-radius: var(--boderRadius);
    justify-content: space-between;

    .option {
      width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }

  .main {
    width: 100%;
    height: 70vh;
    background: #fff;
    border-radius: 4px;
    overflow: auto;

  }
}
</style>
