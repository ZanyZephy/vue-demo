<template>
  <div class="box">
    <li @click="$router.push('/radio1')">单选方法1</li>
    <li @click="$router.push('/radio2')">单选方法2</li>
    <li @click="$router.push('/checkBox1')">多选方法1</li>
    <li @click="$router.push('/checkBox2')">多选方法2</li>
    <li @click="$router.push('/checkBox3')">多选方法1+全选</li>
    <li @click="$router.push('/checkBox4')">多选方法2+全选</li>
    <li @click="$router.push('/betterScroll')">垂直滚动</li>
    <li @click="$router.push('/betterScroll2')">横向滚动</li>
    <li @click="$router.push('/betterScroll3')">上拉加载</li>
    <li @click="$router.push('/betterScroll4')">下拉刷新</li>
    <li @click="$router.push('/weeks')">一个星期</li>
    <li @click="$router.push('/calendar')">日历</li>
    <li @click="$router.push('/father')">发布订阅模式和eventBus</li>
    <li @click="$router.push('/es6')">ES6</li>
  </div>
</template>

<script>
export default {
  name: "home",
  created() {},
};
</script>
<style scoped>
.box {
  width: 100%;
  max-width: 100px;
  float: left;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
li {
  width: 100%;
  float: left;
  border: 1px solid gray;
  margin: 5px 0;
  text-align: center;
}
</style>
