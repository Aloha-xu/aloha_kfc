<template>
  <div class="address">
    <div class="nav-bar">
      <van-nav-bar
        title="新增地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="address-content">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
      
  </div>
</template>

<script>
import area from "../assets/js/area";
export default {
  data() {
    return {
      areaList: {
        province_list: area.province_list,
        city_list: area.city_list,
        county_list: area.county_list,
      },
    };
  },

  methods: {
    onSave(e) {
        this.axios({
        method: "post",
        url: "/address",
        data: {
          userId: "1",
          name:e.name,
          phone:e.tel,
          area:e.city + e.county,
          detialArea:e.addressDetail,
          mail:e.postalCode,
          defaultAddress:e.isDefault,
        },
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {});
    },
    onDelete() {
    },
    onChangeDetail(val) {
    //   if (val) {
    //     this.searchResult = [
    //       {
    //         name: '黄龙万科中心',
    //         address: '杭州市西湖区',
    //       },
    //     ];
    //   } else {
    //     this.searchResult = [];
    //   }
    },
  },
  computed:{
  }
};
</script>