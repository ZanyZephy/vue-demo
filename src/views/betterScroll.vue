<template>
  <div class="box">
    <li
      style="width: 100%;height: 40px;line-height: 40px;text-align: center;color:#fff;background-color: #42b983;"
      @click="$router.back(1)"
    >
      返回
    </li>
    <!-- 分割线 -->
    <div class="wrapper" ref="scroll">
      <div class="content">
        <li v-for="(item, index) in staticList" :key="index">{{ item }}</li>
      </div>
    </div>
    <!-- 分割线 -->
  </div>
</template>
<script>
// 更多详情参考以下链接
// https://better-scroll.github.io/docs/zh-CN/guide/base-scroll.html#%E4%B8%8A%E6%89%8B
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      staticList: [
        "😀 😁 😂 🤣 😃",
        "😄 😅 😆 😉 😊",
        "😫 😴 😌 😛 😜",
        "👆🏻 😒 😓 😔 👇🏻",
        "😑 😶 🙄 😏 😣",
        "😞 😟 😤 😢 😭",
        "🤑 😲 ☹️ 🙁 😖",
        "👍 👎 👊 ✊ 🤛",
        "☝️ ✋ 🤚 🖐 🖖",
        "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
        "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
        "🌖 🌗 🌘 🌑 🌒",
        "💫 💥 💢 💦 💧",
        "🐠 🐟 🐬 🐳 🐋",
        "😬 😐 😕 😯 😶",
        "😇 😏 😑 😓 😵",
        "🐥 🐣 🐔 🐛 🐤",
        "💪 ✨ 🔔 ✊ ✋",
        "👇 👊 👍 👈 👆",
        "💛 👐 👎 👌 💘"
      ]
    };
  },
  methods: {
    //初始化滚动条
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
      console.log(this.bs);
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  float: left;
}
.wrapper {
  height: 400px;
  overflow: hidden;
}
.content {
  float: left;
}
li {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-align: center;
}
li:nth-child(2n) {
  background-color: #f3f5f7;
}

li:nth-child(2n + 1) {
  background-color: #42b983;
}
</style>
