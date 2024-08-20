<template>
  <view class="col_nw_fs_center rj_sm_econtainer">
    <view id="editorToolbar" class="col_nw_fs_center rj_sm_toolbar"></view>
    <view id="editorTextarea" class="col_nw_fs_center rj_sm_textarea"></view>
  </view>
</template>

<script setup>
import {
  defineComponent,
  reactive,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  getCurrentInstance,
} from "vue";

// import RjZColorPicker from "@/components/rj-color/rj-color-picker/RjColorPicker.vue";
// import RjColorPickerSketch from "@/components/rj-color/rj-color-picker/RjColorPickerSketch.vue";
// import RjColorPicker from "@/components/rj-color/RjColorPicker.vue";
// import RjEditor from "@/components/rj-editor/rj-sp-editor/sp-editor.vue";
let inputFeatureEditor = null;
let inputFeatureToolbar = null;
let inputRichCtx = "";

onMounted(() => {
  // initEditor();
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {});

// #ifdef MP-WEIXIN || H5 || APP-PLUS
const instance = getCurrentInstance();
const query = uni.createSelectorQuery().in(instance.proxy);
// #endif
</script>

<style scoped lang="scss">
$work_occupied_height: 54rpx + 26rpx + 80rpx + 28rpx + 64rpx;

.rj_sm_econtainer {
  width: 750rpx;
  height: auto;
  min-height: 120rpx;
}

.rj_sm_toolbar {
  width: 750rpx;
  height: 48rpx;
}

.rj_sm_textarea {
  width: 750rpx;
  height: 64rpx;
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}
</style>
