<template>
  <div class="rj-editable-input">
    <input class="rj-input__input" :style="[inputContentStyle]" v-model="val" @input="update" />
    <view class="rj-input__label" :style="[inputLabelStyle]">{{ labelSpanText }}</view>
    <view class="rj-input__desc" :style="[inputDescStyle]">{{ desc }}</view>
  </div>
</template>

<script>
export default {
  name: "editableInput",
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1,
    },
    inputContentStyle: {
      type: Object,
      default: () => {},
    },
    inputLabelStyle: {
      type: Object,
      default: () => {},
    },
    inputDescStyle: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max) {
          this.val = this.max;
        } else {
          return v;
        }
      },
    },
    labelId() {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
    },
    labelSpanText() {
      return this.labelText || this.label;
    },
  },
  methods: {
    update(e) {
      this.handleChange(e.target.value);
    },
    handleChange(newVal) {
      let data = {};
      data[this.label] = newVal;
      if (data.hex === undefined && data["#"] === undefined) {
        this.$emit("change", data);
      } else if (newVal.length > 5) {
        this.$emit("change", data);
      }
    },
  },
};
</script>

<style>
.rj-editable-input {
  position: relative;
}

.rj-input__input {
  padding: 0;
  border: 0;
  outline: none;
  font-size: 20rpx;
}

.rj-input__label {
  font-size: 20rpx;
  text-transform: capitalize;
}
</style>
