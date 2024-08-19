<template>
  <view
    role="application"
    aria-label="Chrome color picker"
    :class="['rj-z-chrome', disableAlpha ? 'rj-z-chrome__disable-alpha' : '']"
  >
    <view class="rj-z-chrome-saturation-wrap">
      <saturation v-model="colors" :navbarHeight="navbarHeight" @change="childChange"></saturation>
    </view>
    <view class="rj-z-chrome-body">
      <view class="rj-z-chrome-controls">
        <view class="rj-z-chrome-color-wrap">
          <view
            :aria-label="`current color is ${colors.hex}`"
            class="rj-z-chrome-active-color"
            :style="{ background: activeColor }"
          ></view>
          <checkboard
            v-if="!disableAlpha"
            :custom-style="{
              width: '60rpx',
              height: '60rpx',
              borderRadius: '30rpx',
              backgroundSize: 'auto',
            }"
          >
          </checkboard>
        </view>

        <view class="rj-z-chrome-sliders">
          <view class="rj-z-chrome-hue-wrap">
            <hue v-model="colors" @change="childChange"></hue>
          </view>
          <view class="rj-z-chrome-alpha-wrap" v-if="!disableAlpha">
            <alpha v-model="colors" @change="childChange"></alpha>
          </view>
        </view>
      </view>

      <view class="rj-z-chrome-fields-wrap" v-if="!disableFields">
        <view class="rj-z-chrome-fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <view class="rj-z-chrome-field">
            <ed-in
              v-if="!hasAlpha"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              label="hex"
              :value="colors.hex"
              @change="inputChange"
            >
            </ed-in>
            <ed-in
              v-if="hasAlpha"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              label="hex"
              :value="colors.hex8"
              @change="inputChange"
            >
            </ed-in>
          </view>
        </view>
        <view class="rj-z-chrome-fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <view class="rj-z-chrome-field">
            <ed-in
              label="r"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="colors.rgba.r"
              @change="inputChange"
            ></ed-in>
          </view>
          <view class="rj-z-chrome-field">
            <ed-in
              label="g"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="colors.rgba.g"
              @change="inputChange"
            ></ed-in>
          </view>
          <view class="rj-z-chrome-field">
            <ed-in
              label="b"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="colors.rgba.b"
              @change="inputChange"
            ></ed-in>
          </view>
          <view class="rj-z-chrome-field" v-if="!disableAlpha">
            <ed-in
              label="a"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="colors.a"
              :arrow-offset="0.01"
              :max="1"
              @change="inputChange"
            ></ed-in>
          </view>
        </view>
        <view class="rj-z-chrome-fields" v-show="fieldsIndex === 2">
          <!-- hsla -->
          <view class="rj-z-chrome-field">
            <ed-in
              label="h"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="hsl.h"
              @change="inputChange"
            >
            </ed-in>
          </view>
          <view class="rj-z-chrome-field">
            <ed-in
              label="s"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="hsl.s"
              @change="inputChange"
            >
            </ed-in>
          </view>
          <view class="rj-z-chrome-field">
            <ed-in
              label="l"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="hsl.l"
              @change="inputChange"
            >
            </ed-in>
          </view>
          <view class="rj-z-chrome-field" v-if="!disableAlpha">
            <ed-in
              label="a"
              :input-content-style="inputContentStyle"
              :input-label-style="inputLabelStyle"
              :value="colors.a"
              :arrow-offset="0.01"
              :max="1"
              @change="inputChange"
            ></ed-in>
          </view>
        </view>
        <view
          class="rj-z-chrome-toggle-btn"
          role="button"
          aria-label="Change another color definition"
          @click="toggleViews"
        >
          <view class="rj-z-chrome-toggle-icon">
            <view class="rj-z-chrome-arrow rj-z-chrome-arrow-up"></view>
            <view class="rj-z-chrome-arrow rj-z-chrome-arrow-down"></view>
          </view>
          <view class="rj-z-chrome-toggle-icon-highlight" v-show="highlight"></view>
        </view>
      </view>
    </view>
    <slot name="bottom"></slot>
    <view class="rj-z-chrome-button" v-if="showButton">
      <button class="button-left" @click="cancel">取消</button>
      <button class="button-right" type="primary" @click="confirm">确定</button>
    </view>
  </view>
</template>

<script>
import colorMixin from "./color";
import editableInput from "./EditableInput.vue";
import saturation from "./Saturation.vue";
import hue from "./Hue.vue";
import alpha from "./Alpha.vue";
import checkboard from "./Checkboard.vue";

export default {
  name: "Chrome",
  mixins: [colorMixin],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "",
    },
    navbarHeight: {
      type: Number,
      default: 0,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default() {
        return {
          hex: "#7ED321",
        };
      },
    },
  },
  components: {
    saturation,
    hue,
    alpha,
    "ed-in": editableInput,
    checkboard,
  },
  data() {
    return {
      fieldsIndex: 0,
      highlight: false,
    };
  },
  computed: {
    inputContentStyle() {
      return {
        fontSize: "22rpx",
        color: "#333",
        width: "100%",
        borderRadius: "4rpx",
        border: "none",
        boxShadow: "inset 0 0 0 2rpx #dadada",
        height: "42rpx",
        textAlign: "center",
      };
    },
    inputLabelStyle() {
      return {
        textTransform: "uppercase",
        fontSize: "22rpx",
        lineHeight: "22rpx",
        color: "#969696",
        textAlign: "center",
        display: "block",
        marginTop: "24rpx",
      };
    },
    hsl() {
      const { h, s, l } = this.colors.hsl;
      return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`,
      };
    },
    activeColor() {
      const rgba = this.colors.rgba;
      return "rgba(" + [rgba.r, rgba.g, rgba.b, rgba.a].join(",") + ")";
    },
    hasAlpha() {
      return this.colors.a < 1;
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.colors);
    },
    cancel() {
      this.$emit("cancel", this.colors);
    },
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) &&
          this.colorChange({
            hex: data.hex,
            source: "hex",
          });
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: "rgba",
        });
      } else if (data.h || data.s || data.l) {
        const s = data.s ? data.s.replace("%", "") / 100 : this.colors.hsl.s;
        const l = data.l ? data.l.replace("%", "") / 100 : this.colors.hsl.l;

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s,
          l,
          source: "hsl",
        });
      }
    },
    toggleViews() {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0;
        return;
      }
      this.fieldsIndex++;
    },
    showHighlight() {
      this.highlight = true;
    },
    hideHighlight() {
      this.highlight = false;
    },
  },
};
</script>

<style>
.rj-z-chrome {
  background: #fff;
  border-radius: 4rpx;
  box-sizing: initial;
  width: 450rpx;
  font-family: Menlo;
  background-color: #fff;
}

.rj-z-chrome-controls {
  display: flex;
}

.rj-z-chrome-color-wrap {
  position: relative;
  width: 72rpx;
}

.rj-z-chrome-active-color {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  overflow: hidden;
  z-index: 1;
}

.rj-z-chrome-sliders {
  flex: 1;
}

.rj-z-chrome-fields-wrap {
  display: flex;
  padding-top: 32rpx;
}

.rj-z-chrome-fields {
  display: flex;
  margin-left: -12rpx;
  flex: 1;
}

.rj-z-chrome-field {
  padding-left: 12rpx;
  width: 100%;
}

.rj-z-chrome-toggle-btn {
  width: 64rpx;
  text-align: right;
  position: relative;
}

.rj-z-chrome-toggle-icon {
  margin-left: 28rpx;
  margin-top: 24rpx;
  position: relative;
  z-index: 2;
}

.rj-z-chrome-toggle-icon-highlight {
  position: absolute;
  width: 48rpx;
  height: 56rpx;
  background: #eee;
  border-radius: 8rpx;
  top: 20rpx;
  left: 24rpx;
}

.rj-z-chrome-arrow {
  border: 2rpx solid black;
  border-width: 0rpx 2rpx 2rpx 0rpx;
  height: 12rpx;
  width: 12rpx;
}

.rj-z-chrome-arrow-down {
  transform: rotate(45deg);
}

.rj-z-chrome-arrow-up {
  transform: rotate(-135deg);
}

.rj-z-chrome-hue-wrap {
  position: relative;
  height: 20rpx;
  margin-bottom: 16rpx;
}

.rj-z-chrome-alpha-wrap {
  position: relative;
  height: 20rpx;
}

.rj-z-chrome-hue-wrap .rj-z-hue {
  border-radius: 4rpx;
}

.rj-z-chrome-alpha-wrap .rj-z-alpha-gradient {
  border-radius: 4rpx;
}

.rj-z-chrome-hue-wrap .rj-z-hue-picker,
.rj-z-chrome-alpha-wrap .rj-z-alpha-picker {
  width: 24rpx;
  height: 24rpx;
  border-radius: 12rpx;
  transform: translate(-12rpx, -4rpx);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.37);
}

.rj-z-chrome-body {
  padding: 32rpx 32rpx 24rpx;
  background-color: #fff;
}

.rj-z-chrome-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 4rpx 4rpx 0 0;
  overflow: hidden;
}

.rj-z-chrome-saturation-wrap .rj-z-saturation-circle {
  width: 24rpx;
  height: 24rpx;
}

.rj-z-chrome__disable-alpha .rj-z-chrome-active-color {
  width: 36rpx;
  height: 36rpx;
}

.rj-z-chrome__disable-alpha .rj-z-chrome-color-wrap {
  width: 60rpx;
}

.rj-z-chrome__disable-alpha .rj-z-chrome-hue-wrap {
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}

.rj-z-chrome-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 30rpx;
}

.button-left {
  margin: 0;
  font-size: 24rpx;
  padding: 0 20rpx;
  line-height: 44rpx;
}

.button-right {
  margin: 0;
  margin-left: 20rpx;
  font-size: 24rpx;
  padding: 0 20rpx;
  line-height: 44rpx;
}
</style>
