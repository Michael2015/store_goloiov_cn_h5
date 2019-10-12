import router from './router'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { TabContainer, TabContainerItem, InfiniteScroll,Swipe, SwipeItem, Picker, Lazyload } from 'mint-ui';

Vue.use(InfiniteScroll)
Vue.use(Lazyload)

Vue.config.productionTip = false

// mint-ui
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Picker.name, Picker)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
