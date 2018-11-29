import modal from './notify.vue'

let notify = {
  install(Vue, options={delay:3000}) {
    Vue.prototype.$notify = function (message, opt) {
        if(notify.el) return;
        options = {...options, ...opt}; //用自己调用插件时传递过来的属性覆盖掉默认设置好的
        let V = Vue.extend(modal); // 返回的是一个构造函数的子类，参数是包含组件选项的对象
        let vm = new V;
        let oDiv = document.createElement('div');
        vm.$mount(oDiv);
        vm.msg = message;
        document.body.appendChild(vm.$el);
        notify.el = vm.$el;
        setTimeout(()=>{ // 延迟多少秒，将dom元素移除掉
            document.body.removeChild(vm.$el); // 将实例的元素删除掉
            notify.el = null;
        }, options.delay)
    }
  }
};

export default notify;