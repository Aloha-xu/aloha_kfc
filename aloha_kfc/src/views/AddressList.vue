<template>
  <div class="address-list">
      <div class="nav-bar">
      <van-nav-bar
        title="地址信息"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <van-address-list
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      selectAddress: null,
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
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
            list.addId = item.addId;
            this.list.push(list);
            if (item.defaultAddress) {
              this.selectAddress = list;
            }
          });
        })
        .catch((err) => {});
    },
    onAdd(){
        this.$router.push('/address')
    },
    onEdit(e){
        this.axios({
        method: "post",
        url: "/deleteAddress",
        data: {
          userId: this.$store.state.uid,
          addId:e.addId
        },
      })
        .then(() => {
            this.$toast('成功删除')
          this.list = []
          this.getAddress()
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>