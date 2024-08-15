import {
  QO,
  aye,
  iye
} from "./chunk-T7S5ULVR.js";

// D:/Work/project/Uni-app/heartree/node_modules/@wangeditor/editor-for-vue/dist/index.esm.js
import { defineComponent, ref, shallowRef, onMounted, watch, toRaw, openBlock, createElementBlock, watchEffect } from "vue";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function genErrorInfo(fnName) {
  let info = `请使用 '@${fnName}' 事件，不要放在 props 中`;
  info += `
Please use '@${fnName}' event instead of props`;
  return info;
}
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
var _sfc_main$1 = defineComponent({
  props: {
    mode: {
      type: String,
      default: "default"
    },
    defaultContent: {
      type: Array,
      default: []
    },
    defaultHtml: {
      type: String,
      default: ""
    },
    defaultConfig: {
      type: Object,
      default: {}
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const box = ref(null);
    const editorRef = shallowRef(null);
    const curValue = ref("");
    const initEditor = () => {
      if (!box.value)
        return;
      const defaultContent = toRaw(props.defaultContent);
      iye({
        selector: box.value,
        mode: props.mode,
        content: defaultContent || [],
        html: props.defaultHtml || props.modelValue || "",
        config: __spreadProps(__spreadValues({}, props.defaultConfig), {
          onCreated(editor) {
            editorRef.value = editor;
            context.emit("onCreated", editor);
            if (props.defaultConfig.onCreated) {
              const info = genErrorInfo("onCreated");
              throw new Error(info);
            }
          },
          onChange(editor) {
            const editorHtml = editor.getHtml();
            curValue.value = editorHtml;
            context.emit("update:modelValue", editorHtml);
            context.emit("onChange", editor);
            if (props.defaultConfig.onChange) {
              const info = genErrorInfo("onChange");
              throw new Error(info);
            }
          },
          onDestroyed(editor) {
            context.emit("onDestroyed", editor);
            if (props.defaultConfig.onDestroyed) {
              const info = genErrorInfo("onDestroyed");
              throw new Error(info);
            }
          },
          onMaxLength(editor) {
            context.emit("onMaxLength", editor);
            if (props.defaultConfig.onMaxLength) {
              const info = genErrorInfo("onMaxLength");
              throw new Error(info);
            }
          },
          onFocus(editor) {
            context.emit("onFocus", editor);
            if (props.defaultConfig.onFocus) {
              const info = genErrorInfo("onFocus");
              throw new Error(info);
            }
          },
          onBlur(editor) {
            context.emit("onBlur", editor);
            if (props.defaultConfig.onBlur) {
              const info = genErrorInfo("onBlur");
              throw new Error(info);
            }
          },
          customAlert(info, type) {
            context.emit("customAlert", info, type);
            if (props.defaultConfig.customAlert) {
              const info2 = genErrorInfo("customAlert");
              throw new Error(info2);
            }
          },
          customPaste: (editor, event) => {
            if (props.defaultConfig.customPaste) {
              const info = genErrorInfo("customPaste");
              throw new Error(info);
            }
            let res;
            context.emit("customPaste", editor, event, (val) => {
              res = val;
            });
            return res;
          }
        })
      });
    };
    function setHtml(newHtml) {
      const editor = editorRef.value;
      if (editor == null)
        return;
      editor.setHtml(newHtml);
    }
    onMounted(() => {
      initEditor();
    });
    watch(() => props.modelValue, (newVal) => {
      if (newVal === curValue.value)
        return;
      setHtml(newVal);
    });
    return {
      box
    };
  }
});
var _hoisted_1$1 = {
  ref: "box",
  style: { "height": "100%" }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, null, 512);
}
var Editor = _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var _sfc_main = defineComponent({
  props: {
    editor: {
      type: Object
    },
    mode: {
      type: String,
      default: "default"
    },
    defaultConfig: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const selector = ref(null);
    const create = (editor) => {
      if (!selector.value)
        return;
      if (editor == null) {
        throw new Error("Not found instance of Editor when create <Toolbar/> component");
      }
      if (QO.getToolbar(editor))
        return;
      aye({
        editor,
        selector: selector.value || "<div></div>",
        mode: props.mode,
        config: props.defaultConfig
      });
    };
    watchEffect(() => {
      const { editor } = props;
      if (editor == null)
        return;
      create(editor);
    });
    return {
      selector
    };
  }
});
var _hoisted_1 = { ref: "selector" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, null, 512);
}
var Toolbar = _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Editor,
  Toolbar
};
//# sourceMappingURL=@wangeditor_editor-for-vue.js.map
