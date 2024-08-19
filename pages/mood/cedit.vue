<template>
  <view class="col_nw_fs_center ce_one_box_one">
    <RjTopNavBack :isBlueMode="true"></RjTopNavBack>
    <view class="top_hgap"></view>
    <scroll-view
      class="ce_one_box_two"
      scroll-y="true"
      show-scrollbar="false"
      enable-flex="true"
      @scrolltolower="scrollHandle"
    >
      <view class="col_nw_fs_fs ce_one_box_three">
        <view style="flex: 1; width: 100%">
          <view style="border: 1px solid #ccc">
            <view id="editorToolbar" style="border-bottom: 1px solid #ccc; min-height: 20px"></view>
            <view id="editorTextarea" style="height: 400px"></view>
          </view>
        </view>
      </view>

      <view class="ce_one_box_four">
        <!-- <RjZColorPicker v-model:value="states.colors"></RjZColorPicker> -->
        <zebra-color-picker v-model="states.colors"></zebra-color-picker>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import {
  defineComponent,
  reactive,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  getCurrentInstance,
} from "vue";

import RjTopNavBack from "@/components/rj-navback/RjTopNavBack.vue";
import RjZColorPicker from "@/components/rj-color/rj-z-color-picker/rj-z-color-picker.vue";
import RjColorPicker from "@/components/rj-color/RjColorPicker.vue";

export default defineComponent({
  name: "Cedit",
  components: { RjTopNavBack, RjZColorPicker, RjColorPicker, ZebraColorPicker },
  setup() {
    let currentPage = 0;
    function scrollHandle() {
      currentPage++;
    }

    let inputFeatureEditor = null;
    let inputFeatureToolbar = null;
    let inputRichCtx = "";

    let states = reactive({
      colors: {
        hex: "#7ED321",
      },
    });

    onMounted(() => {
      // initEditor();
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      if (inputFeatureEditor == null) {
        return;
      } else {
        inputFeatureEditor.blur();
        setTimeout(() => {
          inputFeatureEditor.destroy();
          inputFeatureEditor = null;
          inputFeatureToolbar = null;
        }, 100);
      }
    });

    // #ifdef MP-WEIXIN || H5 || APP-PLUS
    const instance = getCurrentInstance();
    const query = uni.createSelectorQuery().in(instance.proxy);
    // #endif

    return {
      scrollHandle,
      states,
    };
  },
});
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

.ce_one_box_three {
  width: 100%;
  height: auto;
}

.ce_one_box_four {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
