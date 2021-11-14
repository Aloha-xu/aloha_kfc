<template>
  <div class="myorder">
    <div class="nav-bar">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <van-tabs @click="loading">
      <van-tab title="全部"
        ><OrderCard :orderInfo="orderInfo"></OrderCard
      ></van-tab>
      <van-tab title="进行中"
        ><OrderCard :orderInfo="orderingInfo"></OrderCard
      ></van-tab>
      <van-tab title="已完成"
        ><OrderCard :orderInfo="orderedInfo" @></OrderCard
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import OrderCard from "../components/OrderCard.vue";
export default {
  components: { OrderCard },
  data() {
    return {
      orderInfo: null,
      orderingInfo: null,
      orderedInfo: null,
    };
  },
  methods: {
    getOrder() {
      this.axios({
        method: "get",
        url: "/getOrder",
        params: {
          id: this.$store.state.uid,
          stutas: 0,
        },
      })
        .then((res) => {
          this.orderInfo = res.data.data;
        })
        .catch((err) => {});
    },
    getOrderingInfo() {
      this.axios({
        method: "get",
        url: "/getOrder",
        params: {
          id: this.$store.state.uid,
          stutas: 1,
        },
      })
        .then((res) => {
          this.orderingInfo = res.data.data;
        })
        .catch((err) => {});
    },
    getOrderedInfo() {
      this.axios({
        method: "get",
        url: "/getOrder",
        params: {
          id: this.$store.state.uid,
          stutas: 2,
        },
      })
        .then((res) => {
          this.orderedInfo = res.data.data;
        })
        .catch((err) => {});
    },
    loading(n, t) {
      if(n == 1){
        this.getOrderingInfo()
      }
      if(n == 2){
       this.getOrderedInfo()
      }
      
    },
    delectOrder(){
       this.axios({
        method: "post",
        url: "/delectOrder",
        data: {
          id: this.$store.state.uid,
          orderId : orderId
        },
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {});
    }
  },
  created() {
    this.getOrder();
  },
};
</script>

<style>
</style>