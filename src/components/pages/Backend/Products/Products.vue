<template>
  <div class="products-area">
    <v-container fluid style="padding: unset;">
      <v-layout class="mb-3" justify-end>
        <v-flex class="d-flex justify-end" lg2 sm2 xs12 ma-1>
          <CreateProduct @getProducts="getProducts" />
        </v-flex>
      </v-layout>
      <v-data-table
        class="elevation-1 table"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        item-key="id"
        style="background-color: rgb(255, 255, 255);"
        hide-default-footer
      >
        <template v-slot:item.is_enabled="{ item }">
          <p v-if="item.is_enabled">是</p>
          <p v-else>否</p>
        </template>
        <template v-slot:item.action="{ item }">
          <EditProduct
            class="d-inline-block"
            :item="tempProducts"
            @editProduct="editProduct(item)"
            @getProducts="getProducts()"
          />
          <v-btn small dark color="pink darken-1" @click="removeProduct(item)">刪除</v-btn>
        </template>
      </v-data-table>
      <Pagination :pages="pagination" @callPage="getProducts"></Pagination>
      <div class="text-right">
        <div
          class="modal fade"
          id="productModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        ></div>
      </div>
    </v-container>
  </div>
</template>

<script>
import $ from "jquery";
import CreateProduct from "./template/CreateProduct";
import EditProduct from "./template/EditProduct";
import Pagination from "../../../Pagination.vue";
export default {
  components: {
    Pagination,
    CreateProduct,
    EditProduct
  },
  data: function() {
    return {
      headers: [
        {
          text: "分類",
          value: "category",
          class: "teal--text darken-1"
        },
        {
          text: "名稱",
          value: "title",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "原價",
          value: "origin_price",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "售價",
          value: "price",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "是否啟用",
          value: "is_enabled",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "編輯",
          value: "action",
          class: "teal--text darken-1",
          sortable: false
        }
      ],
      items: [],
      tempProducts: {},
      isNew: false,
      pagination: {},
      uploadFileLoading: false
    };
  },
  methods: {
    getProducts: function(page = 1) {
      let vm = this;
      vm.$store.dispatch("updateLoading", true);
      // /api/:api_path/admin/products?page=:page
      const api = `${process.env.VUE_APP_API}/admin/products?page=${page}`;
      this.$http.get(api).then(response => {
        vm.$store.dispatch("updateLoading", false);
        vm.items = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    editProduct: function(item) {
      var vm = this;
      vm.tempProducts = Object.assign({}, item);
      vm.isNew = false;
    },

    removeProduct: function(item) {
      let vm = this;
      const api = `${process.env.VUE_APP_API}/admin/product/${item.id}`;
      this.$http.delete(api).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          vm.getProducts();
        }
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>