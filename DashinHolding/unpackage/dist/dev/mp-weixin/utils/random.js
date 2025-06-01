"use strict";
function getMathRandom() {
  let result = parseInt(Math.random() * 1e6) + 1e6;
  return result.toString().slice(0, 6);
}
exports.getMathRandom = getMathRandom;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/random.js.map
