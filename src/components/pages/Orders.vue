<template>
  <div>
    <table class="table mt-4">
      <thead>
        <th width="120">購買時間</th>
        <th>Email</th>
        <th width="180">購買品項</th>
        <th width="120">應付金額</th>
        <th width="120">是否付款</th>
      </thead>
      <tbody class="card-tbody">
        <tr v-for="item in allOrders" :key="item.id">
          <td>{{item.create_at | date }}</td>
          <td>{{item.user.email}}</td>
          <td>
            <li v-for="product in item.products" :key="product.id">{{ product.product.title }}</li>
          </td>
          <td>{{item.total | currency}}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @callPage="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from "../Pagination.vue";
export default {
  data: function() {
    return {
      allOrders: {
        products: {},
        user: {}
      },
      pagination: {},
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders: function(page = 1) {
      var vm = this;
      // /api/:api_path/admin/orders?page=:page
      const api =
        `https://vue-course-api.hexschool.io/api/jamespantest1/admin/orders?page=${page}`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log(response);
          vm.allOrders = response.data.orders;
          vm.pagination = response.data.pagination;
        }
      });
    }
  },

  created() {
    this.getOrders();
  }
};
</script>

