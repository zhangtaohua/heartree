<script>
import { resetScreen } from "@/utils/system/screen";

export default {
  onLaunch: function () {
    console.log("App Launch");
    // 设置手机屏幕器方向。
    resetScreen();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/assets/style/flex.scss";
@import "@/assets/style/general.scss";
</style>
