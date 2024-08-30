import appConfig from "@/common/config";
import { getIsPhone } from "@/utils/system/platform";
import luchRequest from "luch-request";
import { getUserToken } from "@/utils/http/token";
import { globalSystemInfo } from "@/utils/system/platform";

const IS_PHONE = getIsPhone();

function getBaseUrl(options = {}) {
  let baseUrl = "";
  // #ifdef APP-PLUS
  if (IS_PHONE) {
    baseUrl = appConfig.https.baseUrl;
  }
  // #endif
  return baseUrl;
}
const httpsRequet = new luchRequest();

/* 设置全局配置 */
httpsRequet.setConfig((config: any) => {
  config.baseURL = getBaseUrl();
  config.timeout = 10000;
  config.header = {
    "Content-Type": "application/json",
  };
  return config;
});

/* 请求之前拦截器。可以使用async await 做异步操作 */
httpsRequet.interceptors.request.use(
  (config: any) => {
    const userToken = getUserToken();
    if (userToken) {
      config.header = {
        ...config.header,
        Authorization: `${userToken.tokenType} ${userToken.accessToken}`,
        "X-Forwarded-Ssl": "on",
        "X-Device-Id": globalSystemInfo.deviceId,
      };
    } else {
      // 如果token不存在，return Promise.reject(config) 会取消本次请求
      // return Promise.reject(config)
      config.header = {
        "X-Device-Id": globalSystemInfo.deviceId,
      };
    }
    return config;
  },
  (config) => {
    return Promise.reject(config);
  }
);

/* 请求之后拦截器。可以使用async await 做异步操作  */
httpsRequet.interceptors.response.use(
  (response) => {
    // if (response.config.custom.loading) {
    //    uni.hideLoading()
    //  }
    if (
      Number(response.statusCode) >= 200 &&
      Number(response.statusCode) <= 299 &&
      Number(response.data.code) === 0
    ) {
      return Promise.resolve(response.data);
    } else {
      // 服务端返回的状态码不等于200，则reject()
      if (Number(response.statusCode) == 401) {
        uni.navigateTo({
          url: "/pages/user/login/login",
        });
        return Promise.reject(response);
      }
      return Promise.reject(response);
    }
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    // if (response.config.custom.loading) {
    //    uni.hideLoading()
    //  }
    if (Number(response.statusCode) == 401) {
      uni.redirectTo({
        url: "/pages/user/login/login",
      });
      return Promise.reject(response);
    }
    return Promise.reject(response);
  }
);

export default httpsRequet;
