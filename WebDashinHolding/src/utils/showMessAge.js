import {ElMessage} from 'element-plus'
import {ElNotification} from 'element-plus'
/* 绿色，可用于验证通过 */
const open1 = (x) => {
    ElMessage(x)
}
/* 黄色，可用于正在验证啊或者请稍后的意思 */
const open2 = (data) => {
    let {x, time, close = () => {}} = data
    ElMessage({
        message: x,
        type: 'success',
        duration: time,
        onClose: () => {
            close()
        },
    })
}
/* 灰色，可用于？？？ */
const open3 = (x) => {
    ElMessage({
        message: x,
        type: 'warning',
    })
}
/* 红色，用于各种报错场景 */
const open4 = (x, time) => {
    ElMessage({
        message: x,
        type: 'error',
        duration: time,
    })
}
export const ball = () => {
    return {
        open1,
        open2,
        open3,
        open4,
    }
}
