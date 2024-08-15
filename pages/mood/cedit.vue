<template>
  <view class="col_nw_fs_center ce_one_box_one">
    <TopNavBack :isBlueMode="true"></TopNavBack>
    <view class="top_hgap"></view>
    <scroll-view
      class="ce_one_box_two"
      scroll-y="true"
      show-scrollbar="false"
      enable-flex="true"
      @scrolltolower="scrollHandle"
    >
      <view class="col_nw_fs_fs ce_one_box_three">
        <view style="flex: 1; width: 100%">
          <view style="border: 1px solid #ccc">
            <view id="editorToolbar" style="border-bottom: 1px solid #ccc; min-height: 20px"></view>
            <view id="editorTextarea" style="height: 400px"></view>
          </view>
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
import TopNavBack from "@/components/common/TopNavBack.vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { createEditor, DomEditor, createToolbar, i18nChangeLanguage } from "@wangeditor/editor";

export default defineComponent({
  name: "Login",
  components: { TopNavBack },
  setup() {
    let currentPage = 0;
    function scrollHandle() {
      currentPage++;
    }

    let inputFeatureEditor = null;
    let inputFeatureToolbar = null;
    let inputRichCtx = "";

    onMounted(() => {
      initEditor();
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      if (inputFeatureEditor == null) {
        return;
      } else {
        inputFeatureEditor.blur();
        setTimeout(() => {
          inputFeatureEditor.destroy();
          inputFeatureEditor = null;
          inputFeatureToolbar = null;
        }, 100);
      }
    });

    function initEditor() {
      // #ifdef H5 || APP-PLUS
      inputFeatureEditor = createEditor({
        selector: "#editorTextarea",
        config: {
          placeholder: "Type here...",
          autoFocus: false,
          MENU_CONF: {
            uploadImage: {
              fieldName: "your-file-name1",
              base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
            },
          },
          onChange(editor) {
            inputRichCtx = editor.getHtml();
          },
        },
        html: inputRichCtx,
      });
      inputFeatureToolbar = createToolbar({
        editor: inputFeatureEditor,
        selector: "#editorToolbar",
        config: {},
      });

      // #endif

      // #ifdef MP-WEIXIN
      const instance = getCurrentInstance();
      const query = uni.createSelectorQuery().in(instance.proxy);

      query.select("#editorTextarea").fields(
        {
          id: true, //是否返回节点id
          rect: false, //是否返回节点布局位置
          dataset: true, //返回数据集
          size: true, //返回宽高
          scrollOffset: true, //返回 scrollLeft,scrollTop
          properties: ["scrollX", "scrollY"], //监听属性名
          computedStyle: ["margin", "backgroundColor"], //此处返回指定要返回的样式名
        },
        (node) => {
          inputFeatureEditor = createEditor({
            selector: node,
            config: {
              placeholder: "Type here...",
              autoFocus: false,
              MENU_CONF: {
                uploadImage: {
                  fieldName: "your-file-name1",
                  base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
                },
              },
              onChange(editor) {
                inputRichCtx = editor.getHtml();
              },
            },
            html: inputRichCtx,
          });
        }
      );

      query.select("#editorToolbar").fields(
        {
          id: true, //是否返回节点id
          rect: false, //是否返回节点布局位置
          dataset: true, //返回数据集
          size: true, //返回宽高
          scrollOffset: true, //返回 scrollLeft,scrollTop
          properties: ["scrollX", "scrollY"], //监听属性名
          computedStyle: ["margin", "backgroundColor"], //此处返回指定要返回的样式名
        },
        (node) => {
          inputFeatureToolbar = createToolbar({
            editor: inputFeatureEditor,
            selector: node,
            config: {},
          });
        }
      );
      // #endif
    }
    return {
      scrollHandle,
    };
  },
});
</script>

<style scoped lang="scss">
$work_occupied_height: 54rpx + 26rpx + 80rpx + 28rpx + 64rpx;

.ce_one_box_one {
  width: 750rpx;
  height: 100vh;
}

.top_hgap {
  width: 750rpx;
  height: 26rpx;
}

.ce_one_box_two {
  width: 750rpx;
  height: calc(100% - $work_occupied_height - var(--status-bar-height));
  margin-top: 32rpx;
  margin-bottom: 32rpx;
  z-index: 2;
}

.ce_one_box_three {
  width: 100%;
  height: auto;
}
</style>
