"use strict";
const common_vendor = require("../../common/vendor.js");
const TopNavBack = () => "../../components/common/TopNavBack.js";
const _sfc_main = common_vendor.defineComponent({
  name: "Login",
  components: { TopNavBack },
  setup() {
    function scrollHandle() {
    }
    let inputFeatureEditor = null;
    let inputRichCtx = "";
    common_vendor.onMounted(() => {
      initEditor();
    });
    common_vendor.onBeforeUnmount(() => {
      if (inputFeatureEditor == null) {
        return;
      } else {
        inputFeatureEditor.blur();
        setTimeout(() => {
          inputFeatureEditor.destroy();
          inputFeatureEditor = null;
        }, 100);
      }
    });
    function initEditor() {
      const instance = common_vendor.getCurrentInstance();
      const query = common_vendor.index.createSelectorQuery().in(instance.proxy);
      query.select("#editorTextarea").fields(
        {
          id: true,
          //是否返回节点id
          rect: false,
          //是否返回节点布局位置
          dataset: true,
          //返回数据集
          size: true,
          //返回宽高
          scrollOffset: true,
          //返回 scrollLeft,scrollTop
          properties: ["scrollX", "scrollY"],
          //监听属性名
          computedStyle: ["margin", "backgroundColor"]
          //此处返回指定要返回的样式名
        },
        (node) => {
          inputFeatureEditor = common_vendor.iye({
            selector: node,
            config: {
              placeholder: "Type here...",
              autoFocus: false,
              MENU_CONF: {
                uploadImage: {
                  fieldName: "your-file-name1",
                  base64LimitSize: 10 * 1024 * 1024
                  // 10M 以下插入 base64
                }
              },
              onChange(editor) {
                inputRichCtx = editor.getHtml();
              }
            },
            html: inputRichCtx
          });
        }
      );
      query.select("#editorToolbar").fields(
        {
          id: true,
          //是否返回节点id
          rect: false,
          //是否返回节点布局位置
          dataset: true,
          //返回数据集
          size: true,
          //返回宽高
          scrollOffset: true,
          //返回 scrollLeft,scrollTop
          properties: ["scrollX", "scrollY"],
          //监听属性名
          computedStyle: ["margin", "backgroundColor"]
          //此处返回指定要返回的样式名
        },
        (node) => {
          common_vendor.aye({
            editor: inputFeatureEditor,
            selector: node,
            config: {}
          });
        }
      );
    }
    return {
      scrollHandle
    };
  }
});
if (!Array) {
  const _component_TopNavBack = common_vendor.resolveComponent("TopNavBack");
  _component_TopNavBack();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      isBlueMode: true
    }),
    b: common_vendor.o((...args) => _ctx.scrollHandle && _ctx.scrollHandle(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b8876e3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cedit.js.map
