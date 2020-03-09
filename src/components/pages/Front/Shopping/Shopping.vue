<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="shopping-page-container">
      <Category @visibleCat="visibleCat"></Category>
        <ProductsCard></ProductsCard>
      <div class="cart-btn-container">
        <router-link to="/cart" class="btn cart-btn">
          <i class="fas fa-shopping-cart fa-2x">
            <p class="cart-num">{{cartList.carts.length}}</p>
          </i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Category from "./template/Category";
import ProductsCard from "./template/ProductsCard";
export default {
  data: function() {
    return {
      status: {
        loadingItem: ""
      },
      cartList: [],
      isLoading: false
    };
  },
  components: {
    Category,
    ProductsCard
  },
  methods: {
    visibleCat: function(category) {
      var vm = this;
      vm.visibility = category;
    },
    getCart: function() {
      let vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_API}/cart`;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.cartList = response.data.data;
        }
      });
    },
  },
  created() {
    this.getCart();
  }
};
</script>

<style scoped>
@import "../../../../assets/css/_shopping.css";
</style>