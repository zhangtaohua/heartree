<template>
  <view class="nav_simple" :class="haveBg ? 'have-bg' : ''">
    <image
      class="back_image"
      mode="widthFix"
      src="@/assets/images/common/back.svg"
      @click="handleBack"
    ></image>
    <text>{{ title }}</text>
  </view>
</template>

<script setup>
const props = defineProps({
  haveBg: {
    type: Boolean,
    default() {
      return false;
    },
  },
  title: {
    type: String,
    default() {
      return "";
    },
  },
});

function handleBack() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.nav_simple {
  font-size: 32rpx;
  font-weight: bold;
  color: #101010;
  padding: 104rpx 32rpx 28rpx;
  background-color: #ffffff;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .back_image {
    width: 20rpx;
  }

  text {
    flex: 1;
  }
}

.have-bg {
  background: linear-gradient(180deg, #ebf3ff 0%, #f5f9ff 48%, #ffffff 100%);
}
</style>
