import "@/assets/Style/reset.css"
import "@/assets/Style/color.css"
import "@/assets/Style/publicStyle.css"
/* element-plus的样式代码 */
import 'element-plus/dist/index.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

/*==============================================*/
//顶部页面加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: 'ease',
    speed: 600,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
})
//路由监听
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    await new Promise((resolve) => setTimeout(resolve, 100))
    next()
})
//路由跳转结束
router.afterEach(() => {
    NProgress.done()
})
/*==============================================*/