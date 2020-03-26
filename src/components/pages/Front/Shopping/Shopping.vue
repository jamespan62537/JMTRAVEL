<template>
  <div>
    <div class="shopping-page-container">
      <Category></Category>
      <ProductsCard :item="filterAry" @addCart="addCart"></ProductsCard>
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
      isLoading: false,
      products: []
    };
  },
  components: {
    Category,
    ProductsCard
  },
  computed: {
    filterAry: function() {
      var vm = this;
      if (vm.$store.state.visibility == "all") {
        return vm.products;
      } else if (vm.$store.state.visibility == "north") {
        var northAry = [];
        vm.products.forEach(function(item) {
          if (item.category == "北歐") {
            northAry.push(item);
          }
        });
        return northAry;
      } else if (vm.$store.state.visibility == "south") {
        var southAry = [];
        vm.products.forEach(function(item) {
          if (item.category == "南歐") {
            southAry.push(item);
          }
        });
        return southAry;
      }
    }
  },
  methods: {
    getProducts: function() {
      let vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/products`;
      this.$http.get(api).then(response => {
        vm.$store.dispatch("updateLoading", false);
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
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
    addCart: function(id, qty) {
      let vm = this;
      vm.isLoading = true;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response.data);
        vm.$store.dispatch("updateLoading", false);
        if (response.data.success) {
          this.$bus.$emit("alertMessage", "已加入購物車", "success");
          vm.getCart();
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style scoped>
@import "../../../../assets/css/_shopping.css";
</style>