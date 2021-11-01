import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import { Button } from 'vant'
import 'lib-flexible/flexible'

import { Form, Field ,Popup ,Tabbar, TabbarItem,Search,Swipe, SwipeItem} from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Popup);
Vue.use(Button)
Vue.use(Form);
Vue.use(Field);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
