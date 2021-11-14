import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import { Button } from 'vant'
import 'lib-flexible/flexible'

import { Form, Field, Popup, Tabbar, TabbarItem, Search, Swipe, SwipeItem, Stepper, Icon, Lazyload, Empty, SubmitBar, GoodsAction, GoodsActionIcon, GoodsActionButton, NavBar, Tab, Tabs, Cell, CellGroup, Checkbox, CheckboxGroup, Toast, Image, Area, Switch, AddressEdit, AddressList, Card } from 'vant';

Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(SubmitBar);
Vue.use(Empty);
Vue.use(Stepper);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(Image);
Vue.use(CheckboxGroup);
Vue.use(Area);
Vue.use(Switch);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Card);
Vue.use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
