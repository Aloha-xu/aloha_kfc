<!--  -->
<template>
  <div class="home">
    <div class="nav-box">
      <div class="time">下午好</div>
      <div class="search-box">
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
      </div>
    </div>

    <div class="banner">
      <van-swipe
        class="my-swipe"
        :height="150"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <img :src="item.bannerImg" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="hot-buy">
      <div class="hot-text">热卖推荐</div>
    </div>

    <div class="shop-content">
      <div class="pro-item" v-for="item in product" :key="item.pid" @click="goToDetailPapg(item.pid)">
        <div class="icon">
          <img :src="item.largeImg" alt="" />
        </div>
        <div class="pro-text">{{ item.name }}</div>
        <div class="price">￥{{ item.Price }}</div>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      product: [],
      searchValue:''
    };
  },
  // 生命周期函数 用来请求数据
  created() {
    this.getBanner();
    this.getProduct();
  },
  methods: {
    // 请求轮播图数据
    getBanner() {
      this.axios({
        method: "get",
        url: "/bannar",
      })
        .then((res) => {
          console.log(res);
          // 重新赋值
          this.banner = res.data.data.result;
        })
        .catch((err) => {});
    },
    getProduct() {
      this.axios({
        method: "get",
        url: "/product",
      })
        .then((res) => {
          console.log(res);
          this.product = res.data.data;
        })
        .catch((err) => {});
    },
    goToDetailPapg(pid){
      console.log(pid)
      this.$router.push(`/detail/${pid}`)
    }
  },
};
</script>
<style lang="less" scoped>
.home {
  .nav-box {
    height: 50px;
    background: white;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    align-items: center;

    .time {
      font-size: 16px;
      color: #2c3e50;
      font-weight: 580;
      margin-left: 10px;
    }
    /deep/ .van-icon {
      color: #ee102a !important;
    }
  }
  .banner {
    img {
      width: 100%;
      height: 150px;
      border-radius: 0 0 0 0;
    }
  }
  .hot-buy {
    height: 50px;
    background: white;
    margin-top: 8px;
    overflow: hidden;

    .hot-text {
      background: #e32831;
      height: 40px;
      width: 100px;
      border-radius: 0 20px 0 0;
      text-align: center;
      line-height: 40px;
      color: white;
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .shop-content {
    .pro-item {
      height: 200px;
      width: calc(50% - 5px);
      background: white;
      float: left;
      margin-top: 10px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 120px;
      }
      .pro-text {
        height: 25px;
        padding-left: 5px;
        margin-top: 10px;
        font-size: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price {
        margin-top: 10px;
        font-size: 18px;
        padding-left: 5px;
        color: #0c88b9;
      }
    }
    .pro-item:nth-child(2n) {
      margin-right: 0px;
    }
  }
}
</style>