<template>
  <div class="container">
    <span>我是妹妹→</span>
    <button @click="reject()">拒收哥哥的苹果，哥哥发不过来</button>
    <div class="state">
      <span>收到哥哥的5个苹果{{ apple || 0 }}个</span>
      <span>收到哥哥的3个苹果{{ apple1 || 0 }}个</span>
      <span>收到哥哥的香蕉{{ banana || 0 }}个</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apple: "", //苹果
      apple1: "",
      banana: "", //香蕉
    };
  },
  methods: {
    reject() {
      this.bus.$off("apple", function(msg) {
        console.log("999");
        console.log(msg);
      });
    },
    banBanana() {
      this.bus.$off("banana");
    },
  },
  mounted() {
    let that = this;
    this.bus.$on("apple", function(e) {
      that.apple = e;
      console.log(e);
    });

    this.bus.$on("apple", function(e) {
      that.apple1 = e;
    });

    this.bus.$on("banana", function(e) {
      that.banana = e;
      console.log(e);
    });
  },
};
</script>
<style scoped>
.state{
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
</style>
