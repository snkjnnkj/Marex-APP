<script setup lang="ts">
import {onMounted, ref} from 'vue';
import RoutingAnimation from "@/components/PublicUi/RoutingAnimation/RoutingAnimation.vue";
import {SetUser} from '@/stores/setUser'
import {useRouter} from "vue-router";
import {useLogin} from '@/stores/useLogin'

const {userCookes, StoreCookies, readCookes} = useLogin()
import {ball} from '@/utils/showMessAge'

const {open2} = ball()
const router = useRouter();
const {inpSex, setSex} = SetUser()
const obj = [
  {
    id: 1,
    text: '男'
  },
  {
    id: 2,
    text: '女'
  },
  {
    id: 3,
    text: '未知'
  }
]
const select = ref()
onMounted(() => {
  if (userCookes.value.sex == '男') {
    select.value = 0
    inpSex.value = '男'
  } else if (userCookes.value.sex == '女') {
    select.value = 1
    inpSex.value = '女'
  } else if (userCookes.value.sex == '未知') {
    select.value = 2
    inpSex.value = '未知'
  }
})

function btnSelect(index, text) {
  select.value = index;
  inpSex.value = text;
}

function confirm() {
  setSex(() => {
    StoreCookies()
    readCookes()
    open2({
      x: '更新成功',
      time: 3000
    })
  })
  router.push('/PersonagePage')
}
</script>

<template>
  <RoutingAnimation :rou="'/PersonagePage'" :title="'修改昵称'">
    <template v-slot:function>
      <div class="baoc" @click="confirm">
        保存
      </div>
    </template>
    <template v-slot:mian>
      <div class="main">
        <div class="select" v-for="(i,index) in obj" :key="i.id" @click="btnSelect(index,i.text)">
          <span>{{ i.text }}</span>
          <svg :class="{none:index === select}" t="1747598317427" class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="3888" width="20" height="20">
            <path
                d="M665.6 204.8H358.4c-84.48 0-153.6 69.12-153.6 153.6v307.2c0 84.48 69.12 153.6 153.6 153.6h307.2c84.48 0 153.6-69.12 153.6-153.6V358.4c0-84.48-69.12-153.6-153.6-153.6z"
                fill="#CCDAFF" p-id="3889"></path>
            <path
                d="M647.68 446.976L485.376 609.28s0 0.512-0.512 0.512c-6.656 6.656-16.896 8.192-25.088 5.12-2.56-1.024-5.632-2.56-7.68-5.12l-75.776-75.776c-9.216-9.216-9.216-23.552 0-32.768s23.552-9.216 32.768 0l59.904 59.904L615.424 414.72c9.216-9.216 23.552-9.216 32.768 0s8.704 23.04-0.512 32.256z"
                fill="#7A7AF9" p-id="3890"></path>
          </svg>
        </div>
      </div>
    </template>
  </RoutingAnimation>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background: #fff;

  .select {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;

    svg {
      display: none;
    }

    .none {
      display: block;
    }
  }

  .select:hover {
    background: #f5f8f8;
  }

  .baoc {
    width: 50px;
    height: 20px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
