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
      :class="{ liActive: item.checked }"
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
      if (this.checkBox[index].checked) {
        // this.checkBox[index].checked = false; //直接赋值不会进行视图更新
        this.$set(this.checkBox[index], "checked", false);
      } else {
        // this.checkBox[index].checked = true;
        this.$set(this.checkBox[index], "checked", true);
      }
      //返回已选新数组(拥有checked为true的所有元素)
      this.checked = this.checkBox.filter(item => {
        return item.checked;
      });
      console.log(this.checked);
    },

    //全选
    checkAll() {
      //长度不相等进行全选
      if (this.checked.length != this.checkBox.length) {
        for (let i in this.checkBox) {
          this.checkBox[i].checked = true;
        }
        this.checked = this.checkBox.filter(item => {
          return item.checked;
        });
        console.log(this.checked);
        //长度相等进行反选
      } else {
        for (let i in this.checkBox) {
          this.checkBox[i].checked = false;
        }
        this.checked = [];
        console.log(this.checked);
      }
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
