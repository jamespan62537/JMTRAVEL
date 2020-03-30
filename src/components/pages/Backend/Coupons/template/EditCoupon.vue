<template>
  <div>
    <v-btn class="mr-5" color="light-blue darken-1" small dark @click="openDialog(item)">編輯</v-btn>
    <v-dialog v-model="dialog" width="70%" style="z-index: 998;">
      <v-card style="margin: 0 auto;">
        <div class="d-flex justify-start align-center">
          <v-icon class="indigo success elevation-4 pa-5 mr-5 ml-5" large dark>fas fa-file-alt</v-icon>
          <div style="font-size: 25px;">編輯產品</div>
        </div>
        <v-form ref="form" class="pa-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="mb-6"
                v-model="item.title"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="請輸入優惠券名稱"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                class="mb-6"
                v-model="item.percent"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="請輸入折扣數"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="mb-6"
                v-model="item.due_date"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="請輸入期限"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                class="mb-6"
                v-model="item.code"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="請輸入折扣代碼"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p>是否啟用</p>
              <v-switch v-model="item.is_enabled"></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-3" color="green darken-1" dark @click="updateCoupons(item)">確認</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      query_option: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ""
      }
    };
  },
  computed: {},
  methods: {
    getCoupons: function() {
      var vm = this;
      vm.$emit("getCoupons");
    },
    openDialog: function(item) {
      var vm = this;
      vm.$emit("editCoupon");
      vm.dialog = true;
    },
    updateCoupons: function(item) {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      var api = `${process.env.VUE_APP_API}/admin/coupon/${item.id}`;
      this.$http.put(api, { data: item }).then(response => {
        console.log(item);
        vm.$store.dispatch("updateLoading", false);
        vm.items = response.data.coupone;
        vm.getCoupons();
        this.$bus.$emit("alertMessage", "編輯成功", "success");
        vm.dialog = false;
      });
    }
  }
};
</script>