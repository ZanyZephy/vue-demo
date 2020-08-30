<template>
  <div class="pullup">
    <li
      style="width: 100%;height: 40px;line-height: 40px;text-align: center;color:#fff;background-color: #42b983;"
      @click="$router.back(1)"
    >
      返回
    </li>
    <!-- 分割线 -->
    <div ref="scroller" class="pullup-bswrapper">
      <!--获取最外层的dom元素,同时设置pullup-bswrapper容器盒子-->
      <div class="pullup-scroller">
        <!--滚动的容器盒子(子元素)-->
        <ul class="pullup-list">
          <!--pullup-list是你获取的数据盒子,li是遍历的数据-->
          <li v-for="i of data" :key="i" class="pullup-list-item">
            {{ i % 5 === 0 ? "scroll up 👆🏻" : `I am item ${i} ` }}
          </li>
        </ul>
        <div class="pullup-wrapper">
          <!--pullup-wrapper是上拉的盒子，例如用来定义加载的动画等-->
          <div v-if="!isPullUpLoad" class="before-trigger">
            <!--isPullUpLoad为真时，提示可以进行加载-->
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span
            ><!--isPullUpLoad为假时，提示正在进行加载-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  data() {
    return {
      isPullUpLoad: false, //是否时加载状态(默认false)
      data: 30 //默认数据30条
    };
  },
  created() {
    this.bscroll = null;
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    //初始化better-scroll
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroller, {
        scrollY: true, //开启垂直滚动
        pullUpLoad: true //开启上拉加载
      });
      // pullingUp
      // 参数：无
      // 触发时机：当距离滚动到底部小于 threshold 值时，触发一次 pullingUp 事件。
      this.bscroll.on("pullingUp", this.pullingUpHandler);
      // on(type, fn, context)
      // 参数：
      // {String} type 事件名
      // {Function} fn 回调函数
      // {context} 函数执行的上下文环境，默认是 this
      // 返回值：无
      // 作用：监听当前实例上的钩子函数。如：scroll、scrollEnd 等。
    },
    // async异步函数(es2017加入的)
    async pullingUpHandler() {
      this.isPullUpLoad = true;
      //this.isPullUpLoad控制的是加载效果显示
      await this.requestData();
      //await更加明确的意思等待
      //只有执行完了this.requestData()才会进行下面的函数
      this.bscroll.finishPullUp();
      // finishPullUp()
      // 介绍：标识一次上拉加载动作结束。
      // 参数：无
      // 返回值：无
      this.bscroll.refresh();
      // refresh()
      // 参数：无
      // 返回值：无
      // 作用：重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.isPullUpLoad = false;
    },
    //获取请求到的数据赋值给data
    async requestData() {
      try {
        const newData = await this.ajaxGet();
        //等待this.ajaxGet()函数执行完毕
        this.data += newData;
        console.log(this.data);
      } catch (err) {
        // handle err
        console.log(err);
      }
    },
    //获取请求数据
    ajaxGet() {
      console.log("我先执行"); //执行异步请求(这里是例子所以设置了定时器，为了加载效果更加清晰)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20);
        }, 1000);
      });
    }
  }
};
</script>
<style scoped>
.pullup {
  height: 100%;
}

.pullup-bswrapper {
  height: 300px;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.pullup-list {
  padding: 0;
}

.pullup-list-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}

.pullup-wrapper {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
