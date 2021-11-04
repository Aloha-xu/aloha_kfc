<!--  -->
<template>
  <div class="cart">
    <div class="nav-bar">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        right-text="编辑"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="onClickRight"
      />
    </div>
    <div class="cart-content"></div>
    <van-checkbox-group
      v-model="result"
      ref="checkboxGroup"
      @change="addSelectedGoods"
    >
      <van-cell-group>
        <van-cell
          v-for="(item, index) in cardGoods"
          clickable
          :key="item.carId"
          @click="toggle(index)"
        >
          <template #right-icon>
            <div class="cart-item">
              <div class="left">
                <van-checkbox :name="item.carId" ref="checkboxes" />
              </div>
              <div class="right">
                <img :src="item.product.largeImg" />
                <div class="text">
                  <div class="text-top">
                    {{ item.product.name }}
                  </div>
                  <div class="text-bottom">
                    <div class="text-price">￥{{ item.product.Price }}</div>
                    <van-stepper
                      :name="item.carId"
                      v-model="item.count"
                      theme="round"
                      button-size="22"
                      disable-input
                      @change="addGoodCount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="foot">
      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
        v-show="isShowSubmitBtn"
      >
        <van-checkbox v-model="allChecked" @change="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>
      <van-submit-bar
        button-text="移除"
        v-show="!isShowSubmitBtn"
        @submit="onSubmit"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      allChecked: false,
      cardGoods: null,
      totalPrice: 0,
      //已选的商品 用cardid标识
      selectedGoods: [],
      isShowSubmitBtn: true,
    };
  },
  methods: {
    onClickRight() {
      this.isShowSubmitBtn = !this.isShowSubmitBtn;
      if (this.isShowSubmitBtn) {
        document.getElementsByClassName("van-nav-bar__text")[1].style.color =
          "blue";
      } else {
        document.getElementsByClassName("van-nav-bar__text")[1].style.color =
          "red";
      }
    },
    addSelectedGoods() {
      let data = [];
      this.result.map((item) => {
        this.cardGoods.map((item1) => {
          if (item === item1.carId) {
            data.push(item1);
          }
        });
      });
      this.selectedGoods = data;
      this.computedTotalPrice();
    },
    addGoodCount(e, carId) {
      //使用carid 判断添加哪一个
      console.log(e, carId);
      this.updataGoodsCount(carId, e);
    },
    checkAll() {
      if (!this.allChecked) {
        this.$refs.checkboxGroup.toggleAll();
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
    onSubmit() {
      //判断是结算还是移除
      if (this.isShowSubmitBtn) {
        this.computedTotalPrice();
      } else {
        this.delCardGoods();
      }
    },
    delCardGoods() {
      this.axios({
        method: "POST",
        url: "/deleteCar",
        data: {
          id: this.$store.state.uid,
          carId: this.result,
        },
      })
        .then((res) => {
          this.getInfo();
          this.$toast.success("成功删除");
        })
        .catch((err) => {
          this.$toast.fail("删除失败");
        });
    },
    getInfo() {
      this.axios({
        method: "get",
        url: "/findCar",
        params: {
          id: this.$store.state.uid,
        },
      })
        .then((res) => {
          this.cardGoods = res.data.data;
        })
        .catch((err) => {});
    },
    updataGoodsCount(carId, count) {
      this.axios({
        method: "post",
        url: "/updataCar",
        data: {
          id: this.$store.state.uid,
          carId: carId,
          count: count,
        },
      })
        .then((res) => {
          //在这里修改selectedGoods的count
          const index = this.selectedGoods.findIndex(item => item.carId === carId.name)
          this.selectedGoods[index].count = count
          this.getInfo();
          this.computedTotalPrice();
        })
        .catch((err) => {});
    },
    computedTotalPrice() {
      let totalprice = 0;
      this.selectedGoods.map((item) => {
        totalprice = totalprice + item.count * item.product.Price;
      });
      this.totalPrice = totalprice * 100;
      console.log(totalprice * 100)
    },
  },
  created() {
    this.getInfo();
  },
};
</script>
<style lang='less' scoped>
.cart-item {
  height: 130px;
  background: white;
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  .left {
    flex: 1;
    text-align: center;
    .van-checkbox {
      padding-left: 5px;
    }
  }
  .right {
    flex: 12;
    display: flex;
    align-items: center;
    padding: 5px;
    img {
      width: 120px;
      height: 100px;
    }
    .text {
      font-size: 16px;
      .text-bottom {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .text-price {
          color: #2093c0;
          font-size: 18px;
        }
      }
    }
  }
}
</style>