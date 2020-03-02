<template>
  <div class="orders-area">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <v-data-table
      class="elevation-1 table"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      item-key="id"
      style="background-color: rgb(255, 255, 255);"
      hide-default-footer
    >
      <template v-slot:item.products="{ item }">
        <li v-for="product in item.products" :key="product.id">{{product.product.title}}</li>
      </template>
      <template v-slot:item.is_paid="{ item }">
        <p v-if="item.is_paid">已付款</p>
        <p v-else>未付款</p>
      </template>
    </v-data-table>
    <Pagination :pages="pagination" @callPage="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination.vue";
export default {
  data: function() {
    return {
      headers: [
        {
          text: "購買時間",
          value: "create_at",
          class: "teal--text darken-1"
        },
        {
          text: "Email",
          value: "user.email",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "購買品項",
          value: "products",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "應付金額",
          value: "total",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "是否付款",
          value: "is_paid",
          class: "teal--text darken-1",
          sortable: false
        }
      ],
      items: [],
      products: [],
      isLoading: false,
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders: function(page = 1) {
      var vm = this;
      vm.isLoading = true;
      // /api/:api_path/admin/orders?page=:page
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/admin/orders?page=${page}`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.items = response.data.orders;
          console.log(vm.items);
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>