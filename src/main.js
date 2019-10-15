import router from './router'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { TabContainer, TabContainerItem, InfiniteScroll,Swipe, SwipeItem, Picker, Lazyload } from 'mint-ui';
import TopHead from 'base/top-head'
import {Loading} from 'lib'

Vue.use(InfiniteScroll)
Vue.use(Lazyload)

Vue.config.productionTip = false

// mint-ui
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Picker.name, Picker)

// top head
Vue.component('TopHead', TopHead)

Vue.mixin({
  beforeRouteLeave(to, from, next) {
    // 页面离开，就关闭Loading,它有个遮罩层
    Loading.close()
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
