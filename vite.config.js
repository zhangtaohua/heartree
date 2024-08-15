import * as dotenv from "dotenv";
import path from "path";
import fs from "fs-extra";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default ({}) => {
  const NODE_ENV = process.env.NODE_ENV || "development";
  const envFiles = [path.resolve(__dirname, `.env.${NODE_ENV}`)];

  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }

  return defineConfig({
    base: "/",
    plugins: [uni()],
    server: {
      // hmr: {
      //   overlay: false
      // },
      port: process.env.VITE_CLI_LOCAL_PORT,
      proxy: {
        [process.env.VITE_SERVER_APP_API]: {
          target: `${process.env.VITE_SERVER_APP_URL}:${process.env.VITE_SERVER_APP_PORT}`,
          changeOrigin: true,
          // rewrite: (path) => path.replace(new RegExp('^' + process.env.VITE_SERVER_APP_API), '')
        },
      },
    },
    build: {
      // 官方要求 vue3 主动开启 sourcemap
      sourcemap: true,
      // 禁止打包时的 console 输出
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: false,
      //   },
      // },
    },
  });
};
