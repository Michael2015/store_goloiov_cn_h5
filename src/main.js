import router from './router'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  TabContainer,
  TabContainerItem,
  InfiniteScroll,
  Swipe,
  SwipeItem,
  Picker,
  Lazyload,
  Search,
  Cell,
  DatetimePicker
} from 'mint-ui';
import TopHead from 'base/top-head'
import notice from 'com/global/notice'
import {
  Loading
} from 'lib'
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

NProgress.configure({
  showSpinner: false
})

Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.use(notice)

Vue.config.productionTip = false

// mint-ui
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Picker.name, Picker)
Vue.component(Search.name, Search);
Vue.component(Cell.name, Cell);
Vue.component(DatetimePicker.name, DatetimePicker);
// top head
Vue.component('TopHead', TopHead)

Vue.mixin({
  beforeRouteLeave(to, from, next) {
    // 页面离开，就关闭Loading,它有个遮罩层
    Loading.close()
    next()
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
