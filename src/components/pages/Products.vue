<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="text-right">
      <button class="btn btn-outline-primary btn-sm" @click="openModal(true)">建立新產品</button>
      <table class="table mt-4">
        <thead>
          <th width="150">分類</th>
          <th>名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">是否啟用</th>
          <th width="150">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency}}</td>
            <td class="text-right">{{item.price | currency}}</td>
            <td>
              <span v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="flex-seprate">
              <button class="btn btn-outline-primary btn-sm mr-1" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-primary btn-sm" @click="removeProduct(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @callPage="getProducts"></Pagination>
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
      <!-- Modal Start -->
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4" style="text-align: -webkit-left;">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      placeholder="請輸入圖片連結"
                      v-model="tempProducts.imageUrl"
                    >
                  </div>
                  <div class="form-group">
                    <label for="customFile">
                      或 上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="uploadFileLoading"></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadFile"
                    >
                  </div>
                  <img :src="tempProducts.imageUrl" class="img-fluid" alt>
                </div>
                <div class="col-sm-8" style="text-align: -webkit-left;">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題"
                      v-model="tempProducts.title"
                    >
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入分類"
                        v-model.trim="tempProducts.category"
                      >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        type="unit"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位"
                        v-model="tempProducts.unit"
                      >
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入原價"
                        v-model="tempProducts.origin_price"
                      >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價"
                        v-model="tempProducts.price"
                      >
                    </div>
                  </div>
                  <hr>
                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="請輸入產品描述"
                      v-model="tempProducts.description"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      placeholder="請輸入產品說明內容"
                      v-model="tempProducts.content"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                        v-model="tempProducts.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      >
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination.vue";
export default {
  data: function() {
    return {
      products: [],
      tempProducts: {},
      isNew: false,
      pagination: {},
      uploadFileLoading: false,
      isLoading: false
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProducts: function(page = 1) {
      let vm = this;
      vm.isLoading = true;
      // /api/:api_path/admin/products?page=:page
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/admin/products?page=${page}`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    // 如果觸發 openModal 的 isNew === true，將傳送一個空的 tempProducts 物件 (意即打開的 Modal 所有欄位為空值)
    // 觸發後回傳 isNew = true，用於下一步新建產品用
    openModal: function(isNew, item) {
      var vm = this;
      $("#productModal").modal("show");
      if (isNew) {
        vm.tempProducts = {};
        vm.isNew = true;
      } else {
        vm.tempProducts = Object.assign({}, item);
        vm.isNew = false;
      }
      // console.log(isNew);
    },
    updateProduct: function() {
      let vm = this;
      var httpChange = "post";
      var api =
        "https://vue-course-api.hexschool.io/api/jamespantest1/admin/product";
      // 假設傳進值為false，作為編輯用
      if (!vm.isNew) {
        httpChange = "put";
        api = `https://vue-course-api.hexschool.io/api/jamespantest1/admin/product/${
          vm.tempProducts.id
        }`;
      }
      this.$http[httpChange](api, { data: vm.tempProducts }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        }
      });
      // console.log(vm.tempProducts);
    },
    removeProduct: function(item) {
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/admin/product/${
        item.id
      }`;
      this.$http.delete(api).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          vm.getProducts();
        }
      });
    },
    uploadFile: function() {
      let vm = this;
      vm.uploadFileLoading = true;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/admin/upload`;
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      var formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      this.$http
        .post(api, formData, {
          header: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.data.success) {
            // vm.tempProducts.imageUrl = response.data.imageUrl;
            console.log(response.data);
            // 將 imageUrl 這欄位強制帶入 tempProducts，來源是 response.data.imageUrl
            vm.$set(vm.tempProducts, "imageUrl", response.data.imageUrl);
            vm.uploadFileLoading = false;
          } else {
            this.$bus.$emit("alertMessage", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

