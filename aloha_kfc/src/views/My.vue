<template>
  <div class="my">
    <!-- 封面 -->
    <div class="image">
      <van-image
        width="375"
        height="220"
        fit="cover"
        src="http://114.132.239.118:3003/getpic/1636102966656.jpg"
      />
    </div>
    <!-- 盒子页面 -->
    <div class="my-box">
      <!-- 头像 -->
      <div class="cover">
        <van-image
          round
          width="70px"
          height="70px"
          src="http://114.132.239.118:3003/getpic/1636103101440.jpg"
        />
        <!-- 名字和个性签名 -->
        <div class="text">
          <div class="name">Chale</div>
          <div class="state">这家伙很懒，什么都没留下！</div>
        </div>
      </div>
      <div class="cell">
        <van-cell title="个人资料" is-link to="" />
        <van-cell title="我的订单" is-link to="/allorder" />
        <van-cell title="我的购物车" is-link to="/cart" />
        <van-cell title="地址管理" is-link to="/addresslist" />
        <van-cell title="我的足迹" is-link to="" />
        <van-cell title="安全中心" is-link to="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.my {
  position: relative;
  .my-box {
    position: absolute;
    top: 63%;
    margin-left: 25px;
    .cover {
      border-radius: 10px 10px 0 0;
      background: rgba(216, 211, 211, 0.5);
      display: flex;
      justify-content: space-between;
      .cell {
      }
      .van-image {
        margin-left: 20px;
        padding: 5px;
      }
      .text {
        margin-right: 20px;
        margin-top: 20px;
        .name {
          font-weight: 700;
          font-size: 20px;
        }
        .state {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
