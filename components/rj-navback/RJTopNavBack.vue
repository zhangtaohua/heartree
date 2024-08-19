<template>
  <view class="row_nw_fs_center nav_container">
    <view class="image_box" @tap="changeNavbar">
      <image
        v-if="isBlueMode"
        class="image_show"
        mode="aspectFill"
        src="@/assets/images/common/backWhite.svg"
      ></image>
      <image
        v-else
        class="image_show"
        mode="aspectFill"
        src="@/assets/images/common/back.svg"
      ></image>
    </view>

    <view class="row_nw_center_center tabbar_item" :class="{ tabbar_item_white: isBlueMode }">{{
      navBarData.name
    }}</view>
  </view>
</template>

<script setup>
// import { popRouteStatus } from "@/store/api/route"

const props = defineProps({
  isBlueMode: {
    type: Boolean,
    default: false,
  },
  navBarData: {
    type: Object,
    default() {
      return {
        name: "",
        backUrl: "",
        isTabBar: false,
      };
    },
  },
});

// console.log("backUrl", props.navBarData)

function changeNavbar() {
  // popRouteStatus()
  // if(!props.navBarData.isTabBar) {
  // 	uni.navigateBack()
  // } else {
  // 	const backUrl = props.navBarData.backUrl
  // 	uni.switchTab({
  // 		url: backUrl ? backUrl : '/pages/home/home'
  // 	})
  // }
}
</script>

<style scoped lang="scss">
.nav_container {
  position: relative;
  width: 750rpx;
  height: 54rpx;
}

.image_box {
  position: absolute;
  left: 32rpx;
  top: 11rpx;
  width: 20rpx;
  height: 32rpx;
  cursor: pointer;
}

.image_show {
  width: 100%;
  height: 100%;
}

.tabbar_item {
  width: 750rpx;
  height: 44rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #101010;
  cursor: pointer;
}

.tabbar_item_white {
  color: #ffffff;
}
</style>
