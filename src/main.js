import Vue from 'vue';
// 安裝 Axios 套件
import axios from 'axios';
import VueAxios from 'vue-axios';
// 安裝 bootstrap 套件
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Import Loading component
import Loading from 'vue-loading-overlay';
// Import Loading stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Import 表單驗證套件
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
// Import 背景圖輪播插件
import VueCarousel from 'vue-carousel';
// filter 套件
import dateFilter from './filters/date';
import Currency from './filters/currency';

import App from './App.vue';
import router from './router';
import './bus';
import zhTW from 'vee-validate/dist/locale/zh_TW';

import vuetify from './plugins/vuetify'

import store from './store'

// filter 套件
Vue.filter('currency', Currency);
Vue.filter('date', dateFilter);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
library.add(faCoffee);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
// axios 解決前後端跨領域或是攜帶 cookies 請求問題，如沒加上可能會導致無法撈取到資料
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
// 用戶訂單建立之表單中文驗證
Vue.use(VueI18n);
Vue.use(VueCarousel);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

new Vue({
  i18n,
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app');

// 路由驗證
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  // 如果目的網頁需要做驗證的話，則執行驗證 api 程序
  if(to.meta.requiresAuth) {
    const api = 'https://vue-course-api.hexschool.io/api/user/check';
    axios.post(api).then((response) => {
      // console.log(response.data)
      // 如果驗證通過則進入目的網頁
      // 驗證失敗則退回 login 頁面
      if(response.data.success) {
        next();
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      };
    });
  }else{
    next();
  }
});
