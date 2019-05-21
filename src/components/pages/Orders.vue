<template>
  <div>
    <h2>購物車清單</h2>
    <table class="table mt-4">
      <thead>
        <th width="120">購買時間</th>
        <th>Email</th>
        <th width="180">購買品項</th>
        <th width="120">應付金額</th>
        <th width="120">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in allOrders" :key="item.id">
          <td> {{item.create_at | date }} </td>
          <td> {{item.user.email}} </td>
          <td>
              <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }}
              </li>
          </td>
          <td> {{item.total | currency}} </td>
          <td>
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
        allOrders: {
            products: {},
            user: {},
        },
    };
  },
  methods: {
    getOrders: function() {
      var vm = this;
      // /api/:api_path/admin/orders?page=:page
      const api = 'https://vue-course-api.hexschool.io/api/jamespantest1/admin/orders';
      this.$http.get(api).then(response => {
          if(response.data.success) {
            console.log(response);
            vm.allOrders = response.data.orders;
          }
      });
    }
  },
 
  created() {
      this.getOrders();
  }
};
</script>

