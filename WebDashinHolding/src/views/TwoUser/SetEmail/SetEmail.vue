<script setup lang="ts">
import {SetUser} from '@/stores/setUser'
import {ball} from '@/utils/showMessAge'

const {open2} = ball()
import {useRouter} from "vue-router";

const router = useRouter()
const {inpEmail, setEmail} = SetUser()
import {useLogin} from '@/stores/useLogin'

const {StoreCookies, readCookes} = useLogin()

function save() {
  setEmail(() => {
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
      <div class="baoc" @click="save">
        保存
      </div>
    </template>
    <template v-slot:mian>
      <div class="main">
        <div class="inp">
          <input type="text" name="" id="" v-model="inpEmail">
        </div>
      </div>
    </template>
  </RoutingAnimation>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 16px;
  background: #fff;

  .inp {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #212121;

    input {
      display: flex;
      flex: 1;
      height: 100%;
    }
  }

  p {
    color: #4a4a4a;
    margin-top: 10px;
  }

  .baoc {
    width: 50px;
    height: 20px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
