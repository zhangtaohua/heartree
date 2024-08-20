<template>
  <view class="col_nw_fs_center ce_container">
    <RjTopNavBack :isBlueMode="true"></RjTopNavBack>
    <view class="top_hgap"></view>
    <scroll-view
      class="col_nw_fs_fs ce_wraper red_debug"
      scroll-y="true"
      show-scrollbar="false"
      enable-flex="true"
      @scrolltolower="scrollHandle"
    >
      <view class="col_nw_fs_center ce_first red_debug">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">记一记</text>
        </view>
        <view class="row_nw_fs_center ce_first_two">
          <textarea
            v-model="states.content"
            :maxlength="99999"
            class="ce_first_textarea"
            placeholder-style="color:#F76260"
            placeholder="占位符字体是红色的"
            cursor-color="#F76260"
            :auto-height="true"
          ></textarea>
        </view>
      </view>

      <!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
      <view class="col_nw_fs_center ce_first red_debug">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">说一说</text>
        </view>
        <view v-if="states.hasRecord">
          <button v-if="states.recordPause" type="primary">继续</button>
          <button v-else type="primary">暂停</button>

          <button type="warn">停止</button>
          <button type="warn">播放</button>
          <button type="warn">重录</button>
        </view>
        <view v-else>
          <button type="primary" @click="">录音</button>
        </view>
      </view>
      <!-- #endif -->

      <view class="col_nw_fs_center ce_first">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">心情色</text>
        </view>
        <view class="row_nw_center_center ce_first_three">
          <RjColorPickerSketch v-model:value="states.colors"></RjColorPickerSketch>
        </view>
      </view>

      <view class="col_nw_fs_center ce_first">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">心情分</text>
        </view>
        <view class="ce_first_four">
          <slider
            min="0"
            max="10"
            value="8"
            step="1"
            show-value
            @change="sliderChange"
            activeColor="#FFCC33"
            backgroundColor="#000000"
            block-color="#8A6DE9"
            block-size="20"
          />
        </view>
      </view>

      <view class="col_nw_fs_center ce_first">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">心情仪式</text>
        </view>
        <view class="col_nw_fs_center ce_first_five">
          <view class="row_nw_fs_fs ce_rituals">
            <view
              class="col_nw_fs_center ce_ritual_ibox"
              v-for="(item, index) in rituals"
              :key="item.id"
            >
              <view class="row_nw_center_center ce_ritual_img">
                <image mode="aspectFit" :src="item.image"></image>
              </view>
              <view class="row_nw_center_center ce_ritual_label">{{ item.label }}</view>
            </view>
          </view>
          <view class="row_nw_fs_fs ce_ceremony">{{
            rituals[states.ritualIndex].ceremonys[states.cereIndex]
          }}</view>
          <view class="row_nw_fs_fs ce_tips"> {{ rituals[states.ritualIndex].tip }} </view>
        </view>
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
import RjZColorPicker from "@/components/rj-color/rj-color-picker/RjColorPicker.vue";
import RjColorPickerSketch from "@/components/rj-color/rj-color-picker/RjColorPickerSketch.vue";
// import RjColorPicker from "@/components/rj-color/RjColorPicker.vue";
// import RjEditor from "@/components/rj-editor/rj-sp-editor/sp-editor.vue";

import dogpng from "@/assets/images/fake/dog.jpg";
import catpng from "@/assets/images/fake/cat.jpg";

export default defineComponent({
  name: "Cedit",
  components: { RjTopNavBack, RjZColorPicker, RjColorPickerSketch },
  setup() {
    // #ifdef MP-WEIXIN || H5 || APP-PLUS
    const instance = getCurrentInstance();
    const query = uni.createSelectorQuery().in(instance.proxy);
    // #endif

    let currentPage = 0;
    function scrollHandle() {
      currentPage++;
    }

    const rituals = [
      {
        id: "rituals_01",
        code: "rituals_01",
        label: "随飞去",
        hasPrice: true,
        tip: "随飞去的会再也找不到了",
        ceremonys: [
          "神呀！请让我的心情永远随飞去吧吧吧111",
          "神呀！请让我的心情永远随飞去吧吧吧222",
          "神呀！请让我的心情永远随飞去吧吧吧333",
          "神呀！请让我的心情永远随飞去吧吧吧444",
          "神呀！请让我的心情永远随飞去吧吧吧555",
          "神呀！请让我的心情永远随飞去吧吧吧666",
          "神呀！请让我的心情永远随飞去吧吧吧777",
          "神呀！请让我的心情永远随飞去吧吧吧888",
          "神呀！请让我的心情永远随飞去吧吧吧999",
          "神呀！请让我的心情永远随飞去吧吧吧000",
        ],
        image: dogpng,
      },
      {
        id: "rituals_02",
        code: "rituals_02",
        label: "黑洞里",
        hasPrice: true,
        tip: "随飞去的会再也找不到了",
        ceremony: [
          "111神呀！让这糟糕的心情永远滚进黑洞里吧",
          "222神呀！让这糟糕的心情永远滚进黑洞里吧",
          "333神呀！让这糟糕的心情永远滚进黑洞里吧",
          "444神呀！让这糟糕的心情永远滚进黑洞里吧",
          "555神呀！让这糟糕的心情永远滚进黑洞里吧",
          "666神呀！让这糟糕的心情永远滚进黑洞里吧",
          "777神呀！让这糟糕的心情永远滚进黑洞里吧",
          "888神呀！让这糟糕的心情永远滚进黑洞里吧",
          "999神呀！让这糟糕的心情永远滚进黑洞里吧",
          "000神呀！让这糟糕的心情永远滚进黑洞里吧",
        ],
        image: catpng,
      },
      {
        id: "rituals_03",
        code: "rituals_03",
        label: "记下来",
        hasPrice: false,
        tip: "记下来随时回味回味",
        ceremony: [
          "111神呀！记下来随时回味回味",
          "222神呀！记下来随时回味回味",
          "333神呀！记下来随时回味回味",
          "444神呀！记下来随时回味回味",
          "555神呀！记下来随时回味回味",
        ],
        image: dogpng,
      },
    ];

    let states = reactive({
      content: "",
      hasRecord: false,
      record: null,
      recordPause: false,
      colors: {
        hex: "#7ED321",
      },
      ritualIndex: 0,
      cereIndex: 0,
    });

    onMounted(() => {
      // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
      initRecord();
      // #endif
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {});

    // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || APP-PLUS
    let recorderManager = null;
    let innerAudioContext = null;

    function initRecord() {
      let hasRecordAuth = false;
      // 1 先判断有没有权限
      // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
      uni.authorize({
        scope: "scope.record",
        success() {
          hasRecordAuth = true;
        },
        fail: () => {
          uni.openSetting({
            success(res) {
              console.log("打开小程序设置 成功");
            },
            fail: (err) => {
              console.log("打开小程序设置 失败");
            },
          });
        },
      });
      // #endif

      // #ifdef APP-PLUS || WEB || H5
      uni.openAppAuthorizeSetting({
        success(res) {
          console.log("openAppAuthorizeSetting success", res);
        },
        fail: (err) => {
          console.log("openAppAuthorizeSetting fail", res);
        },
        complete: () => {
          console.log("openAppAuthorizeSetting complete", res);
        },
      });
      // #endif

      if (hasRecordAuth == true) {
        recorderManager = uni.getRecorderManager();
        innerAudioContext = uni.createInnerAudioContext();

        if (innerAudioContext) {
          innerAudioContext.autoplay = true;
        }

        if (recorderManager) {
          recorderManager.onStop((res) => {
            console.log("recorder stop" + JSON.stringify(res));
            states.record = res.tempFilePath;
          });
        }
      }
    }

    function startRecord() {
      if (recorderManager) {
        console.log("开始录音");

        recorderManager.start();
      }
    }

    function endRecord() {
      if (recorderManager) {
        console.log("录音结束");
        recorderManager.stop();
      }
    }

    function playVoice() {
      if (recorderManager) {
        console.log("播放录音");

        if (states.record) {
          innerAudioContext.src = states.record;
          innerAudioContext.play();
        }
      }
    }
    // #endif

    function sliderChange(e) {
      console.log("value 发生变化：" + e.detail.value);
    }

    return {
      rituals,
      scrollHandle,
      states,
      sliderChange,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";
$work_occupied_height: 54rpx + 26rpx + 80rpx + 28rpx + 64rpx;

.ce_container {
  width: 750rpx;
  height: 100vh;
}

.top_hgap {
  width: 750rpx;
  height: 26rpx;
}

.ce_wraper {
  width: 750rpx;
  height: calc(100% - $work_occupied_height - var(--status-bar-height));
  margin-top: 32rpx;
  margin-bottom: 32rpx;
  z-index: 2;
}

.ce_first {
  width: 100%;
  height: auto;
  margin-bottom: 64rpx;
}

.ce_first_one {
  width: 718rpx;
  height: 64rpx;
}

.ce_first_label {
  width: 100%;
  height: 100%;
  font-size: $fs_32rpx;
  font-weight: bold;
}

.ce_first_two {
  width: 718rpx;
  height: auto;
  min-height: 320rpx;
  border: 1px solid $c_033_033_033_020;
  border-radius: 8rpx;
}

.ce_first_textarea {
  width: 100%;
  height: auto;
  min-height: 320rpx;
  font-size: $fs_28rpx;
}

.ce_first_four {
  width: 718rpx;
  height: 80rpx;
}

.ce_first_five {
  width: 718rpx;
  height: auto;
}

.ce_rituals {
  width: 100%;
  height: auto;
  margin-bottom: 32rpx;
}

.ce_ritual_ibox {
  width: 218rpx;
  height: auto;
  margin-right: 32rpx;
}

.ce_ritual_img {
  width: 218rpx;
  height: 218rpx;
  margin-bottom: 16rpx;
}

.ce_ritual_label {
  width: 218rpx;
  height: 48rpx;
  margin-bottom: 16rpx;
  font-size: $fs_28rpx;
}

.ce_ceremony {
  width: 718rpx;
  height: auto;
  min-height: 80rpx;
  margin-bottom: 32rpx;
  font-size: $fs_32rpx;
}

.ce_tips {
  width: 718rpx;
  height: auto;
  font-size: $fs_24rpx;
  margin-bottom: 32rpx;
}
</style>
