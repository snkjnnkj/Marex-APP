import {ref} from 'vue';
import {useLogin} from '@/stores/useLogin.js'
import {setUserAvatar, setUserEmail, setUserSex, setUserName, setUserPhone, uploadingPhoto} from '@/api/index.js'
import Cookies from "js-cookie";
import {ball} from '@/utils/showMessAge'

const {open2} = ball()
import {IpSite} from '@/stores/IpSite.js'

const {userCookes, userData, StoreCookies, readCookes} = useLogin()
//储存修改昵称的变量
const inpName = ref(userCookes.value.username);
//储存修改邮箱的变量
const inpEmail = ref(userCookes.value.email == '' ? '未填写' : userCookes.value.email)
//储存修改手机号的变量
const inpPhone = ref(userCookes.value.phone);
//存储修改性别的变量
const inpSex = ref(userCookes.value.sex == null ? '未知' : userCookes.value.sex)
// 储存图片的变量
const file = ref(null)

/*上传图片到服务器*/
async function uploadPictures(e) {
  file.value = e.target.files[0]
  if (file.value) {
    const formData = new FormData()
    // 注意这里的 'image' 对应后端使用 multer 时定义的字段名称
    formData.append('image', file.value)
    const response = await uploadingPhoto(formData)
    if (response.code === 200) {
      console.log(response.data[0].filename)
      setAvatar(`${IpSite}/uploads/${response.data[0].filename}`)
    }
  }
}

/*修改数据库的头像路径*/
async function setAvatar(i) {
  const res = await setUserAvatar({
    price: i,
    id: userCookes.value.id
  })
  console.log(res.data[0])
  if (res.code === 200) {
    userData.value = res.data[0]
    open2({
      x: '更新成功',
      time: 3000,
      close: () => {
        StoreCookies() //修改Cookes值
        readCookes()//读取Cookes值
      }
    })
  }
}

/*修改昵称*/
async function setName(callBack) {
  const res = await setUserName({
    price: inpName.value,
    id: userCookes.value.id
  })
  if (res.code === 200) {
    userData.value = res.data[0]
    if (callBack) {
      callBack()
    }
    return true
  }
}

/*修改手机号*/
async function setPhone(callBack) {
  const res = await setUserPhone({
    price: inpPhone.value,
    id: userCookes.value.id
  })
  if (res.code === 200) {
    userData.value = res.data[0]
    if (callBack) {
      callBack()
    }
    return true
  }
}

/*修改邮箱账号*/
async function setEmail(callBack) {
  const res = await setUserEmail({
    price: inpEmail.value,
    id: userCookes.value.id
  })
  if (res.code === 200) {
    userData.value = res.data[0]
    if (callBack) {
      callBack()
    }
    return true
  }
}

/*修改性别*/
async function setSex(callBack) {
  const res = await setUserSex({
    price: inpSex.value,
    id: userCookes.value.id
  })
  if (res.code === 200) {
    userData.value = res.data[0]
    if (callBack) {
      callBack()
    }
    return true
  }
}

export function SetUser() {
  return {
    inpName,
    inpEmail,
    inpPhone,
    inpSex,
    setName,
    setPhone,
    setEmail,
    setSex,
    setAvatar,
    uploadPictures,
  }
}