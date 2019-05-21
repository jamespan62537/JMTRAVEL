<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="bg">
      <div class="cart-list-empty" v-if="cartList.carts.length == 0">
        <h2>目前尚無行程</h2>
        <button class="btn" @click="changePage">BACK TO TRAVEL</button>
      </div>
      <div class="cart-list-container">
        <!-- 如果 isempty 為 false 代表購物車有品項 -->
        <table class="table" v-if="cartList.carts.length !== 0">
          <thead>
            <th width="200">
              <h2>購物車清單</h2>
            </th>
            <th width="250">國家</th>
            <th>人數</th>
            <th width="120">小計</th>
          </thead>
          <tbody>
            <tr v-for="item in cartList.carts" :key="item.id">
              <td>
                <button class="removeBtn" @click.prevent="removeCartItem(item)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>
                {{item.product.title}}
                <p class="text-primary" v-if="item.coupon">已套用優惠券</p>
              </td>
              <td>{{item.qty}}</td>
              <td class="text-right" v-if="!item.price">{{item.total | currency}}</td>
              <td v-if="item.price">{{item.total}}</td>
              <td v-if="item.price">{{item.total}}</td>
            </tr>
          </tbody>
        </table>
        <div class="input-group flex coupons-group" v-if="cartList.carts.length !== 0">
          <input type="text" name id placeholder="請輸入優惠碼" v-model="code">
          <button @click="useCoupons">套用優惠碼</button>
        </div>
        <div class="check-cart flex" v-if="cartList.carts.length !== 0">
          <div class="h5 text-right total-price">總計: {{ cartList.total | currency }}</div>
          <div class="h5 text-right total-price dis-price" v-if="cartList.final_total !== cartList.total">優惠價: {{ cartList.final_total | currency }}</div>
          <router-link to="/order_form" class="h5 text-center next-step">建立訂單</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cartList: [],
      isLoading: false,
      isempty: false,
      code: '',
    };
  },
  methods: {
    // 取得購物車內容
    // 並將內容存至 cartList
    getCart: function() {
      let vm = this;
      vm.isLoading = true;
      const api = "https://vue-course-api.hexschool.io/api/jamespantest1/cart";
      this.$http.get(api).then(response => {
        console.log(response.data.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.cartList = response.data.data;
          console.log(vm.cartList);
        }
      });
    },
    // 移除購物車內容
    // 移除後再次取得購物車資訊
    removeCartItem: function(item) {
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/cart/${
        item.id
      }`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getCart();
      });
    },
    changePage: function() {
      this.$router.push("/shopping");
    },
    useCoupons: function() {
      let vm = this;
      vm.isLoading = true;
      const coupon_code = {
        code: vm.code
      }
      const api = "https://vue-course-api.hexschool.io/api/jamespantest1/coupon";
      // 須注意 api 回傳結構
      this.$http.post(api, {data: coupon_code}).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.getCart();
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style scoped>
@import '../../assets/css/_cartList.css';
</style>
