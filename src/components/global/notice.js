import notice from 'base/notice';

export default {
  install(Vue) {
    const Com = Vue.extend(notice); //拓展方法
    const vm = new Com().$mount(); //组件实例化
    document.body.appendChild(vm.$el);
    Vue.prototype.$notice = vm
  }
}
