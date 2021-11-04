<!--  -->
<template>
  <div class="detail">
    <div class="navbar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="icon">
      <div class="iconleft">
        <van-icon name="arrow-down" size="20px" />
      </div>
      <div class="iconright">
        <van-icon name="more-o" size="20px" />
      </div>
    </div>
    <!-- 内容小盒子 -->
    <div class="content" v-for="item in proDetail" :key="item.pid">
      <div class="image">
        <img :src="item.largeImg" alt="" />
      </div>
      <div class="content-name">{{ item.name }}</div>
      <div class="content-price">￥{{ item.Price }}</div>
    </div>
    <!-- 选择数量 -->
    <div class="choose_count">
      <div class="text"><h2>选择数量</h2></div>
      <div>
        <van-stepper
          v-model="count"
          theme="round"
          button-size="22"
          disable-input
        />
      </div>
    </div>
    <!-- 详情 评价 -->
    <!-- 评价 -->
    <div class="detail-comment">
      <div class="tab">
        <div
          v-for="(item, index) in tab"
          :key="index"
          @click="itemClick(index)"
          class="item"
          :class="currentIndex === index ? 'active' : ''"
        >
          {{ item }}
        </div>
      </div>
      <div class="goods-detail" v-show="currentIndex === 0">
        <span>掌柜描述：{{ proDetail[0].name }}</span>
        <span>价格说明</span>
      </div>
      <div class="goods-comment" v-show="currentIndex === 1">
        <div>test</div>
      </div>
    </div>
    <!--  -->
    <div class="attention">
      <div class="attention-title">注意事项</div>
      <div class="attention-content" v-for="item in proDetail[0].notice">
        {{ item }}
      </div>
    </div>
    <!-- 添加购物车 -->
    <div class="foot">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="$router.push('/cart')"
        />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addToCart()"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proDetail: null,
      tab: ["详情", "评论"],
      currentIndex: 0,
      count:1
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.axios({
        method: "get",
        url: "/detail",
        params: {
          pid: this.$route.params.pid,
        },
      })
        .then((res) => {
          console.log(res);
          this.proDetail = res.data.data;
        })
        .catch((err) => {});
    },
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = index;
          break;
        case 1:
          this.currentIndex = index;
          break;
      }
    },
    addToCart(){
      //添加商品到购物车
      //id 用户id  count 商品的数量 porduct 商品的信息
      this.axios({
        method: "POST",
        url: "/addCar",
        data:{
          id: this.$store.state.uid,
          count : this.count,
          product : this.proDetail[0]
        },
      })
        .then((res) => {
          this.$toast.success('已加入购物车');
        })
        .catch((err) => {
          this.$toast.fail('加入购物车失败');
        });
    }
  },
};
</script>
<style lang="less" scoped>
.body {
  background-color: rgb(102, 99, 99);
}
.detail {
  overflow: scroll;
  height: calc(100vh - 50px);
  .icon {
    position: relative;
    .iconleft {
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: gray;
      line-height: 43px;
    }
    .iconright {
      position: absolute;
      right: 0;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: gray;
      line-height: 43px;
    }
  }
  .content {
    .image {
      img {
        width: 100%;
      }
    }
    .content-name {
      margin-top: 3px;
      margin-left: 3px;
      font-size: 25px;
      text-align: left;
    }
    .content-price {
      margin-left: 3px;
      font-size: 25px;
      text-align: left;
      font-weight: 700;
      color: red;
    }
  }
  .choose-count {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    .text {
      line-height: 0;
      margin-left: 3px;
    }
  }
  .detail-comment {
    margin-top: 5px;
    background: white;
    .tab {
      display: flex;
      .item {
        font-size: 16px;
        color: gray;
        padding-bottom: 5px;
        margin-right: 20px;
      }
      .active {
        color: black;
        font-size: 17px;
        font-weight: 900;
        border-bottom: 2.5px solid red;
      }
    }
  }
  .attention {
    background: white;
    margin-top: 5px;
    .attention-title {
      font-size: 16px;
      padding: 10px;
      text-align: left;
    }
    .attention-content {
      font-size: 14px;
      color: #9b9999;
      padding: 0 10px 10px;
      text-align: left;
    }
  }
}
</style>
