import {ip} from '../stores/ipconfig.js'
// 静态图片配置（读取后端的图片列表，让前端小程序的代母不会因为打包体积影响性能）
const twoPng = ip + '/public/two.png';
const searchPng = ip + '/public/search.png'
const huibaoPng = ip + '/public/huibao.png'
const cahxunPng = ip + '/public/cahxun.png'
const CobblerPng = ip + '/public/Cobbler.png'
const kefuPnmg = ip + '/public/liaotian.png'
const setPng = ip + '/public/set.png'
const xiangyouPng = ip + '/public/xiangyou.png'
const fanhuiPng = ip + '/public/fanhui.png'
const wxxchatPng = ip + '/public/weix.png'
const QQicuon = ip + '/public/qq.png'
const offPng = ip + '/public/off.png'
const binggoPng = ip + '/public/binggo.png'

export function Photo() {
    return {
        twoPng,
        searchPng,
        huibaoPng,
        cahxunPng,
        CobblerPng,
        kefuPnmg,
        setPng,
        xiangyouPng,
        fanhuiPng,
        wxxchatPng,
        QQicuon,
        offPng,
        binggoPng
    }
}