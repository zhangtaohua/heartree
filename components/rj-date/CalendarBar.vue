<template>
	<view class="row_nw_sb_center calendar_container"
		@tap="sendTap"
	>
		<view class="row_nw_fs_center calendar_box">
			<image class="image_label" mode="aspectFill"
				src="@/static/images/workbench/date.svg"></image>
			<view class="row_nw_fs_center calendar_show">{{ date }}</view>
		</view>
		<image class="image_down" mode="aspectFill"
			src="@/static/images/workbench/downarrow.svg"></image>
	</view>
</template>

<script setup>	
	const props = defineProps({
		date: {
			type: String,
			default() {
				return ""
			}
		}
	})
	
	const emits = defineEmits(["onChange"])
	function sendTap() {
		emits("onChange")
	}
	
</script>

<style scoped lang="scss">
	.calendar_container {
		position: relative;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		border: 2rpx solid #D1D1D1;
		border-radius: 8rpx;
	}
	
	.calendar_box {
		width: 75%;
		height: 100%;
		margin-left: 22rpx;
	}

	.image_label {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}

	.calendar_show {
		width: max-content;
		height: 100%;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #35383E;
	}

	.image_down {
		width: 24rpx;
		height: 14rpx;
		margin-right: 22rpx;
	}
	
	.image_down_r {
		transform: rotate(180deg);
	}
</style>
