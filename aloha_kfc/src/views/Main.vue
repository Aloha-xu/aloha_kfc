<!--  -->
<template>
  <div class="Main">
    <router-view />
    <van-tabbar v-model="active" active-color="	#1E90FF" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
</style>