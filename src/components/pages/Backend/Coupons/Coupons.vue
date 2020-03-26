<template>
  <div class="coupon-area">
    <v-container fluid style="padding: unset;">
    </v-container>
    <v-layout class="mb-3" justify-end>
      <v-flex class="d-flex justify-end" lg2 sm2 xs12 ma-1>
        <v-btn color="orange darken-1" dark @click="openModal(true)">建立新優惠券</v-btn>
      </v-flex>
    </v-layout>

    <v-data-table
      class="elevation-1 table"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      item-key="id"
      style="background-color: rgb(255, 255, 255);"
      hide-default-footer
    >
      <template v-slot:item.is_enabled="{ item }">
        <p v-if="item.is_enabled">是</p>
        <p v-else>否</p>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mr-5"
          small
          dark
          color="light-blue darken-1"
          @click="openModal(false, item)"
        >編輯</v-btn>
        <v-btn small dark color="pink darken-1" @click="removeCoupons(item)">刪除</v-btn>
      </template>
    </v-data-table>
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增優惠券</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="w-100" style="text-align: -webkit-left;">
                  <div class="form-group">
                    <label for="title">優惠券名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入名稱"
                      v-model="tempCoupons.title"
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">折扣數</label>
                      <input
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入折扣"
                        v-model="tempCoupons.percent"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">到期日</label>
                      <input
                        type="unit"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入期限"
                        v-model="tempCoupons.due_date"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6 w-100">
                      <label for="origin_price">折扣代碼</label>
                      <input
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入折扣代碼"
                        v-model="tempCoupons.code"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                        v-model="tempCoupons.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateCoupons">確認</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../../Pagination.vue";
export default {
  data: function() {
    return {
      headers: [
        {
          text: "折價券名稱",
          value: "title",
          class: "teal--text darken-1"
        },
        {
          text: "折扣數",
          value: "percent",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "到期日",
          value: "due_date",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "是否啟用",
          value: "is_enabled",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "編輯",
          value: "action",
          class: "teal--text darken-1",
          sortable: false
        }
      ],
      items: [],
      coupons: [],
      tempCoupons: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ""
      },
      due_date: new Date(),
      isNew: false,
      pagination: {},
      uploadFileLoading: false,
    };
  },
  methods: {
    getCoupons: function() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api =
        `${process.env.VUE_APP_API}/admin/coupons`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.items = response.data.coupons;
        }
      });
    },
    updateCoupons: function() {
      // /api/:api_path/admin/coupon/:id
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      // 如果 isNew 為 true 則會執行此 api
      var httpChange = "post";
      var api =
        `${process.env.VUE_APP_API}/admin/coupon`;

      // 如果 isNew 為 false 則執行此api (編輯用)
      if (!vm.isNew) {
        httpChange = "put";
        var api = `${process.env.VUE_APP_API}/admin/coupon/${vm.tempCoupons.id}`;
      }

      this.$http[httpChange](api, { data: vm.tempCoupons }).then(response => {
        vm.$store.dispatch("updateLoading", false);
        // console.log(response.data);
        vm.items = response.data.coupone;
        $("#productModal").modal("hide");
        vm.getCoupons();
      });
    },
    removeCoupons: function(item) {
      // api/:api_path/admin/coupon/:coupon_id
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/admin/coupon/${item.id}`;
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.getCoupons();
        }
      });
    },
    openModal: function(isNew, item) {
      var vm = this;
      $("#productModal").modal("show");
      if (isNew) {
        vm.tempCoupons = {};
        vm.isNew = true;
      } else {
        vm.tempCoupons = Object.assign({}, item);
        vm.isNew = false;
      }
    }
  },
  created() {
    this.getCoupons();
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    }
  }
};
</script>