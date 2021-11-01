<!--  -->
<template>
  <div class="login">
    <div class="login-top">
      <div class="top-left">
      </div>
      <div class="top-right">先逛逛</div>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <van-form>
    <van-field
      v-model="userLoginInfo.phone"
      name="手机号码"
      label="手机号码"
      placeholder="手机号码"
      autocomplete="off"
    />
    <van-field
      v-model="userLoginInfo.password"
      @click-right-icon = "changeReye"
      :right-icon="registerEye?'closed-eye':'browsing-history-o'"
      :type="registerEye?'password':'text'"
      name="密码"
      label="密码"
      placeholder="密码"
      autocomplete="off"
    />
    <div style="margin: 16px;">
      <van-button @click="loginW" color="#fc3b3c" round block type="info" native-type="submit">立即登录</van-button>
    </div>
    <div class="text" style="margin: 16px;">
      <van-button 
      @click="showPopup" 
      color="white" 
      round block type="info" 
      native-type="submit"
      >立即注册</van-button>
    </div>
    </van-form>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
      <h1 class="title">注册</h1>
      <van-form>
    <van-field
      v-model="register.phone"
      clearable
      name="手机号码"
      label="手机号码"
      placeholder="输入11位号码"
      autocomplete="off"
    />
    <van-field
      v-model="register.password"
      clearable
      @click-right-icon = "changeReye"
      :right-icon="registerEye?'closed-eye':'browsing-history-o'"
      :type="registerEye?'password':'text'"
      name="密码"
      label="密码"
      placeholder="密码必须以字母开头"
      autocomplete="off"
    />
    <van-field
      v-model="register.nickname"
      clearable
      type="text"
      name="昵称"
      label="昵称"
      placeholder="昵称"
      autocomplete="off"
    />
    <div style="margin: 16px;">
      <van-button @click="registerW" color="#fc3b3c" round block type="info" native-type="submit">立即注册</van-button>
    </div>
    </van-form>
    </van-popup>
  </div>
</template>

<script>
const {validForm} = require('../assets/js/validForm.js')
export default {
  data() {
    return {
      registerEye:true,
      show: false,
      register:{
        phone:"",
        nickname: '',
        password: '',
      },
      userLoginInfo:{
        phone:"",
        password:""
      }
      
    };
  },

  methods: {
    changeReye(){
      this.registerEye = !this.registerEye
    },
    showPopup() {
      this.show = true;
    },
    registerW(){
      // 正则验证
      // ctrl + D 选中相同的
      // ctrl + 鼠标左键 选中
      let o = {
          phone: {
            value: this.register.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.register.password,
            errorMsg: '密码由数字字母下划线组合(6-16字符)',
            reg: /^[A-Za-z]\w{5,15}$/
          },
          nickName: {
            value: this.register.nickname,
            errorMsg: '昵称由字母数字下划线汉字组合(1-10字符)',
            reg: /^[\w\u4e00-\u9fa5]{1,10}$/
          },
        };
        let isPass = validForm.valid(o);

        // 做一个拦截 如果正则没有通过 那么肯定不能请求服务器
        if(!isPass){
          // 终止后面的代码 跳出这个函数
          return
        }
        // 传递参数 get使用params post 使用data
        this.axios({
          method:'get',
          url:'/register',
          params: {
            user: this.register.phone,
            password: this.register.password,
            nickname: this.register.nickname
          }
        }).then(res => {
          console.log(res);
        }).catch(err =>{

        })
    },
    loginW(){
      let o = {
          phone: {
            value: this.userLoginInfo.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.userLoginInfo.password,
            errorMsg: '密码由数字字母下划线组合(6-16字符)',
            reg: /^[A-Za-z]\w{5,15}$/
          }
        };
        let isPass = validForm.valid(o);

        // 做一个拦截 如果正则没有通过 那么肯定不能请求服务器
        if(!isPass){
          // 终止后面的代码 跳出这个函数
          return
        }
        // 传递参数 get使用params post 使用data
        this.axios({
          method:'get',
          url:'/login',
          params: {
            user: this.userLoginInfo.phone,
            password: this.userLoginInfo.password
          }
        }).then(res => {
          console.log(res);
          localStorage.setItem('token',res.data.data)
        }).catch(err =>{

        })
    }
  },
};

</script>
<style lang="less" scoped>
.login{
  .login-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    // background: pink;
    .top-left{
      height: 30px;
      width: 80px;
      // background: #ccc;
      background: url(../assets/zhuti.png);
      background-size: 100%;
      background-position: 50%;
    }
    .top-right{
      height: 30px;
      width: 80px;
      border-radius: 20px;
      border: 1px solid black;
      text-align: center;
      line-height: 30px;
    }
  }
  .logo{
    img{
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
  .text{
    .van-button--info{
      color: black !important;
    }
  }
  .title{
    text-align: left;
    text-indent: 10px;
  }
}
</style>