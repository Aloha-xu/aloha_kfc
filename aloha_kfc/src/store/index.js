import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //这里放需要跨组件传递的数据

    //用户信息
    uid:1635771707167,

    //加入购物车的商品信息
    goods:[]

  },
  mutations: {
    //同步 修改state数据

    setUserInfo(state,user){
      state.user = user
    },

    addGoods(state,goods){
      state.goods.push(goods)
    }

  },
  actions: {
  },
  modules: {
  }
})
