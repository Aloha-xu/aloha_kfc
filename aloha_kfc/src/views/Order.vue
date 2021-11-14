<template>
  <div class="order">
    <div class="nav-bar">
      <van-nav-bar
        title="订单信息"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="address-content">
      <van-cell is-link @click="show = !show">选择地址</van-cell>
      <div class="order-address" >
        <div class="address-top">
          <span class="name">{{ selectAddress.name }}</span>
          <span class="phone">{{ selectAddress.tel }}</span>
          <span class="icon" v-show="selectAddress.isDefault">默认</span>
        </div>
        <div class="address-bottom">{{ selectAddress.address }}</div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @click-item="onSelect"
        />
      </van-popup>
      <OrderCard :orderInfo="orderInfo">
        <div slot="no"></div>
      </OrderCard>
    </div>
    <van-button
      type="primary"
      size="large"
      round
      color="red"
      @click="updataOrder"
      >提交订单</van-button
    >
  </div>
</template>

<script>
import OrderCard from "../components/OrderCard.vue";
export default {
  components: { OrderCard },
  data() {
    return {
      show: false,
      chosenAddressId: "1",
      list: [],
      selectAddress: [],
      orderInfo:null
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/address");
    },
    onEdit(item, index) {
      //也是跳转到address 但是是编辑的 可能需要传值
    },
    onSelect(item, index) {
      this.selectAddress = item;
      this.show = false;
    },
    getAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params: {
          userId: this.$store.state.uid,
        },
      })
        .then((res) => {
          res.data.data.map((item) => {
            let list = {};
            list.id = item.userId;
            list.name = item.name;
            list.tel = item.phone;
            list.address = item.area + item.detialArea;
            list.isDefault = item.defaultAddress;
            this.list.push(list);
            if(item.defaultAddress){
              this.selectAddress = list
            }
          });
        })
        .catch((err) => {});
    },
    updataOrder() {
      //这里的提交订单是修改status状态 状态 = 1  还有可以修改地址
      this.axios({
        method: "get",
        url: "/take",
        params: {
          id: this.$store.state.uid,
          orderId: this.orderInfo[0].orderId,
        },
      })
        .then((res) => {
          this.$router.push("/allorder");
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getAddress();
    this.axios({
        method: "get",
        url: "/getOrder",
        params: {
          id: this.$store.state.uid,
          stutas:0
        },
      })
        .then((res) => {
          this.orderInfo = res.data.data
        })
        .catch((err) => {});
  },
  computed: {
  },
};
</script>

<style scoped lang='less'>
.order-address{
  background-color: rgb(252, 252, 252);
  padding-left: 5px;
  .address-top{
    .name,.phone{
      padding: 0 10px;
    }
    .icon{
      background-color: red;
      border-radius: 10px;
      color: white;
      padding: 2px 5px;
    }
  }
  .address-bottom{
    padding: 10px 10px;
    color: rgb(189, 189, 189);
  }
}


</style>