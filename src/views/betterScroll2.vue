<template>
  <div class="box">
    <!-- 分割线 -->
    <li
      style="width: 100%;height: 40px;line-height: 40px;text-align: center;color:#fff;background-color: #42b983;"
      @click="$router.back(1)"
    >
      返回
    </li>
    <div class="wrapper" ref="scroll">
      <div class="content">
        <li v-for="(item, index) in staticList" :key="index">{{ item }}</li>
      </div>
    </div>
    <!-- 分割线 -->
  </div>
</template>
<script>
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
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3 // listening scroll hook
      });
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
  width: 90%;
  margin: 80px auto;
  white-space: nowrap;
  border: 3px solid #42b983;
  border-radius: 5px;
  overflow: hidden;
}
.content {
  display: inline-block;
}
li {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
}
</style>
