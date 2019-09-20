import router from './router'
import Vue from 'vue'
import App from './App.vue'
import { TabContainer, TabContainerItem, InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
