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
      :class="{ liActive: checked.includes(item) }"
    >
      {{ item.name }}
    </li>
    <li
      @click="checkAll()"
      :class="{ liActive: checked.length == checkBox.length }"
    >
      全选
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
      checked: []
    };
  },
  methods: {
    check(index) {
      //如果选中的值存在已选的数组则返回与选中值不等的新已选数组(取消选中的效果)
      if (this.checked.includes(this.checkBox[index])) {
        this.checked = this.checked.filter(item => {
          return item != this.checkBox[index];
        });
        //不过已选中的数组不存在该选中的值，则添加数组
      } else {
        this.checked.push(this.checkBox[index]);
      }
      console.log(this.checked);
    },
    //全选与反选
    checkAll() {
      if (this.checked.length != this.checkBox.length) {
        this.checked = this.checkBox;
      } else {
        this.checked = [];
      }
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
