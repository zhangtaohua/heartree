<template>
	<view class="row_nw_center_center st_content">
		<image class="st_bg" src="@/assets/images/fake/tree.webp"></image>
		<view class="col_nw_fs_center st_text">
			<text class="row_nw_center_center title_wel">欢迎来到</text>
			<text class="row_nw_center_center title_name">心情日记</text>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
	.st_content {
    position: relative;
    width: 750rpx;
    height: 100vh;
	}

	.st_bg {
    position: absolute;
    width: 750rpx;
    height: auto;
    z-index: 0;
	}

	.title_wel {
    width: 720rpx;
    height: 60rpx;
    font-size: 60rpx;
    font-weight: bold;
    margin-top: 250rpx;
	}

	.title {
    width: 720rpx;
    height: 60rpx;
    font-size: 60rpx;
    font-weight: bold;
    margin-top: 250rpx;
	}
</style>
