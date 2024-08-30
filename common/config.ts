//此文件App请求配置   //如使用web 通过vite.config走代理需在.env中配置
const config = {
  debug: false,
  https: {
    // baseUrl: "http://www.olongfen.top:8820",
    baseUrl: "https://wisdomapi.starwiz.cn",
    // baseUrl: "http://192.168.3.42:8820",
    proxyUrl: "/api",
  },
};

export default config;
