// ../../../../../Documents/web/Marex-APP/DashinHolding/node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-app/dist/uni-app.es.js
import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from "vue";
import { hasOwn, isString } from "@vue/shared";
var sanitise = (val) => val && JSON.parse(JSON.stringify(val)) || val;
var UNI_SSR = "__uniSSR";
var UNI_SSR_DATA = "data";
var UNI_SSR_GLOBAL_DATA = "globalData";
var ON_SHOW = "onShow";
var ON_HIDE = "onHide";
var ON_LAUNCH = "onLaunch";
var ON_ERROR = "onError";
var ON_THEME_CHANGE = "onThemeChange";
var ON_PAGE_NOT_FOUND = "onPageNotFound";
var ON_UNHANDLE_REJECTION = "onUnhandledRejection";
var ON_READY = "onReady";
var ON_UNLOAD = "onUnload";
var ON_RESIZE = "onResize";
var ON_BACK_PRESS = "onBackPress";
var ON_PAGE_SCROLL = "onPageScroll";
var ON_TAB_ITEM_TAP = "onTabItemTap";
var ON_REACH_BOTTOM = "onReachBottom";
var ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
var ON_SHARE_TIMELINE = "onShareTimeline";
var ON_ADD_TO_FAVORITES = "onAddToFavorites";
var ON_SHARE_APP_MESSAGE = "onShareAppMessage";
var ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
var ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
var ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
var ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
var ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
function getSSRDataType() {
  return getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA;
}
function assertKey(key, shallow = false) {
  if (!key) {
    throw new Error(`${shallow ? "shallowSsrRef" : "ssrRef"}: You must provide a key.`);
  }
}
var ssrClientRef = (value, key, shallow = false) => {
  const valRef = shallow ? shallowRef(value) : ref(value);
  if (typeof window === "undefined") {
    return valRef;
  }
  const __uniSSR = window[UNI_SSR];
  if (!__uniSSR) {
    return valRef;
  }
  const type = getSSRDataType();
  assertKey(key, shallow);
  if (hasOwn(__uniSSR[type], key)) {
    valRef.value = __uniSSR[type][key];
    if (type === UNI_SSR_DATA) {
      delete __uniSSR[type][key];
    }
  }
  return valRef;
};
var globalData = {};
var ssrRef = (value, key) => {
  return ssrClientRef(value, key);
};
var shallowSsrRef = (value, key) => {
  return ssrClientRef(value, key, true);
};
function getSsrGlobalData() {
  return sanitise(globalData);
}
function resolveEasycom(component, easycom) {
  return isString(component) ? easycom : component;
}
var createHook = (lifecycle) => (hook, target = getCurrentInstance()) => (
  // post-create lifecycle registrations are noops during SSR
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target)
);
var onShow = createHook(ON_SHOW);
var onHide = createHook(ON_HIDE);
var onLaunch = createHook(ON_LAUNCH);
var onError = createHook(ON_ERROR);
var onThemeChange = createHook(ON_THEME_CHANGE);
var onPageNotFound = createHook(ON_PAGE_NOT_FOUND);
var onUnhandledRejection = createHook(ON_UNHANDLE_REJECTION);
var onReady = createHook(ON_READY);
var onUnload = createHook(ON_UNLOAD);
var onResize = createHook(ON_RESIZE);
var onBackPress = createHook(ON_BACK_PRESS);
var onPageScroll = createHook(ON_PAGE_SCROLL);
var onTabItemTap = createHook(ON_TAB_ITEM_TAP);
var onReachBottom = createHook(ON_REACH_BOTTOM);
var onPullDownRefresh = createHook(ON_PULL_DOWN_REFRESH);
var onShareTimeline = createHook(ON_SHARE_TIMELINE);
var onAddToFavorites = createHook(ON_ADD_TO_FAVORITES);
var onShareAppMessage = createHook(ON_SHARE_APP_MESSAGE);
var onNavigationBarButtonTap = createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
var onNavigationBarSearchInputChanged = createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
var onNavigationBarSearchInputClicked = createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
var onNavigationBarSearchInputConfirmed = createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
var onNavigationBarSearchInputFocusChanged = createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED);
export {
  getSsrGlobalData,
  onAddToFavorites,
  onBackPress,
  onError,
  onHide,
  onLaunch,
  onNavigationBarButtonTap,
  onNavigationBarSearchInputChanged,
  onNavigationBarSearchInputClicked,
  onNavigationBarSearchInputConfirmed,
  onNavigationBarSearchInputFocusChanged,
  onPageNotFound,
  onPageScroll,
  onPullDownRefresh,
  onReachBottom,
  onReady,
  onResize,
  onShareAppMessage,
  onShareTimeline,
  onShow,
  onTabItemTap,
  onThemeChange,
  onUnhandledRejection,
  onUnload,
  resolveEasycom,
  shallowSsrRef,
  ssrRef
};
//# sourceMappingURL=@dcloudio_vue-cli-plugin-uni_packages_uni-app.js.map
