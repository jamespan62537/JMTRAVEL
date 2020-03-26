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
        <v-card-text >
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
          <v-select :items="people_num" label="請選擇人數" v-model="num" dense outlined></v-select>
          <p>小計 {{ product.price * num }} 元</p>
          <button
            type="button"
            class="btn btn-primary"
            @click="addCart(product.id, num)"
          >加入購物車</button>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      dialog: false,
      people_num: ["1", "2", "3", "4", "5"],
      num: null
    };
  },
  methods: {
    addCart: function(id, qty = 1) {
      var vm = this;
      console.log(qty)
      vm.$emit("addCart", id, qty);
      vm.dialog = false;
    },

    getProduct: function(id) {
      let vm = this;
      vm.status.loadingItem = id;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/product/${id}`;
      this.$http.get(api).then(response => {
        vm.dialog = true;
        vm.$store.dispatch("updateLoading", false);
        if (response.data.success) {
          vm.status.loadingItem = "";
          vm.product = response.data.product;
        }
      });
    }
  }
};
</script>