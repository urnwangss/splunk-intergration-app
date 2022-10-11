import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/ant-design-vue/component";

import api from "@/api";
import "@/style/index.less";
import DMUI from "dm-vue-ui";
import "dm-vue-ui/lib/dm-vue-ui.css";

Vue.use(DMUI);

Vue.config.productionTip = false;

Vue.prototype.$api = api;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
