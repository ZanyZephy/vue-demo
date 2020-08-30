<template>
  <div class="container">
    <span>我是哥哥</span>
    <div class="btnView">
      <button @click="send1">发送5个苹果给妹妹</button>
      <button @click="send2">发送3个苹果给妹妹</button>
      <button @click="send3">发送香蕉给妹妹</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    send1() {
      this.bus.$emit("apple", "5");
    },
    send2() {
      this.bus.$emit("apple", "3");
    },
    send3() {
      this.bus.$emit("banana", "7");
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
.btnView{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
button{
  margin: 0 24px;
}
</style>
