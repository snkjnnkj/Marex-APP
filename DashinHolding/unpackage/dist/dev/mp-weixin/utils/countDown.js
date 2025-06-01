"use strict";
const common_vendor = require("../common/vendor.js");
function useCountDown() {
  const countdown = common_vendor.ref("获取验证码");
  const isCounting = common_vendor.ref(false);
  let timer = null;
  const startCountdown = () => {
    return new Promise((resolve) => {
      isCounting.value = true;
      countdown.value = 60;
      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          countdown.value = "获取验证码";
          isCounting.value = false;
          resolve();
        }
      }, 1e3);
    });
  };
  const handleClick = async (callback) => {
    if (!isCounting.value) {
      await startCountdown();
      if (callback) {
        await callback();
      }
    }
  };
  const stop = () => {
    if (timer) {
      clearInterval(timer);
      isCounting.value = false;
      countdown.value = "获取验证码";
    }
  };
  return {
    countdown,
    handleClick,
    stop
  };
}
exports.useCountDown = useCountDown;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/countDown.js.map
