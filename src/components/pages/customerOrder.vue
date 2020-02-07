<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <!-- `url(${item.imageUrl})` 這是 es6 提供的用法，利用反引號插入變數 -->
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">分類</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">原價 {{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
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
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
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
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
                <p class="mb-0"> {{product.content}} </p>
                <footer class="blockquote-footer text-right"> {{product.description}} </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">原價 {{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                    選購 {{ num }} {{ product.unit }}
                </option>
            </select>
          </div>
          <div class="modal-footer" style="align-items:baseline;">
            <p>小計 {{ product.price * product.num }} 元</p>
            <button type="button" class="btn btn-primary" @click="addCart(product.id, product.num)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <table class="table mt-4">
                <thead>
                    <th width="120"></th>
                    <th width="120">品名</th>
                    <th>數量</th>
                    <th width="120">價格</th>
                </thead>
                <tbody>
                    <tr v-for="item in cartList" :key="item.id">
                        <td>
                          <button style="
                          border-color: red;
                          background-color: unset;
                          color: red;
                          border-width: 1px;
                          box-sizing: border-box;" @click="removeCartItem(item)"><i class="far fa-trash-alt"
                          ></i></button>
                        </td>
                        <td> {{item.product.title}} </td>
                        <td> {{item.qty}} </td>
                        <td v-if="!item.price"> {{item.total | currency}} </td>
                        <td v-if="item.price"> {{item.total}} </td>
                        <td v-if="item.price"> {{item.total}} </td>
                    </tr>
                </tbody>
            </table>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data: function() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      cartList: [],
    };
  },
  methods: {
    getProducts: function() {
      let vm = this;
      // /api/:api_path/admin/products?page=:page
      const api =
        "https://vue-course-api.hexschool.io/api/jamespantest1/products";
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct: function(id) {
      let vm = this;
      vm.status.loadingItem = id;
      $('#productModal').modal('show')
      // /api/:api_path/admin/products?page=:page
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/product/${id}`;
      this.$http.get(api).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          vm.status.loadingItem = '';
          vm.product = response.data.product;
          
        }
      });
    },
    addCart: function(id, qty = 1) {
      let vm = this;
      const api = 'https://vue-course-api.hexschool.io/api/jamespantest1/cart';
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, {data: cart }).then(response => {
        // console.log(response.data);
        vm.getCart();
        $('#productModal').modal('hide');
      });
    },
    getCart: function() {
       let vm = this;
        const api = 'https://vue-course-api.hexschool.io/api/jamespantest1/cart';
        this.$http.get(api).then(response => {
          console.log(response.data.data.carts);
          if(response.data.success) {
            vm.cartList = response.data.data.carts;
          }
        });
    },
    removeCartItem: function(item) {
        let vm = this;
        const api = `https://vue-course-api.hexschool.io/api/jamespantest1/cart/${item.id}`;
        this.$http.delete(api).then(response => {
          console.log(response.data);
          vm.getCart();
        });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>