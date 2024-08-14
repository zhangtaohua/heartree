<template>
<view class="col_nw_fs_center ce_one_box_one">
  <TopNavBack :isBlueMode="true" :navBarData="topNavBackData"></TopNavBack>
  <view class="top_hgap"></view>
  <scroll-view class="ce_one_box_two" scroll-y="true" show-scrollbar="false" enable-flex="true"
			@scrolltolower="scrollHandle"
		>
  </scroll-view>
</view>
</template>

<script>
import { defineComponent, reactive, } from "vue"
	import TopNavBack from "@/components/common/TopNavBack.vue"

export default defineComponent({
  name: "Login",
  components: {},
  setup() {

    let currentPage = 0
    function scrollHandle() {
      currentPage++
    }

    return {
      scrollHandle,
    }
  }
})

</script>

<style scoped lang="scss">
$work_occupied_height: 54rpx + 26rpx + 80rpx + 28rpx + 64rpx;

.ce_one_box_one {
  width: 750rpx;
  height: 100vh;
}

.top_hgap {
  width: 750rpx;
  height: 26rpx;
}

.ce_one_box_two {
  width: 750rpx;
  height: calc(100% - $work_occupied_height - var(--status-bar-height));
  margin-top: 32rpx;
  margin-bottom: 32rpx;
  z-index: 2;
}
</style>