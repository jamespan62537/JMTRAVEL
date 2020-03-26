<template>
  <div>
    <div>
      <div class="cart-list-container mt-10" style="background: rgb(255, 255, 255);">
        <form class="form-card">
          <table class="table">
            <thead>
              <th colspan="3" class="text-center">
                <h2>購買資訊</h2>
              </th>
            </thead>
            <tbody>
              <tr class="h-6">
                <th width="250" class="align-middle teal--text darken-1">旅遊地點</th>
                <th width="200" class="align-middle teal--text darken-1 text-center">人數</th>
                <th width="210" class="align-middle teal--text darken-1 text-center">單價</th>
              </tr>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle text-center">{{ item.qty }}</td>
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
                <th class="align-middle teal--text">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th class="align-middle teal--text">姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="align-middle teal--text">收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th class="align-middle teal--text">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th class="align-middle teal--text">付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right pay-btn" v-if="order.is_paid === false">
            <button class="btn btn-danger mr-5" @click="payOrder">確認付款</button>
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
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/order/${
        vm.orderId
      }`;
      this.$http.get(api).then(response => {
        vm.$store.dispatch("updateLoading", false);
        vm.order = response.data.order;
      });
    },
    // 付款
    payOrder() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/pay/${
        vm.orderId
      }`;
      this.$http.post(api).then(response => {
        vm.$store.dispatch("updateLoading", false);
        vm.order = response.data.order;
        vm.getOrder();
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>

<style scoped>
@import "../../../../assets/css/_customerCheckOut.css";
</style>
