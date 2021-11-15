<template>
  <div class="search">
    <!-- 头部搜索 -->
    <div class="header">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 有数据之后才显示 -->
    <div class="product-box" v-for="item in searchData" :key="item.pid" @click="handleToDetailPapg(item.pid)">
      <img :src="item.largeImg" alt="" />
      <div class="product-right">
        <div class="title">{{ item.name }}</div>
        <div class="price">￥{{ item.Price }}元</div>
      </div>
    </div>
    <!-- 没有数据之后才显示 -->
    <div class="noData" v-if="searchData.length == 0">
      <img src="https://img.yzcdn.cn/vant/empty-image-default.png" alt="" />
      <p>暂无数据请搜索</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Search",
  data() {
    return {
      value: "汉堡",
      searchData: [],
    };
  },
  methods: {
    onSearch() {
      this.axios({
        method: "get",
        url: "/search",
        params: {
          key: this.value,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status == 1901) {
            Toast("查询为空");
            return;
          }
          if (res.data.stutas == 1902) {
            Toast("查询成功");
            this.searchData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleToDetailPapg(pid){
      this.$router.push(`/detail/${pid}`)
    }
  },
};
</script>
<style lang='less' scoped>
.noData {
  text-align: center;
  margin-top: 20px;
  img {
    width: 200px;
    height: 200px;
  }
}
.product-box {
  padding: 10px;
  display: flex;
  img {
    width: 100px;
    height: 100px;
  }
  .product-right {
    background: white;
    flex: 1;
    padding: 10px;
    .title {
      height: 40px;
      overflow: hidden;
      word-break: break-word;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 16px;
    }
    .price {
      color: red;
      font-weight: 600;
      padding-top: 10px;
    }
  }
}
</style>