<template>
  <view class="col_nw_fs_center login_container">
    <view class="login_wel_up">欢迎来到</view>
    <view class="login_wel_down">欢迎来到</view>

    <view class="col_nw_fs_center login_wrapper">
      <view class="login_phone_box">
        <image src="@/assets/images/fake/cat.jpg" @click="handleShow" mode="aspectFit"></image>
        <input
          class="row_nw_fs_center login_phone_in"
          v-model="loginParas.phone"
          placeholder="请输入邮箱账号"
          @input="handleAdopt"
        />
        <image
          v-if="loginParas.phone"
          class="login_ps_clear"
          src="@/assets/images/header/cat.jpg"
          @click="() => (loginParas.phone = '')"
        ></image>
      </view>
      <view class="row_nw_fs_center login_rerror">{{
        loginParas.isPhoneError ? "手机号错误" : ""
      }}</view>

      <view class="login_phone_in">
        <image src="@/assets/images/fake/cat.jpg" @click="handleShow" mode="aspectFit"></image>
        <input
          v-model="loginParas.vcode"
          class="row_nw_fs_center login_code_in"
          placeholder="请输入手机验证码"
          @input="handleAdopt"
        />
        <image
          v-if="loginParas.vcode"
          class="login_ps_clear"
          src="@/assets/images/header/cat.jpg"
          @click="() => (loginParas.vcode = '')"
        ></image>
        <view class="row_nw_center_center login_code_get">{{
          loginParas.isGetCode ? countdown + "s" : "获取验证码"
        }}</view>
      </view>
      <view class="row_nw_fs_center login_rerror">{{
        loginParas.isCodeError ? "验证码错误" : ""
      }}</view>

      <view class="row_nw_center_center login_action_box">
        <button type="primary" class="login_action_title" :disabled="!isCanUserPwLogin">
          登录
        </button>
      </view>

      <view class="row_nw_sb_center login_c_box">
        <view class="row_nw_fs_center login_c_type" @click="changLogoTypeHandle(false)">
          "用户名密码登录"
        </view>
        <view class="row_nw_fs_center login_c_type">注册账号</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import { useSystemStore } from "@/store/systemConfig.ts";
import { LANGUAGE_EN } from "@/common/constant";
const { systemConfig } = useSystemStore();

const isShowPanel = ref(false);
const isUsePhone = ref(true);
const isLogin = ref(true);

const countdown = ref(60);

const loginParas = reactive({
  userName: "",
  isUserNameError: false,
  phone: "",
  isPhoneError: false,
  email: "",
  isEmailError: false,
  password: "",
  confirmPassword: "",
  isPasswordError: false,
  vcode: "",
  isCodeError: false,
  isGetCode: false,
});

const isCanUserPwLogin = computed(() => {
  if (
    loginParas.phone &&
    loginParas.password &&
    !loginParas.isPhoneError &&
    !loginParas.isPasswordError
  ) {
    return true;
  } else {
    return false;
  }
});

const isCanReg = computed(() => {
  if (
    loginParas.userName &&
    !loginParas.isUserNameError &&
    loginParas.phone &&
    !loginParas.isPhoneError &&
    loginParas.email &&
    !loginParas.isEmailError &&
    loginParas.password &&
    loginParas.confirmPassword &&
    !loginParas.isPasswordError
  ) {
    return true;
  } else {
    return false;
  }
});

function checkPhoneHandle() {
  if (loginParas.phone.length == 11) {
    const phoneRegex = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (phoneRegex.test(loginParas.phone)) {
      loginParas.isPhoneError = false;
    } else {
      loginParas.isPhoneError = true;
    }
  } else {
    loginParas.isPhoneError = false;
  }
}

function checkEmailHandle() {
  if (loginParas.email.length < 3) {
    const emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (emailRegex.test(loginParas.email)) {
      loginParas.isEmailError = false;
    } else {
      loginParas.isEmailError = true;
    }
  } else {
    loginParas.isEmailError = false;
  }
}

function checkDbPasswordHandle() {
  if (loginParas.password.length && loginParas.confirmPassword.length) {
    if (loginParas.password == loginParas.confirmPassword) {
      loginParas.isPasswordError = false;
    } else {
      loginParas.isPasswordError = true;
    }
  } else {
    loginParas.isPasswordError = false;
  }
}

function showLoginHandle(isShow: boolean) {
  isShowPanel.value = isShow;
}

function changLogoTypeHandle(isShow: boolean) {
  isUsePhone.value = isShow;
}

function changRegisterHandle(isShow: boolean) {
  isLogin.value = isShow;
}

// function loginHandle() {
//   if (!isCanUserPwLogin.value) {
//     const data = {
//       login_id: loginParas.phone,
//       password: loginParas.password,
//       captcha_id: "captcha_skip_test",
//       captcha_answer: "123456",
//     };
//     loginRequest(data)
//       .then((res) => {
//         // console.log("login ok", res);
//         if (res.token) {
//           setAuthToken(res.token);
//           setTimeout(() => {
//             getCurrentRequest()
//               .then((res) => {
//                 // console.log("getCurrentRequest ok", res);
//                 setAuthUser(res.data);
//               })
//               .catch((err) => {
//                 console.log("getCurrentRequest err", err);
//                 setAuthUser(null);
//               });
//           }, 250);
//         } else {
//           isPasswordError.value = true;
//           setAuthToken("");
//         }
//       })
//       .catch((err) => {
//         console.log("login err", err);
//         isPasswordError.value = true;
//         setAuthToken("");
//       });
//   }
// }
</script>

<style scoped lang="scss">
.login_phone_box {
  position: relative;
  width: 25rem;
  height: 2.5rem;
  margin-top: 3.125rem;
}

.login_phone_in {
  width: 25rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  color: var(--c-034-056-081-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  background-color: var(--c-255-255-255-100);
  border: 1px solid var(--c-220-223-230-100);
  border-radius: 0.125rem;
  outline: none;
}

.login_phone_in:focus {
  border: none;
  box-shadow: 0 0 0 1px var(--c-064-158-255-100) inset;
}

.login_phone_in::placeholder {
  display: flex;
  flex-direction: row;
  padding: 0;
  color: var(--c-074-074-074-100);
  font-size: var(--fsr-14px);
  place-items: center flex-start;
}

.login_ps_clear {
  position: absolute;
  top: 0.8125rem;
  right: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
}

.login_rerror {
  width: 25rem;
  height: 1.125rem;
  margin-top: 0.375rem;
  color: var(--c-241-051-013-100);
  font-size: var(--fsr-12px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  opacity: 1;
}

.login_rerror_show {
  opacity: 1;
}

.login_code_box {
  position: relative;
  width: 25rem;
  height: 2.5rem;
  margin-top: 2.25rem;
}

.login_code_in {
  width: 16.875rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  color: var(--c-034-056-081-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  background-color: var(--c-255-255-255-100);
  border: 1px solid var(--c-220-223-230-100);
  border-radius: 0.125rem;
  outline: none;
}

.login_code_in::placeholder {
  display: flex;
  flex-direction: row;
  padding: 0;
  color: var(--c-074-074-074-100);
  font-size: var(--fsr-14px);
  place-items: center flex-start;
}

.login_vcode_clear {
  position: absolute;
  top: 0.8125rem;
  right: 8.75rem;
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
}

.login_code_get {
  width: 8rem;
  height: 2.375rem;
  color: var(--c-255-255-255-100);
  background: var(--c-180-201-225-100);
  border: 1px solid var(--c-180-201-225-100);
  border-radius: 0 2px 2px 0;
  cursor: pointer;
}

.login_code_get_dis {
  color: var(--c-232-234-237-100);
  background: var(--c-148-165-173-100);
  cursor: not-allowed;
}

.login_action_box {
  width: 25rem;
  height: 2.875rem;
  margin-top: 2.25rem;
}

.login_action_title {
  width: 100%;
  height: 100%;
}

.login_c_box {
  width: 25rem;
  height: 1.25rem;
  margin-top: 1.125rem;
}

.login_c_type {
  width: max-content;
  height: 100%;
  color: var(--c-034-056-081-100);
  font-weight: 400;
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  cursor: pointer;
}
</style>
