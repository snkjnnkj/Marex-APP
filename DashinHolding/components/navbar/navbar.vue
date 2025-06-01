<template>
	<!-- 自定义导航栏容器 -->
	<view class="custom-navbar" :style="{ height: `${navBarHeight}px` }">
		<!-- 状态栏占位 -->
		<view class="status-bar" :style="{ height: `${statusBarHeight}px` }"></view>
		<!-- 导航内容区域 -->
		<view class="nav-content" :style="{ height: `${titleBarHeight}px` }">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

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
			(systemInfo.platform === 'android' ? 52 : 20)

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

<style scoped>
	/* 导航栏容器 */
	.custom-navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: rgba(61, 199, 153, 0.32);
		/* box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06); */
	}

	/* 导航内容区域 */
	.nav-content {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}

	/* 右侧占位 */
	.right-placeholder {
		visibility: hidden;
	}
</style>