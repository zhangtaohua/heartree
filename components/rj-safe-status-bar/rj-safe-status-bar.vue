<template>
  <view :style="[style]" class="rj_status_bar">
    <slot />
  </view>
</template>

<script setup>
// StatbusBar 状态栏占位
import { computed } from "vue";

const props = defineProps({
  bgColor: {
    type: String,
    default: "black",
    // default: uni.$u.props.statusBar.bgColor,
  },
});

const style = computed(() => {
  const style = {};
  // 状态栏高度，由于某些安卓和微信开发工具无法识别css的顶部状态栏变量，所以使用js获取的方式
  style.height = uni.$u.addUnit(uni.$u.sys().statusBarHeight, "px");
  style.backgroundColor = this.bgColor;
  return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
});
</script>

<style lang="scss" scoped>
.rj_status_bar {
  // nvue会默认100%，如果nvue下，显式写100%的话，会导致宽度不为100%而异常
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
}
</style>
