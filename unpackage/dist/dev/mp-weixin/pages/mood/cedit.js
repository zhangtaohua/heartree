"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const RjTopNavBack = () => "../../components/rj-navback/RjTopNavBack.js";
const RjZColorPicker = () => "../../components/rj-color/rj-color-picker/RjColorPicker.js";
const RjColorPickerSketch = () => "../../components/rj-color/rj-color-picker/RjColorPickerSketch.js";
const _sfc_main = common_vendor.defineComponent({
  name: "Cedit",
  components: { RjTopNavBack, RjZColorPicker, RjColorPickerSketch },
  setup() {
    const instance = common_vendor.getCurrentInstance();
    common_vendor.index.createSelectorQuery().in(instance.proxy);
    function scrollHandle() {
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
          "神呀！请让我的心情永远随飞去吧吧吧000"
        ],
        image: common_assets.dogpng
      },
      {
        id: "rituals_02",
        code: "rituals_02",
        label: "黑洞里",
        hasPrice: true,
        tip: "随飞去的会再也找不到了",
        ceremonys: [
          "111神呀！让这糟糕的心情永远滚进黑洞里吧",
          "222神呀！让这糟糕的心情永远滚进黑洞里吧",
          "333神呀！让这糟糕的心情永远滚进黑洞里吧",
          "444神呀！让这糟糕的心情永远滚进黑洞里吧",
          "555神呀！让这糟糕的心情永远滚进黑洞里吧",
          "666神呀！让这糟糕的心情永远滚进黑洞里吧",
          "777神呀！让这糟糕的心情永远滚进黑洞里吧",
          "888神呀！让这糟糕的心情永远滚进黑洞里吧",
          "999神呀！让这糟糕的心情永远滚进黑洞里吧",
          "000神呀！让这糟糕的心情永远滚进黑洞里吧"
        ],
        image: common_assets.catpng
      },
      {
        id: "rituals_03",
        code: "rituals_03",
        label: "记下来",
        hasPrice: false,
        tip: "记下来随时回味回味",
        ceremonys: [
          "111神呀！记下来随时回味回味",
          "222神呀！记下来随时回味回味",
          "333神呀！记下来随时回味回味",
          "444神呀！记下来随时回味回味",
          "555神呀！记下来随时回味回味"
        ],
        image: common_assets.dogpng
      }
    ];
    let states = common_vendor.reactive({
      content: "",
      hasRecord: false,
      record: null,
      recordPause: false,
      colors: {
        hex: "#7ED321"
      },
      ritualIndex: 0,
      cereIndex: 0
    });
    common_vendor.onMounted(() => {
      initRecord();
    });
    common_vendor.onBeforeUnmount(() => {
    });
    let recorderManager = null;
    let innerAudioContext = null;
    function initRecord() {
      let hasRecordAuth = false;
      common_vendor.index.authorize({
        scope: "scope.record",
        success() {
          hasRecordAuth = true;
        },
        fail: () => {
          common_vendor.index.openSetting({
            success(res) {
              console.log("打开小程序设置 成功");
            },
            fail: (err) => {
              console.log("打开小程序设置 失败");
            }
          });
        }
      });
      if (hasRecordAuth == true) {
        recorderManager = common_vendor.index.getRecorderManager();
        innerAudioContext = common_vendor.index.createInnerAudioContext();
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
    function sliderChange(e) {
      console.log("value 发生变化：" + e.detail.value);
    }
    function ritualsHandler(ritual, index) {
      states.ritualIndex = index;
      let length = rituals[index].ceremonys.length - 1;
      let randIndex = Math.ceil(Math.random() * 100 % length);
      states.cereIndex = randIndex;
      console.log("ritualsHandler", ritual, index, length, randIndex);
    }
    return {
      rituals,
      scrollHandle,
      states,
      sliderChange,
      ritualsHandler
    };
  }
});
if (!Array) {
  const _component_RjTopNavBack = common_vendor.resolveComponent("RjTopNavBack");
  const _component_RjColorPickerSketch = common_vendor.resolveComponent("RjColorPickerSketch");
  (_component_RjTopNavBack + _component_RjColorPickerSketch)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      isBlueMode: true
    }),
    b: _ctx.states.content,
    c: common_vendor.o(($event) => _ctx.states.content = $event.detail.value),
    d: _ctx.states.hasRecord
  }, _ctx.states.hasRecord ? common_vendor.e({
    e: _ctx.states.recordPause
  }, _ctx.states.recordPause ? {} : {}) : {
    f: common_vendor.o(() => {
    })
  }, {
    g: common_vendor.o(($event) => _ctx.states.colors = $event),
    h: common_vendor.p({
      value: _ctx.states.colors
    }),
    i: common_vendor.o((...args) => _ctx.sliderChange && _ctx.sliderChange(...args)),
    j: common_vendor.f(_ctx.rituals, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.label),
        c: item.id,
        d: common_vendor.o(($event) => _ctx.ritualsHandler(item, index), item.id)
      };
    }),
    k: common_vendor.t(_ctx.rituals[_ctx.states.ritualIndex].ceremonys[_ctx.states.cereIndex]),
    l: common_vendor.t(_ctx.rituals[_ctx.states.ritualIndex].tip),
    m: common_vendor.o(() => {
    }),
    n: common_vendor.o(() => {
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b8876e3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cedit.js.map
