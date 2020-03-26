<template>
  <div>
    <div class="shopping-container row pa-10 teal darken-3">
      <div class="col-md-4 mb-4" v-for="item in item" :key="item.id">
        <v-card>
          <v-img
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></v-img>
          <div class="card-body">
            <v-card-subtitle class="pa-0">{{ item.category }}</v-card-subtitle>
            <v-card-title class="pa-0">{{ item.title }}</v-card-title>
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
        </v-card>
      </div>
    </div>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <span class="headline" style="font-family: 微軟正黑體 !important;">{{ product.title }}</span>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-img :src="product.imageUrl"></v-img>
          <p>{{product.content}}</p>
          <p>{{product.description}}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <del
              class="h5"
              v-if="product.origin_price != product.price"
            >原價 {{ product.origin_price | currency}} 元</del>
            <div class="h5" v-if="product.price">總計 {{ product.price | currency}} 元</div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
            <img :src="product.imageUrl" class="img-fluid" alt />
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
</template>

<script>
import $ from "jquery";
export default {
  props: {
    item: {
      type: Array
    }
  },
  data() {
    return {
      product: {},
      products: [],
      status: {
        loadingItem: ""
      },
      dialog: false
    };
  },
  methods: {
    addCart: function(id, qty=1) {
      var vm = this;
      console.log(id)
      vm.$emit("addCart", id, qty);
    },
    
    getProduct: function(id) {
      let vm = this;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      //   $("#productModal").modal("show");
      vm.dialog = true;
      const api = `${process.env.VUE_APP_API}/product/${id}`;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.status.loadingItem = "";
          vm.product = response.data.product;
        }
      });
    }
  },
};
</script>