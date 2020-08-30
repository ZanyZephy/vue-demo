<template>
  <div class="box">
    <!-- 标题时间 -->
    <div class="header">
      {{ title_time }}
    </div>
    <!-- 星期列表 -->
    <div class="weeks">
      <li
        v-for="(item, index) in week"
        :key="index"
        :class="{ liActive: item.day == checkWeek.day }"
        @click="check(item)"
      >
        <span>{{ item.day }}</span>
        <span>{{ item.weekName }}</span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      week: "", //一个星期
      checkWeek: "", //选中的时间
      title_time: "" //标题时间
    };
  },
  methods: {
    //初始化一个星期
    initWeek() {
      let week = [];
      for (let i = 0; i < 7; i++) {
        let nowDate = new Date(new Date().setDate(new Date().getDate() + i)); //设置往后7天;
        let year = nowDate.getFullYear(); //当前年份
        let month = nowDate.getMonth() + 1; //当前月份
        let day = nowDate.getDate(); //当前天数
        let ymd =
          year +
          "-" +
          (month <= 9 ? "0" + month : month) +
          "-" +
          (day <= 9 ? "0" + day : day); //得到年月日
        let weekName = nowDate.getDay(); //获取星期几并进行格式化
        if (weekName == 1) {
          weekName = "周一";
        } else if (weekName == 2) {
          weekName = "周二";
        } else if (weekName == 3) {
          weekName = "周三";
        } else if (weekName == 4) {
          weekName = "周四";
        } else if (weekName == 5) {
          weekName = "周五";
        } else if (weekName == 6) {
          weekName = "周六";
        } else if (weekName == 0) {
          weekName = "周日";
        }

        let obj = {
          //定义的属性对象
          useDate: ymd, //例：2020-01-01
          day: day, //例：1
          weekName: weekName //例：周三
        };
        week.push(obj);
      }
      week[0].weekName = "今天"; //规则，第一天就是今天，改周名为今天
      this.week = week; //引用赋值
      this.checkWeek = week[0]; //默认选中今天
      this.title_time = this.formatTime(week[0].useDate); //默认今天，显示标题栏时间
    },

    //选择方法
    check(val) {
      this.checkWeek = val;
      this.title_time = this.formatTime(this.checkWeek.useDate);
    },
    //格式化标题时间
    formatTime(data) {
      let year =  new Date(data).getFullYear();
      let month =  new Date(data).getMonth() + 1;
      let title_time = year + "年" + (month <= 9 ? "0" + month : month) + "月";
      return title_time;
    }
  },
  created() {
    this.initWeek();
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
  line-height: 44px;
  text-align: center;
  float: left;
}
.weeks {
  width: 100%;
  float: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;
}
.weeks > li {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 5px 8px;
}
.liActive {
  background: #2196fd;
  color: #fff;
  border-radius: 2px;
}
</style>
