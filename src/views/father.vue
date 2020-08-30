<template>
  <div class="container">
    <brother></brother>
    <sister></sister>
    <span>上面是我的儿子和女儿</span>
  </div>
</template>
<script>
import brother from "../components/brother";
import sister from "../components/sister";
export default {
  components: {
    brother,
    sister,
  },
  data() {
    return {};
  },
  methods: {
    test(){
      console.log('132')
    }
  },
};
</script>
<style scoped>
.container{
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
</style>
