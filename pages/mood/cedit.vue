<template>
  <view class="col_nw_fs_center ce_container">
    <RjTopNavBack :isBlueMode="true"></RjTopNavBack>
    <view class="top_hgap"></view>
    <view class="col_nw_fs_fs ce_wraper red_debug" scroll-y="true" show-scrollbar="false">
      <view class="ce_first">
        <CalendarMonth> </CalendarMonth>
      </view>

      <view class="col_nw_fs_center ce_first red_debug">
        <view class="row_nw_fs_center ce_first_one">
          <text class="row_nw_fs_center ce_first_label">记一记</text>
        </view>
        <view class="row_nw_fs_center ce_first_two">
          <textarea
            :maxlength="99999"
            class="ce_first_textarea"
            placeholder-style="color:#F76260"
            placeholder="占位符字体是红色的"
            cursor-color="#F76260"
            auto-height
            @blur="bindDiaryContentBlur"
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
              @click="ritualsHandler(item, index)"
            >
              <view class="row_nw_center_center ce_ritual_img">
                <image class="ce_ritual_show" mode="aspectFit" :src="item.image"></image>
              </view>
              <view class="row_nw_center_center ce_ritual_label">{{ item.label }}</view>
            </view>
          </view>
          <!-- 这个地方的文字如何才有仪式感，要动画嘛？ -->
          <view class="row_nw_fs_fs ce_ceremony">{{
            rituals[states.ritualIndex].ceremonys[states.cereIndex]
          }}</view>
          <view class="row_nw_fs_fs ce_tips"> {{ rituals[states.ritualIndex].tip }} </view>
        </view>
      </view>

      <view class="row_nw_center_center ce_act red_debug">
        <button type="primary" plain @click="">放弃</button>
        <button type="primary" @click="">仪式开始</button>
      </view>
    </view>
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

import CalendarMonth from "./components/CalendarMonth.vue";

import { rituals } from "./rituals";

export default defineComponent({
  name: "Cedit",
  components: { RjTopNavBack, RjZColorPicker, RjColorPickerSketch, CalendarMonth },
  setup() {
    // #ifdef MP-WEIXIN || H5 || APP-PLUS
    const instance = getCurrentInstance();
    const query = uni.createSelectorQuery().in(instance.proxy);
    // #endif

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

    function bindDiaryContentBlur(e) {
      console.log(e.detail.value);
      states.content = e.detail.value;
    }

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

    function ritualsHandler(ritual, index) {
      states.ritualIndex = index;
      let length = rituals[index].ceremonys.length - 1;
      let randIndex = Math.ceil((Math.random() * 100) % length);
      states.cereIndex = randIndex;
      console.log("ritualsHandler", ritual, index, length, randIndex);
    }

    return {
      rituals,
      states,
      bindDiaryContentBlur,
      sliderChange,
      ritualsHandler,
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
  cursor: pointer;
}

.ce_ritual_img {
  width: 218rpx;
  height: 218rpx;
  margin-bottom: 8rpx;
  border-radius: 50%;
}

.ce_ritual_show {
  width: 70%;
  height: 70%;
  border-radius: 50%;
}

.ce_ritual_label {
  width: 218rpx;
  height: 32rpx;
  font-size: $fs_24rpx;
}

.ce_ceremony {
  width: 718rpx;
  height: auto;
  min-height: 32rpx;
  margin-bottom: 16rpx;
  font-size: $fs_18rpx;
}

.ce_tips {
  width: 718rpx;
  height: auto;
  font-size: $fs_10rpx;
  margin-bottom: 16rpx;
}

.ce_act {
  width: 718rpx;
  height: 48rpx;
  margin-bottom: 64rpx;
}
</style>
