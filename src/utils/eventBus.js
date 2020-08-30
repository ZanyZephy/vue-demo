class EventBus {
  constructor() {
    //创建一个空的对象
    this.event = Object.create(null);
  }
  //注册事件
  on(name, fn) {
    if (!this.event[name]) {
      //一个事件可能有多个监听者
      this.event[name] = [];
    }
    this.event[name].push(fn);
  }
  //触发事件
  emit(name, ...args) {
    //给回调函数传参 如果存在事件名，遍历事件，
    this.event[name] &&
      this.event[name].forEach((fn) => {
        console.log(fn)
        fn(...args);
      });
  }
  //只被触发一次的事件
  once(name, fn) {
    //在这里同时完成了对该事件的注册、对该事件的触发，并在最后取消该事件。
    const cb = (...args) => {
      //触发
      fn(...args);
      //取消
      this.off(name, fn);
    };
    //监听
    this.on(name, cb);
  }
  //取消事件
  off(name, offcb) {
    if (this.event[name]) {
      let index = this.event[name].findIndex((fn) => {
        return offcb === fn;
      });
      this.event[name].splice(index, 1);
      if (!this.event[name].length) {
        delete this.event[name];
      }
    }
  }
}