<template>
  <div class="box">
    <li
      style="width: 100%;height: 40px;line-height: 40px;text-align: center;color:#fff;background-color: #42b983;"
      @click="$router.back(1)"
    >
      返回
    </li>
    <!-- 分割线 -->
    <li
      v-for="(item, index) in checkBox"
      :key="index"
      @click="check(index)"
      :class="{ liActive: item == checked }"
    >
      {{ item.name }}
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkBox: [
        { id: 1, name: "小明" },
        { id: 2, name: "小强" },
        { id: 3, name: "小红" },
        { id: 4, name: "小安" }
      ],
      checked: ""
    };
  },
  methods: {
    check(index) {
      //重置和初始化数组
      for (let i in this.checkBox) {
        this.checkBox[i].checked = false;
      }
      this.checkBox[index].checked = true;
      this.checked = this.checkBox.find(item => {
        return item.checked;
      });
      console.log(this.checked);
    }
  }
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
.liActive {
  background: skyblue;
}
</style>
