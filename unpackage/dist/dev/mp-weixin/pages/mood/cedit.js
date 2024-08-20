"use strict";
const common_vendor = require("../../common/vendor.js");
const RjTopNavBack = () => "../../components/rj-navback/RjTopNavBack.js";
const RjZColorPicker = () => "../../components/rj-color/rj-color-picker/RjColorPicker.js";
const RjColorPickerSketch = () => "../../components/rj-color/rj-color-picker/RjColorPickerSketch.js";
const RjEditor = () => "../../components/rj-editor/rj-sp-editor/sp-editor.js";
const _sfc_main = common_vendor.defineComponent({
  name: "Cedit",
  components: { RjTopNavBack, RjZColorPicker, RjColorPickerSketch, RjEditor },
  setup() {
    function scrollHandle() {
    }
    let states = common_vendor.reactive({
      colors: {
        hex: "#7ED321"
      }
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onBeforeUnmount(() => {
      {
        return;
      }
    });
    const instance = common_vendor.getCurrentInstance();
    common_vendor.index.createSelectorQuery().in(instance.proxy);
    return {
      scrollHandle,
      states
    };
  }
});
if (!Array) {
  const _component_RjTopNavBack = common_vendor.resolveComponent("RjTopNavBack");
  const _component_RjColorPickerSketch = common_vendor.resolveComponent("RjColorPickerSketch");
  const _component_RjEditor = common_vendor.resolveComponent("RjEditor");
  (_component_RjTopNavBack + _component_RjColorPickerSketch + _component_RjEditor)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      isBlueMode: true
    }),
    b: common_vendor.o(($event) => _ctx.states.colors = $event),
    c: common_vendor.p({
      value: _ctx.states.colors
    }),
    d: common_vendor.o((...args) => _ctx.scrollHandle && _ctx.scrollHandle(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b8876e3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cedit.js.map
