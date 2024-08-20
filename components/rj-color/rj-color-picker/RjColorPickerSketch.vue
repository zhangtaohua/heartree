<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    :class="['rj-sketch', disableAlpha ? 'rj-sketch__disable-alpha' : '']"
  >
    <div class="rj-sketch-saturation-wrap">
      <saturation
        v-model:value="colors"
        :navbarHeight="navbarHeight"
        @change="childChange"
      ></saturation>
    </div>
    <div class="rj-sketch-controls">
      <div class="rj-sketch-sliders">
        <div class="rj-sketch-hue-wrap">
          <hue v-model:value="colors" @change="childChange"></hue>
        </div>
        <div class="rj-sketch-alpha-wrap" v-if="!disableAlpha">
          <alpha v-model:value="colors" @change="childChange"></alpha>
        </div>
      </div>
      <div class="rj-sketch-color-wrap">
        <div
          :aria-label="`Current color is ${activeColor}`"
          class="rj-sketch-active-color"
          :style="{ background: activeColor }"
        ></div>
        <checkboard></checkboard>
      </div>
    </div>
    <div class="rj-sketch-field" v-if="!disableFields">
      <!-- rgba -->
      <div class="rj-sketch-field--double">
        <ed-in
          label="hex"
          :input-content-style="inputContentStyle"
          :input-label-style="inputLabelStyle"
          :value="hex"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="rj-sketch-field--single">
        <ed-in
          label="r"
          :input-content-style="inputContentStyle"
          :input-label-style="inputLabelStyle"
          :value="colors.rgba.r"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="rj-sketch-field--single">
        <ed-in
          label="g"
          :input-content-style="inputContentStyle"
          :input-label-style="inputLabelStyle"
          :value="colors.rgba.g"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="rj-sketch-field--single">
        <ed-in
          label="b"
          :input-content-style="inputContentStyle"
          :input-label-style="inputLabelStyle"
          :value="colors.rgba.b"
          @change="inputChange"
        ></ed-in>
      </div>
      <div class="rj-sketch-field--single" v-if="!disableAlpha">
        <ed-in
          label="a"
          :input-content-style="inputContentStyle"
          :input-label-style="inputLabelStyle"
          :value="colors.a"
          :arrow-offset="0.01"
          :max="1"
          @change="inputChange"
        ></ed-in>
      </div>
    </div>
    <div class="rj-sketch-presets">
      <template v-for="c in presetColors">
        <div
          v-if="!isTransparent(c)"
          class="rj-sketch-presets-color"
          :aria-label="'Color:' + c"
          :key="c"
          :style="{ background: c }"
          @click="handlePreset(c)"
        ></div>
        <div
          v-else
          :key="'new_' + c"
          :aria-label="'Color:' + c"
          class="rj-sketch-presets-color"
          @click="handlePreset(c)"
        >
          <checkboard />
        </div>
      </template>
    </div>
    <slot name="bottom"></slot>
    <view class="rj-sketch-button" v-if="showButton">
      <button class="button-left" @click="cancel">取消</button>
      <button class="button-right" type="primary" @click="confirm">确定</button>
    </view>
  </div>
</template>

<script>
import colorMixin from "./color";
import editableInput from "./EditableInput.vue";
import saturation from "./Saturation.vue";
import hue from "./Hue.vue";
import alpha from "./Alpha.vue";
import checkboard from "./Checkboard.vue";

const presetColors = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
  "#425678",
];

export default {
  name: "Sketch",
  mixins: [colorMixin],
  components: {
    saturation,
    hue,
    alpha,
    "ed-in": editableInput,
    checkboard,
  },
  props: {
    presetColors: {
      type: Array,
      default() {
        return presetColors;
      },
    },
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
    navbarHeight: {
      type: Number,
      default: 0,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputContentStyle() {
      return {
        width: "90%",
        height: "42rpx",
        padding: "0 0 0 10%",
        border: "none",
        boxShadow: "inset 0 0 0 2rpx #ccc",
        fontSize: "20rpx",
      };
    },
    inputLabelStyle() {
      return {
        display: "block",
        textAlign: "center",
        fontSize: "22rpx",
        color: "#222",
        paddingTop: "6rpx",
        paddingBottom: "8rpx",
        textTransform: "capitalize",
      };
    },
    hex() {
      let hex;
      if (this.colors.a < 1) {
        hex = this.colors.hex8;
      } else {
        hex = this.colors.hex;
      }
      return hex.replace("#", "");
    },
    activeColor() {
      var rgba = this.colors.rgba;
      return "rgba(" + [rgba.r, rgba.g, rgba.b, rgba.a].join(",") + ")";
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.colors);
    },
    cancel() {
      this.$emit("cancel", this.colors);
    },
    handlePreset(c) {
      this.colorChange({
        hex: c,
        source: "hex",
      });
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
      }
    },
  },
};
</script>

<style>
.rj-sketch {
  position: relative;
  width: 400rpx;
  padding: 20rpx 20rpx 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 8rpx;
}

.rj-sketch-saturation-wrap {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.rj-sketch-controls {
  display: flex;
}

.rj-sketch-sliders {
  padding: 8rpx 0;
  flex: 1;
}

.rj-sketch-sliders .rj-hue,
.rj-sketch-sliders .rj-alpha-gradient {
  border-radius: 4rpx;
}

.rj-sketch-hue-wrap {
  position: relative;
  height: 20rpx;
}

.rj-sketch-alpha-wrap {
  position: relative;
  height: 20rpx;
  margin-top: 8rpx;
  overflow: hidden;
}

.rj-sketch-color-wrap {
  width: 48rpx;
  height: 48rpx;
  position: relative;
  margin-top: 8rpx;
  margin-left: 8rpx;
  border-radius: 6rpx;
}

.rj-sketch-active-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4rpx;
  box-shadow: inset 0 0 0 2rpx rgba(0, 0, 0, 0.15), inset 0 0 8rpx rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.rj-sketch-color-wrap .rj-checkerboard {
  background-size: auto;
}

.rj-sketch-field {
  display: flex;
  padding-top: 8rpx;
}

.rj-sketch-field ::v-deep .rj-input__input {
  /* 		width: 90%;
		padding: 8rpx 0 6rpx 10%;
		border: none;
		box-shadow: inset 0 0 0 2rpx #ccc;
		font-size: 20rpx; */
}

.rj-sketch-field ::v-deep .rj-input__label {
  /* 		display: block;
		text-align: center;
		font-size: 22rpx;
		color: #222;
		padding-top: 6rpx;
		padding-bottom: 8rpx;
		text-transform: capitalize; */
}

.rj-sketch-field--single {
  flex: 1;
  padding-left: 12rpx;
}

.rj-sketch-field--double {
  flex: 2;
}

.rj-sketch-presets {
  margin-right: -20rpx;
  margin-left: -20rpx;
  padding-left: 20rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #eee;
}

.rj-sketch-presets-color {
  border-radius: 6rpx;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 20rpx 20rpx 0;
  vertical-align: top;
  cursor: pointer;
  width: 32rpx;
  height: 32rpx;
  box-shadow: inset 0 0 0 2rpx rgba(0, 0, 0, 0.15);
}

.rj-sketch-presets-color .rj-checkerboard {
  box-shadow: inset 0 0 0 2rpx rgba(0, 0, 0, 0.15);
  border-radius: 6rpx;
}

.rj-sketch__disable-alpha .rj-sketch-color-wrap {
  height: 20rpx;
}

.rj-sketch-button {
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
