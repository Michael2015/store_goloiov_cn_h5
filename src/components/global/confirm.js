import confirm from 'base/confirm';

export default {
  install(Vue) {
    const Com = Vue.extend(confirm); //拓展方法
    const vm = new Com().$mount(); //组件实例化
    document.body.appendChild(vm.$el);
    Vue.prototype.$confirm = vm
  }
}
