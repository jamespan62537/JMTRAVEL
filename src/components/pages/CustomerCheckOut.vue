<template>
  <div>
    <div class="bg">
      <div class="cart-list-container">
        <!-- <div class="cart-list-title">
          <h2>購物車清單</h2>
        </div>-->
        <br>
        <form class="form-card" @submit.prevent="payOrder">
          <table class="table">
            <thead>
              <th colspan="3" class="text-center">
                <h2>購買資訊</h2>
              </th>
            </thead>
            <tbody>
              <tr class="h-6">
                <th width="250" class="cl align-middle">旅遊地點</th>
                <th width="200" class="cl align-middle text-center">人數</th>
                <th width="210" class="text-center cl align-middle">單價</th>
              </tr>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle text-center">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-center">{{ item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot class="mt-2">
              <tr>
                <td></td>
                <td class="align-middle text-center fs-r">總計</td>
                <td class="text-center fs-r">{{ order.total | currency}}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table mt-5">
            <thead>
              <tr>
                <th colspan="2" class="text-center personal-info">個人資料</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="align-middle fs">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th class="align-middle fs">姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="align-middle fs">收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th class="align-middle fs">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th class="align-middle fs">付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right pay-btn" v-if="order.is_paid === false">
            <button class="btn btn-danger mr-5">確認付款</button>
          </div>
          <div class="text-right pay-btn" v-if="order.is_paid === true">
            <router-link to="/shopping" class="btn btn-danger mr-5">回首頁</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      orderId: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    // 取得已加入購物車商品
    getOrder() {
      var vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/order/${
        vm.orderId
      }`;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        console.log(response);
      });
    },
    // 付款
    payOrder() {
      var vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/pay/${
        vm.orderId
      }`;
      this.$http.post(api).then(response => {
        vm.order = response.data.order;
        console.log(response);
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
@import "../../assets/css/_customerCheckOut.css";
</style>
