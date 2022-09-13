/* eslint-disable no-prototype-builtins */
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
// import Vue from "vue";
import axios from "axios";
// import store from "../store";
// import router from "../router";

// import Message from "@/components/message";
import Message from "ant-design-vue/lib/message";

// 请求超时时间
// axios.defaults.timeout = 10000;

// axios.defaults.withCredentials = true;

// post请求头
axios.defaults.headers["Content-Type"] = "application/json";

// axios.defaults.baseURL =
//   "https://www.easy-mock.com/mock/5caeaec8e783b2140588fd0b/api/";

// axios.defaults.baseURL = "http://server.natappfree.cc:35688/";
// axios.defaults.baseURL = "http://localhost:7086/";
// axios.defaults.baseURL = "http://192.168.100.42:7086";
axios.defaults.baseURL = "http://192.168.100.217:7086";

// 请求拦截器

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.userInfo ? store.state.userInfo.token : "";
    // token && (config.headers.Authorization = token);
    // config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    let data = response.data;
    // 判断有没有code字段，如果有就直接返回data对象
    // 这里加判断主要是兼容之前的接口不符合规范，等所有接口规范后就删除这里
    if (data.hasOwnProperty("code")) {
      if (data.code !== 0) {
        // 默认所有的错误都弹出errprmessage消息,也可通过传动hideMessage来关闭，自行去catch里面处理
        if (!response.config.hideMessage) {
          Message.error({
            content: data.message || "请求出现未知错误，请稍后重试",
          });
        }
        return Promise.reject(new Error(data.message || "Error"));
      } else {
        return data;
      }
    } else {
      //后端自定义成功状态
      if (data.hasOwnProperty("errorCode")) {
        if (!response.config.hideMessage) {
          Message.error({
            content: data.errorMessage || "请求出现未知错误，请稍后重试",
          });
        }
        return Promise.reject(new Error(data.errorMessage || "Error"));
      } else {
        return data;
      }
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    let { hideMessage } = error.response.config;
    switch (error.response.status) {
      //404 资源不存在
      case 404:
        if (!hideMessage) {
          Message.error("网络请求不存在");
        }
        break;
      // 系统错误
      case 500:
        switch (error.response.data && error.response.data.errorCode) {
          // case 4000: // token过期
          //   if (!hideMessage) {
          //     Message.error("抱歉，身份信息过期，请重新登录！");
          //   }
          //   store.commit("clearUserInfo");
          //   router.push({ name: "Login" });
          //   break;
          // case 4002: // 授权跳转
          //   store.commit("clearUserInfo");
          //   window.location.href = error.response.data.redirect;
          //   break;
          default:
            if (!hideMessage) {
              Message.error({
                content:
                  error.response.data.errorMessage ||
                  "网络出现错误，请稍后重试",
              });
            }
        }
        break;
      // 其他错误，直接抛出错误提示
      default:
        if (!hideMessage) {
          Message.error({
            content:
              error.response.data.errorMessage ||
              "请求出现未知错误，请稍后重试",
          });
        }
    }
    return Promise.reject(error);
  }
);

export default instance;
