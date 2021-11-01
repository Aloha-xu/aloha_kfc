<template>
  <div class="login">
    123
    <!-- <van-button round type="info">立即登录</van-button> -->
    <!-- 只有一个根元素 -->
    <div @click="add">{{username}}</div>
    <div>{{password}}</div>
    <!-- v-model 让输入框里面的只和 绑定是username 进行同步 -->
    <input type="text" v-model="username">
    <div>{{username}}</div>

  </div>
</template>

<script>
// 放js代码

export default {
  // 叫什么名字
  name: 'Login',
  // data 存放数据 放在return 里面
  data(){
    return {
      // 格式 变量名字 ： 数据
      username:"隔壁老王",
      password: '12345678'
    }
  },
  //存放方法的地方
  methods:{
    // 方法的格式：方法名字（）{} （）里面可以放形参 {}放执行的代码
    // 注意：方法如果没有被调用的话，自己不会自动执行
    // 一种是人为触发事件的时候调用，另一种他们方法之间相互调用
    add(){
      console.log('我被触发');
      // 调用goOn this.方法名字()
      // this.goOn()
      console.log('当add被调用的时候，我也输出了');
      // this.goTime()
      console.log('当goOn被调用的时候触发的');
    },
    goOn(){
      console.log('当add被调用的时候，我也输出了');
      this.goTime()
    },
    goTime(){
      console.log('当goOn被调用的时候触发的');
    }
  }
}
</script>

<style lang="less" scoped>

</style>
