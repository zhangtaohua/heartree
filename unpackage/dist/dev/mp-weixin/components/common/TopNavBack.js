"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "TopNavBack",
  props: {
    isBlueMode: {
      type: Boolean,
      default: false
    },
    navBarData: {
      type: Object,
      default() {
        return {
          name: "",
          backUrl: "",
          isTabBar: false
        };
      }
    }
  },
  setup(__props) {
    function changeNavbar() {
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.isBlueMode
      }, __props.isBlueMode ? {
        b: common_assets._imports_0$1
      } : {
        c: common_assets._imports_1
      }, {
        d: common_vendor.o(changeNavbar),
        e: common_vendor.t(__props.navBarData.name),
        f: __props.isBlueMode ? 1 : ""
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f294a2a"]]);
wx.createComponent(Component);
//# sourceMappingURL=TopNavBack.js.map
