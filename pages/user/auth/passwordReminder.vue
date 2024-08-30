<template>
  <view class="password-reminder" :style="{ paddingTop: windowHeight < 700 ? '206rpx' : '256rpx' }">
    <view class="title" :style="{ marginBottom: windowHeight < 700 ? '102rpx' : '172rpx' }"
      >找回密码</view
    >
    <view class="user-input">
      <input class="uni-input" v-model="user.email" placeholder="请输入邮箱账号" />
    </view>
    <view class="user-input code-input">
      <input
        class="uni-input"
        type="number"
        v-model="user.captcha"
        placeholder="请输入图形验证码"
      />
      <image :src="captchaImage" mode="widthFix" @click="handleGetImageCode"></image>
    </view>
    <view class="user-input note-input">
      <input
        class="uni-input"
        type="number"
        v-model="user.emailCode"
        placeholder="请输入邮箱验证码"
      />
      <text :style="{ color: flag ? '#3D55F0' : '#959595' }" @click="handleGetCode">{{
        flag ? "获取验证码" : `重新发送(${timeDown})`
      }}</text>
    </view>
    <!-- 解决IOS上type="number"和type="password"输入框共用会出现软键盘闪烁的问题，用一个隐藏的input 去阻断账号密码之间的联动 -->
    <input type="text" value="" style="opacity: 0; width: 0; height: 0" />
    <view class="user-input password-input">
      <input
        class="uni-input"
        v-model="user.password"
        :password="isSecrecy"
        placeholder="请重设新密码"
      />
      <image
        :src="
          isSecrecy
            ? '../../../static/images/login/yincang@2x.png'
            : '../../../static/images/login/xianshi@2x.png'
        "
        @click="isSecrecy = !isSecrecy"
        mode="widthFix"
      ></image>
    </view>
    <view class="info">建议使用字母和数字结合，不少于6个字符</view>
    <view
      class="determine-btn"
      :style="{ backgroundColor: isAdopt ? '#3D55F0' : 'rgba(189,213,251,0.9)' }"
      @click="handleSubmitModify"
      >确定</view
    >
  </view>
</template>

<script>
import { toast } from "@/utils/tool/uni.ts";
import localStorage from "@/storage/localStorage";
import { mapGetters } from "vuex";
import { getCaptcha, getEmailCode, putEmailRetrieve } from "@/httpApi/auth.js";
import { getWindowHeight } from "@/utils/system/platform";
export default {
  computed: {
    ...mapGetters({
      accessToken: "user/accessToken",
    }),
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        if (newVal.email && newVal.captcha && newVal.emailCode && newVal.password) {
          this.isAdopt = true;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isSecrecy: true,
      user: {
        email: "",
        captchaId: "",
        captcha: "",
        emailCode: "",
        password: "",
      },
      flag: true,
      timeDown: 60,
      timer: null,
      isAdopt: false,
      captchaImage: "",
      windowHeight: 0,
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    handleGetImageCode() {
      getCaptcha()
        .then((res) => {
          if (res.code == 0) {
            this.captchaImage = res.data.data;
            this.user.captchaId = res.data.captchaId;
          }
        })
        .catch((err) => {
          toast(err.data.message);
        });
    },
    handleGetCode() {
      if (!this.user.email) {
        return toast("请先输入邮箱账号");
      }
      if (this.flag) {
        this.flag = false;
        getEmailCode({
          email: this.user.email,
        })
          .then((res) => {
            if (res.code == 0) {
              this.timer = setInterval(() => {
                this.timeDown--;
                if (this.timeDown === 0) {
                  clearInterval(this.timer);
                  this.flag = true;
                  this.timeDown = 60;
                }
              }, 1000);
            } else {
              toast(res.message);
            }
          })
          .catch((err) => {
            toast(err.data.message);
          });
      }
    },
    handleSubmitModify() {
      if (!this.isAdopt) {
        return toast("请填写信息");
      }
      putEmailRetrieve({
        ...this.user,
      })
        .then((res) => {
          if (res.code == 0) {
            toast("密码修改成功，请重新登录");
            uni.navigateTo({
              url: "/pages/user/login/login",
            });
          }
        })
        .catch((err) => {
          toast(err.data.message);
        });
    },
  },
  onLoad() {
    this.windowHeight = getWindowHeight();
    this.handleGetImageCode();
    if (this.accessToken) {
      let emailKey = localStorage.get("user_email");
      if (emailKey) {
        this.user.email = emailKey;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.password-reminder {
  width: 100%;
  box-sizing: border-box;
  padding: 256rpx 56rpx 0;
  background: url(../../../static/images/login/login-bg@2x.png) no-repeat center;
  background-size: 100% 100%;

  .title {
    font-size: 52rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #343434;
    margin-bottom: 172rpx;
  }

  .user-input {
    width: 100%;
    border-bottom: 2rpx solid #efefef;
    padding-bottom: 40rpx;
    margin-bottom: 36rpx;

    image {
      width: 32.59rpx;
    }
  }

  .uni-input {
    height: 100%;
    color: #242424;
    line-height: 40rpx;

    .uni-input-placeholder {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #959595;
      height: 100%;
    }

    :deep(.uni-input-input) {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #242424;
    }
  }

  .code-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
      width: calc(100% - 162rpx);
    }

    image {
      width: 162rpx;
      height: 72rpx;
    }
  }

  .note-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
      width: calc(100% - 142rpx);
    }

    text {
      width: 142rpx;
      text-align: center;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #3d55f0;
    }
  }

  .password-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
      width: calc(100% - 32.59rpx);
    }
  }

  .info {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #646464;
    margin-top: -20rpx;
    margin-bottom: 122rpx;
  }

  .determine-btn {
    height: 80rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 80rpx;
    color: #ffffff;
    text-align: center;
  }
}
</style>
