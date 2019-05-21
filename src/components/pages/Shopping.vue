<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="shopping-page-container">
      <div class="nav-location-list nav-scroller py-1">
        <nav class="nav d-flex justify-content-space-around">
          <a
            class="p-2 text-muted hvr-underline-from-center"
            href="#"
            @click.prevent="visibility ='all'"
          >全部</a>
          <a
            class="p-2 text-muted hvr-underline-from-center"
            href="#"
            @click.prevent="visibility ='north'"
          >漫遊北歐</a>
          <a
            class="p-2 text-muted hvr-underline-from-center"
            href="#"
            @click.prevent="visibility ='south'"
          >鄉村南歐</a>
        </nav>
      </div>
      <div class="shopping-container row">
        <div class="col-md-4 mb-4" v-for="item in filterAry" :key="item.id">
          <div class="card border-0 shadow-sm">
            <!-- `url(${item.imageUrl})` 這是 es6 提供的用法，利用反引號插入變數 -->
            <div
              style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
            ></div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark card-title">{{ item.title }}</a>
              </h5>
              <p class="card-text">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <del
                  class="h5"
                  v-if="item.origin_price != item.price"
                >原價 {{ item.origin_price | currency}} 元</del>
                <div
                  class="h5"
                  v-if="item.is_enabled"
                  :class="{'ml-auto' :'item.origin_price != item.price','text-danger' :item.origin_price != item.price}"
                >售價 {{ item.price | currency}} 元</div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="getProduct(item.id)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ml-auto"
                @click="addCart(item.id)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-btn-container">
        <router-link to="/cart" class="btn cart-btn">
          <i class="fas fa-shopping-cart fa-2x"></i>
        </router-link>
      </div>
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="product.imageUrl" class="img-fluid" alt>
              <blockquote class="blockquote mt-3">
                <p class="mb-0">{{product.content}}</p>
                <footer class="blockquote-footer text-justify">{{product.description}}</footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <del
                  class="h5"
                  v-if="product.origin_price != product.price"
                >原價 {{ product.origin_price | currency}} 元</del>
                <div class="h5" v-if="product.price">總計 {{ product.price | currency}} 元</div>
              </div>
              <select name class="form-control mt-3" v-model="product.num">
                <option value disabled>請選擇人數</option>
                <option :value="num" v-for="num in 10" :key="num">{{ num }} {{ product.unit }} 人</option>
              </select>
            </div>
            <div class="modal-footer" style="align-items:baseline;">
              <p>小計 {{ product.price * product.num }} 元</p>
              <button
                type="button"
                class="btn btn-primary"
                @click="addCart(product.id, product.num)"
              >加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data: function() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      cartList: [],
      visibility: "all",
      isLoading: false
    };
  },
  methods: {
    getProducts: function() {
      let vm = this;
      vm.isLoading = true;
      // /api/:api_path/admin/products?page=:page
      const api =
        "https://vue-course-api.hexschool.io/api/jamespantest1/products";
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct: function(id) {
      let vm = this;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      $("#productModal").modal("show");
      // /api/:api_path/admin/products?page=:page
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/product/${id}`;
      this.$http.get(api).then(response => {
        // console.log(response.data)
        vm.isLoading = false;
        if (response.data.success) {
          vm.status.loadingItem = "";
          vm.product = response.data.product;
        }
      });
    },
    addCart: function(id, qty = 1) {
      let vm = this;
      vm.isLoading = true;
      const api = "https://vue-course-api.hexschool.io/api/jamespantest1/cart";
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        // console.log(response.data);
        vm.isLoading = false;
        this.$bus.$emit("alertMessage", "已加入購物車", "success");
        $("#productModal").modal("hide");
      });
    },
    scrollDown: function() {
      var vm = this;
      $("html,body").animate(
        { scrollTop: $(".nav-location-list").offset().top },
        1000
      );
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    filterAry: function() {
      var vm = this;
      if (vm.visibility == "all") {
        return vm.products;
      } else if (vm.visibility == "north") {
        var northAry = [];
        vm.products.forEach(function(item) {
          if (item.category == "北歐") {
            northAry.push(item);
            // console.log(northAry);
          }
        });
        return northAry;
      } else if (vm.visibility == "south") {
        var southAry = [];
        vm.products.forEach(function(item) {
          if (item.category == "南歐") {
            southAry.push(item);
            console.log(southAry);
          }
        });
        return southAry;
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/_shopping.css";
</style>
