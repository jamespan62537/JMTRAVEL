<template>
  <div>
    <v-btn class="ma-2 white--text" color="amber darken-2" @click="openDialog()">建立新產品</v-btn>
    <v-dialog v-model="dialog" width="70%" style="z-index: 998;">
      <v-card style="margin: 0 auto;">
        <div class="d-flex justify-start align-center">
          <v-icon class="indigo success elevation-4 pa-5 mr-5 ml-5" large dark>fas fa-file-alt</v-icon>
          <div style="font-size: 25px;">新增產品</div>
        </div>
        <v-form ref="form" class="pa-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="mb-6"
                v-model="query_option.title"
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
                v-model="query_option.percent"
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
                v-model="query_option.due_date"
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
                v-model="query_option.code"
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
              <v-switch v-model="query_option.is_enabled"></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-3" color="green darken-1" dark @click="createCoupon()">確認</v-btn>
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
    openDialog: function() {
      var vm = this;
      vm.dialog = true;
    },
    createCoupon: function() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      var api = `${process.env.VUE_APP_API}/admin/coupon`;
      this.$http.post(api, { data: vm.query_option }).then(response => {
          console.log(response)
        vm.$store.dispatch("updateLoading", false);
        vm.dialog = false;
        vm.getCoupons();
      });
    }
  }
};
</script>