<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header">
      <div class="prev" @click="init(-1)"></div>
      <span>{{ titleYear }}年{{ titleMonth }}月</span>
      <div class="next" @click="init(1)"></div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 星期 -->
      <div class="week">
        <div class="weekList" v-for="(item, index) in weeks" :key="index">{{ item.name }}</div>
      </div>
      <!-- 时间 -->
      <!-- 如果需要补上前后的月份我的解决方案是遍历上月，当前月和下个月的 -->
      <div class="date">
        <!-- 遍历上个月的(补充本月不足部分) -->
        <div class="dateList" v-for="(item, index) in prevDays" :key="'prev' + index">
          <span style="color:#e3e3e3;">{{ item.day }}</span>
        </div>

        <div class="dateList" v-for="(item, index) in days" :key="index">
          <span>{{ item.day }}</span>
        </div>

        <!-- 遍历下个月的(补充本月不足部分) -->
        <div class="dateList" v-for="(item, index) in nextDays" :key="'next' + index">
          <span style="color:#e3e3e3;">{{ item.day }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weeks: [
        {id: "0",name: "日"},
        {id: "1",name: "一"},
        {id: "2",name: "二"},
        {id: "3",name: "三"},
        {id: "4",name: "四"},
        {id: "5",name: "五"},
        {id: "6",name: "六"}
      ],
      prevDays: [], //上个月的数组
      days: [], //当前月份的数组
      nextDays: [], //下个月的数组
      count: 0, //用来切换上个月和下个月(下个月+1，上个月-1)
      titleYear: "", //标题年份
      titleMonth: "" //标题月份
    };
  },
  methods: {
    //初始化
    init(e) {
      if (typeof e=='number') {
        this.count = Number(this.count) + Number(e);
        this.prevDays = []; //上个月的数组
        this.days = []; //当前月份的数组
        this.nextDays = []; //下个月的数组
      }
      
      //获取上月的天数
      let prevYear = new Date(new Date().setMonth(new Date().getMonth() + this.count - 1)).getFullYear(); //获取上个月年份
      let prevMonth =new Date(new Date().setMonth(new Date().getMonth() + this.count - 1)).getMonth() + 1; //获取上个月月份
      let prevDay = new Date(prevYear, prevMonth, 0).getDate(); //获取上个月天数
      console.log(prevDay);

      //获取现在的年月日(上月变本月)
      let nowYear = new Date(new Date().setMonth(new Date().getMonth() + this.count)).getFullYear(); //获取当前年份
      let nowMonth =new Date(new Date().setMonth(new Date().getMonth() + this.count)).getMonth() + 1; //获取当前月份
      let nowDay = new Date(nowYear, nowMonth, 0).getDate(); //获取当前总天数
      this.titleYear = nowYear;
      this.titleMonth = nowMonth;
      console.log(nowDay);

      //获取下个月的年月日
      let nextYear = new Date(new Date().setMonth(new Date().getMonth() + this.count + 1)).getFullYear(); //获取下个月年份
      let nextMonth =new Date(new Date().setMonth(new Date().getMonth() + this.count + 1)).getMonth() + 1; //获取下个月月份
      let nextDay = new Date(nextYear, nextMonth, 0).getDate(); //获取下个月总天数
      console.log(nextDay);

      //获取当月第一天星期几
      let nowFirstDay = new Date(nowYear, nowMonth - 1, 1).getDay(); //获取本月第一天是星期几
      let nowLastDay = new Date(nowYear, nowMonth - 1, nowDay).getDay(); //获取本月最后一天是星期几

      //获取本月第一天在weeks里面的位置(位置)
      let firstIndex = this.weeks.findIndex(item => {
        return item.id == nowFirstDay;
      });
      //获取本月最后一天在weeks里面的位置(位置)
      let lastIndex = this.weeks.findIndex(item => {
        return item.id == nowLastDay;
      });

      //补充头部
      if (firstIndex != 0) {
        //如果下标是0则不需要补充，非0则需要补充
        let needDays = firstIndex; //根据计算规则得到前面需要补充多少天
        //计算规则：你会发现得到第一天的下标如果不是0，当下标为1，前面需要补充1，下标为2需要补充2...
        let startDay = prevDay - needDays + 1; //得到上个月最后开始的天数,上个月的总天数减去需要补充的天数加1就可以得到开始时间
        let days = [];
        for (let i = startDay; i <= prevDay; i++) {
          //遍历得到需要补充上个月的数据
          let obj = {};
          obj.day = i;
          obj.useDate =prevYear +"-" +(prevMonth <= 9 ? "0" + prevMonth : prevMonth) +"-" +(i <= 9 ? "0" + i : i);
          days.push(obj);
        }
        this.prevDays = days;
      }
      //填充当前月份
      let days = []; //声明数组
      for (let i = 1; i <= nowDay; i++) {
        //遍历当前月份的最后一天可以得到总天数
        let obj = {}; //声明对象(这里我保存两个属性,一个是当前的天数，一个是年月日)
        obj.day = i;
        obj.useDate =nowYear +"-" +(nowMonth <= 9 ? "0" + nowMonth : nowMonth) +"-" +(i <= 9 ? "0" + i : i);
        days.push(obj);
      }
      this.days = days;
      //补充尾部
      if (lastIndex != 6) {
        //如果最后一天不是星期六,则需要进行补充(这里进行补充)
        let needDays = 6 - lastIndex; //得到需要补充的时间（得到最后需要补充多少空格）
        // 计算规则：你会发现最后一天如果下标不是6，假如是5，6-5，需要补充一天，假如是4，6-4需要补充两天
        let days = [];
        for (let i = 1; i <= needDays; i++) {
          //遍历需要补充的事件
          let obj = {};
          obj.day = i;
          obj.useDate =nextYear +"-" +(nextMonth <= 9 ? "0" + nextMonth : nextMonth) +"-"+(i <= 9 ? "0" + i : i);
          days.push(obj);
        }
        this.nextDays = days;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  float: left;
}
.header {
  width: 100%;
  height: 44px;
  float: left;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  background: #2695fd;
  color: #fff;
}
.prev {
  width: 12px;
  height: 12px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  transform: rotate(-45deg);
}
.next {
  width: 12px;
  height: 12px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}
.content {
  width: 100%;
  float: left;
}
.week {
  width: 100%;
  height: 44px;
  float: left;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  background: #2695fd;
}

.weekList {
  /* css新的计算属性calc */
  width: calc(100% / 7);
  color: #fff;
  text-align: center;
}

.date {
  width: 100%;
  float: left;
}

.dateList {
  width: calc(100% / 7);
  height: 44px;
  line-height: 44px;
  float: left;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
