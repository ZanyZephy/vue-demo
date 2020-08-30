<template>
  <div class="pulldown">
    <li
      style="width: 100%;height: 40px;line-height: 40px;text-align: center;color:#fff;background-color: #42b983;"
      @click="$router.back(1)"
    >
      返回
    </li>
    <!-- 分割线 -->
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <!--ref获取bsWrapper的DOM信息--><!--pulldown-bswrapper父容器-->
      <div class="pulldown-scroller">
        <!--子容器-->
        <div class="pulldown-wrapper">
          <!--上拉的盒子-->
          <div v-show="beforePullDown">
            <!--开始上拉刷新前,提示的文字(提醒客户上拉刷新)-->
            <span>Pull Down and refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <!--加载中的盒子-->
            <div v-show="isPullingDown">
              <!--正在加载中-->
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>Refresh success</span></div>
            <!--加载后显示的刷新结果-->
          </div>
        </div>
        <ul class="pulldown-list">
          <!--内容盒子-->
          <li v-for="i of dataList" :key="i" class="pulldown-list-item">
            <!--遍历的元素-->
            {{ `I am item ${i} ` }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";

BScroll.use(PullDown);

function getOneRandomList(step = 0) {
  const arr = Array.apply(null, { length: 30 + step }).map(
    (...args) => args[1]
  );
  return arr.sort(() => Math.random() - 0.5);
}

const TIME_BOUNCE = 800; //bounceTime回弹动画的动画时长。
const TIME_STOP = 600; //执行结束上拉刷新函数延迟时间
const THRESHOLD = 70; //配置顶部下拉的距离
const STOP = 56; //回弹停留的距离
let STEP = 0;

export default {
  data() {
    return {
      beforePullDown: true, //自定义的上拉加载盒子(加载盒子和未加载的盒子)
      isPullingDown: false, //自定义的加载盒子的加载状态(加载完毕)
      dataList: getOneRandomList()
    };
  },
  created() {
    this.bscroll = null;
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    //初始化
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        scrollY: true, //开启y轴滚动
        bounceTime: TIME_BOUNCE, //回弹动画的动画时长(TIME_BOUNCE是自定义的回弹动画时长,值是800)
        // bounceTime
        // 类型：Number
        // 默认值：800（单位ms，不建议修改）
        // 作用：设置回弹动画的动画时长。
        pullDownRefresh: {
          //默认为 false。当设置为 true 或者是一个 Object 的时候(当前就是Object,开启下拉刷新)，可以开启下拉刷新。
          threshold: THRESHOLD, //配置顶部下拉的距离来决定刷新时机(THRESHOLD是自定义的距离,值是70)
          stop: STOP //回弹停留的距离(STOP是自定义的回弹停留的距离,值是56)
        }
      });
      // on(type, fn, context)
      // 参数：
      // {String} type 事件名
      // {Function} fn 回调函数
      // {context} 函数执行的上下文环境，默认是 this
      // 返回值：无
      // 作用：监听当前实例上的钩子函数。如：scroll、scrollEnd 等。
      this.bscroll.on("pullingDown", this.pullingDownHandler); //触发回调函数this.pullingDownHandler
      // pullingDown
      // 参数：无
      // 触发时机：当顶部下拉的距离大于 threshold 值时，触发一次 pullingDown 钩子。
      this.bscroll.on("scroll", this.scrollHandler);//监听滚动条,触发了回调函数this.scrollHandler(这里是用来打印,可以注释掉)
    },
    //监听滚动条,pos里面包含了x,y坐标(这个函数可以注释掉)
    scrollHandler(pos) {
      console.log(pos.y);
    },
    //触发下拉刷新的函数
    async pullingDownHandler() {
      this.beforePullDown = false; //beforePullDown为false,默认提示上拉加载的盒子变为正在加载中的盒子
      this.isPullingDown = true; //正在加载中的盒子，打开加载中的动画
      STEP += 10; //初始值为0,添加10条数据
      await this.requestData(); //等待获取的数据

      this.isPullingDown = false; //数据获取之后，状态为加载中的盒子，进行加载中的动画改为加载完毕
      this.finishPullDown(); //执行结束上拉刷新函数
    },
    async finishPullDown() {
      const stopTime = TIME_STOP;
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown(); //延迟执行结束上拉刷新函数
          resolve();
        }, stopTime);
      });
      setTimeout(() => {
        this.beforePullDown = true; //状态为加载中的盒子改为加载前的盒子
        this.bscroll.refresh(); //重新计算BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      }, TIME_BOUNCE);
    },
    async requestData() {
      try {
        const newData = await this.ajaxGet(/* url */);
        //等待this.ajaxGet()函数执行完毕
        this.dataList = newData;
      } catch (err) {
        // handle err
        console.log(err);
      }
    },
    //获取请求数据
    ajaxGet(/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          const dataList = getOneRandomList(STEP); //传入10条数据
          resolve(dataList);
        }, 1000);
      });
    }
  }
};
</script>
<style scoped>
.pulldown {
  height: 100%;
}
.pulldown-bswrapper {
  position: relative;
  height: 300px;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.pulldown-list {
  padding: 0;
}

.pulldown-list-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
</style>
