<template>
  <div>
    <div class="my-5 cart-list-check">
      <div class="cart-list-title">
        <h2>購物車清單</h2>
      </div>
      <br>
      <form class="col-md-6 form-card" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total  | currency}}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right pay-btn" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      orderId: "",
      order: {
          user:{}
      }
    };
  },
  methods: {
    // 取得已加入購物車商品
    getOrder() {
      var vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/order/${vm.orderId}`;
      this.$http.get(api).then((response) => {
          vm.order = response.data.order;
            console.log(response)
        });
    },
    // 付款
    payOrder() {
        var vm = this;
        const api = `https://vue-course-api.hexschool.io/api/jamespantest1/pay/${vm.orderId}`;
        this.$http.post(api).then((response) => {
          vm.order = response.data.order;
            console.log(response)
            vm.getOrder();
        });
    }
  },
  created() {
      this.orderId = this.$route.params.orderId;
    //   console.log(this.order);
      this.getOrder();
  }
};
</script>

<style scoped>
.cart-list-check {
  display: flex;
  flex-direction: column;
  align-items: center;  
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  width: 40%;
  background-color: rgb(243,243,243);
  margin: 0 auto;
}
.cart-list-check .cart-list-title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding: 20px 0;
  background-color: rgb(54, 54, 54);
  color: rgb(255, 255, 255);
  border-radius: 8px 8px 0 0;
  font-weight: 700;
}
.cart-list-check .form-card {
  max-width: 100%;
}
.cart-list-check .form-card .table thead th {
  border-top: unset;
  border-bottom: unset;
}
.form-card .pay-btn {
  padding-bottom: 20px;
}
</style>
