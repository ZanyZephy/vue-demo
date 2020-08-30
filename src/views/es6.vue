<template>
  <div class="box"></div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    myFunction() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve((this.count += 1));
        }, 1000);
      });
    }
  },
  async created() {
    // console.log("测试开始");
    // await this.myFunction();
    // console.log("测试结束");
    // console.log(this.count);
    // console.log(this.myFunction());
    await this.myFunction().then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
    console.log('123')
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  float: left;
}
</style>
