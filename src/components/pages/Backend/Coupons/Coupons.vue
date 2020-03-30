<template>
  <div class="coupon-area">
    <v-container fluid style="padding: unset;"></v-container>
    <v-layout class="mb-3" justify-end>
      <v-flex class="d-flex justify-end" lg2 sm2 xs12 ma-1>
        <CreateCoupon @getCoupons="getCoupons" />
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
        <EditCoupon
          class="d-inline-block"
          :item="tempCoupons"
          @editCoupon="editCoupon(item)"
          @getCoupons="getCoupons()"
        />
        <v-btn small dark color="pink darken-1" @click="removeCoupons(item)">刪除</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../../../Pagination.vue";
import CreateCoupon from "./template/CreateCoupon";
import EditCoupon from "./template/EditCoupon";
export default {
  components: {
    CreateCoupon,
    EditCoupon
  },
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
      pagination: {}
    };
  },
  methods: {
    getCoupons: function() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/admin/coupons`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.items = response.data.coupons;
          console.log(vm.items);
        }
      });
    },
    editCoupon: function(item) {
      var vm = this;
      vm.tempCoupons = Object.assign({}, item);
    },
    removeCoupons: function(item) {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/admin/coupon/${item.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.getCoupons();
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>