<template>
  <div class="test">
    <div class="order-card" v-for="item in orderInfo">
      <slot name="no">
        <div class="no">
          <span>NO {{ item.orderNo }}</span>
        </div>
      </slot>
      <div class="order-item" v-for="item1 in item.product">
        <van-card
          :price="item1.product.Price"
          :title="item1.product.name"
          :thumb="item1.product.largeImg"
          :num="item1.count"
        />
      </div>
      <div class="order-other">
        <div class="order-time">
          <span v-show="item.stutas">{{ item.created_at }}</span>
          <span v-show="!item.stutas">{{ time }}</span>
        </div>
        <div class="totleNumber">共计：{{ item.product.length }}件</div>
        <div class="totlePrice">合计：${{ item.allPrice / 100 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const util = require("../assets/js/util.js");
let times = null;
export default {
  name: "OrderCard",
  props: {
    orderInfo: Array,
  },
  data() {
    return {
      time: util.formatTime(new Date()),
    };
  },
  created() {
    times = setInterval(() => {
      this.time = util.formatTime(new Date());
    }, 1000);
  },
  destroyed() {
    clearInterval(times);
    times = null;
  },
};
</script>

<style scoped lang="less">
.order-card {
  font-size: 15px;
  margin-bottom: 20px;
  .no {
    background-color: white;
    padding: 10px;
  }
  .order-other {
    border-top: 1px dotted black;
    padding: 10px 0 8px 10px;
    background-color: white;

    .order-time {
      padding-bottom: 5px;
    }
    .totleNumber {
      display: inline-block;
    }
    .totlePrice {
      display: inline-block;
      float: right;
      padding-right: 5px;
      color: red;
    }
  }
}
</style>