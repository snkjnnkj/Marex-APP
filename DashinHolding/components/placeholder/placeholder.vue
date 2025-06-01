<template>
	<view class="box-title" :style="{ height: `${navBarHeight}px` }"></view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	const title = ref('这个是主页面')
	// 核心数据
	const navBarHeight = ref(0) // 导航栏总高度
	const statusBarHeight = ref(0) // 状态栏高度
	const titleBarHeight = ref(50) // 默认标题栏高度
	const menuButtonWidth = ref(87) // 胶囊按钮宽度
	onMounted(() => {
		const systemInfo = uni.getSystemInfoSync()
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

		// 计算状态栏高度（兼容安卓）
		statusBarHeight.value = systemInfo.statusBarHeight ||
			(systemInfo.platform === 'android' ? 55 : 20)

		// 计算标题栏高度
		if (menuButtonInfo.top) {
			titleBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height
		}

		// 计算总高度
		navBarHeight.value = statusBarHeight.value + titleBarHeight.value

		// 记录胶囊按钮宽度用于右侧留白
		menuButtonWidth.value = systemInfo.windowWidth - menuButtonInfo.right + 6
	})
</script>

<style scoped lang="scss">

</style>