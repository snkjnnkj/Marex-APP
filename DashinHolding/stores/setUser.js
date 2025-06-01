import {ref} from 'vue'
import {ip} from "@/stores/ipconfig";
import {useLogin} from "@/stores/useLogin";

const {cookesUser, getUserInfo} = useLogin()

const images = ref('')

// 选多图并上传
function chooseImages() {
    uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: chooseRes => {
            const paths = chooseRes.tempFilePaths;
            const uploadTasks = paths.map(p => new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: ip + '/app/upload',
                    filePath: p,
                    name: 'files',
                    formData: {},
                    success: uRes => {
                        try {
                            const json = JSON.parse(uRes.data);
                            if (json.success) {
                                resolve(json.data)
                            } else {
                                reject(json)
                            }
                        } catch (err) {
                            reject(err);
                        }
                    },
                    fail: reject
                });
            }));

            // 并行上传所有选中的
            Promise.all(uploadTasks)
                .then(results => {
                    // results 是多个[ {filename,url}, ... ]
                    // 合并到 images
                    results.flat().forEach(img => {
                        images.value = ip + '/uploads/' + img.url
                    });
                    set(images.value)
                    uni.showToast({title: '修改成功', icon: 'success'});
                })
                .catch(err => {
                    console.error('上传错误', err);
                    uni.showToast({title: '上传失败', icon: 'none'});
                });
        }
    });
}

//封装一个post请求
async function getRegisterCode(data) {
    return await uni.request({
        url: ip + '/app/setAvatar',
        method: 'GET',
        data
    });
}

async function set(img) {
    const res = await getRegisterCode({
        price: img,
        id: cookesUser.value.id
    })
    uni.setStorageSync('user', res.data.data[0]);
    getUserInfo();
}

/*xiu==================================*/
//修改名称
const inpName = ref(cookesUser.value.username);

async function setNameData(data) {
    return await uni.request({
        url: ip + '/app/setName',
        method: 'GET',
        data
    });
}

async function setName() {
    const res = await setNameData({
        price: inpName.value,
        id: cookesUser.value.id
    })
    if (res.data.code === 200) {
        uni.setStorageSync('user', res.data.data[0]);
        getUserInfo();
        uni.showToast({title: '修改成功', icon: 'success'});
    }
}

/*======================================================*/

//修改性别
async function setSexData(data) {
    return await uni.request({
        url: ip + '/app/setSex',
        method: 'GET',
        data
    });
}

async function setSex(sex) {
    const res = await setSexData({
        price: sex,
        id: cookesUser.value.id
    })
    if (res.data.code === 200) {
        uni.setStorageSync('user', res.data.data[0]);
        getUserInfo();
        uni.showToast({title: '修改成功', icon: 'success'});
    }
}

/*======================================================*/

/*======================================================*/
const inpEmail = ref(cookesUser.value.email == '' ? '未填写' : cookesUser.value.email)

//修改邮箱地址
async function setEmailData(data) {
    return await uni.request({
        url: ip + '/app/setEmail',
        method: 'GET',
        data
    });
}

async function setEmail() {
    const res = await setEmailData({
        price: inpEmail.value,
        id: cookesUser.value.id
    })
    if (res.data.code === 200) {
        uni.setStorageSync('user', res.data.data[0]);
        getUserInfo();
        uni.showToast({title: '修改成功', icon: 'success'});
    }
}

/*======================================================*/

/*======================================================*/
//修改手机号
const inpPhone = ref(cookesUser.value.phone)

async function setPhoneData(data) {
    return await uni.request({
        url: ip + '/app/setPhone',
        method: 'GET',
        data
    });
}

async function setPhone() {
    const res = await setPhoneData({
        price: inpPhone.value,
        id: cookesUser.value.id
    })
    if (res.data.code === 200) {
        uni.setStorageSync('user', res.data.data[0]);
        getUserInfo();
        uni.showToast({title: '修改成功', icon: 'success'});
    }
}

/*======================================================*/

/*======================================================*/

//修改教师认证编号，（输入的值先和后端数据库进行比对，如果数据库没有改认证数据表就直接提示）
const inpTeacher = ref(cookesUser.value.teacher)

async function setTeacherData(data) {
    return await uni.request({
        url: ip + '/app/setTeacher',
        method: 'GET',
        data
    });
}

async function setTeacher() {
    const res = await setTeacherData({
        price: inpTeacher.value,
        id: cookesUser.value.id
    })
		console.log(res.data)
    if (res.data.code === 200) {
        uni.setStorageSync('user', res.data.data[0]);
        getUserInfo();
        uni.showToast({title: '修改成功', icon: 'success'});
    }
}

export function SetUser() {
    return {
        chooseImages,
        set,
        inpName,
        setName,
        setSex,
        inpEmail,
        setEmail,
        inpPhone,
        setPhone,
        inpTeacher,
        setTeacher
    }
}