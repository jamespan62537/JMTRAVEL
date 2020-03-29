<template>
  <div>
    <v-btn class="ma-2 white--text" color="light-blue darken-1" small @click="openDialog()">編輯</v-btn>
    <v-dialog v-model="dialog" width="70%" style="z-index: 998;">
      <v-card style="margin: 0 auto;">
        <div class="d-flex justify-start align-center">
          <v-icon class="indigo success elevation-4 pa-5 mr-5 ml-5" large dark>fas fa-file-alt</v-icon>
          <div style="font-size: 25px;">編輯產品</div>
        </div>
        <v-form ref="form" class="pa-4">
          <v-row>
            <v-col cols="4">
              <v-text-field
                class="mb-6"
                v-model="item.imageUrl"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="輸入圖片網址"
                hide-details
              ></v-text-field>
              <v-file-input
                @click="uploadFile"
                prepend-inner-icon="mdi-camera"
                prepend-icon
                outlined
                dense
                label="或上傳圖片"
                color="purple"
                hide-details
              ></v-file-input>
              <img class="img-fluid mt-5" :src="item.imageUrl" alt />
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-text-field
                    v-model="item.title"
                    label="請輸入標題"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.category"
                    label="請輸入分類"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.unit"
                    label="請輸入單位"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.origin_price"
                    label="請輸入原價"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.price"
                    label="請輸入售價"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <hr />
                <v-col cols="12">
                  <v-textarea v-model="item.description" label="請輸入產品描述" outlined shaped></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="item.content"
                    label="請輸入產品說明內容"
                    outlined
                    auto-grow
                    rows="3"
                    shaped
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-3" color="green darken-1" dark @click="uploadProduct(item)">確認</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      uploadFileLoading: false
    };
  },
  computed: {},
  methods: {
    getProducts: function() {
      var vm = this;
      vm.$emit("getProducts");
    },
    openDialog: function() {
      var vm = this;
      vm.dialog = true;
      vm.$emit("editProduct");
    },
    uploadFile: function() {
      let vm = this;
      vm.uploadFileLoading = true;
      const api = `${process.env.VUE_APP_API}/admin/upload`;
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
            vm.$set(item, "imageUrl", response.data.imageUrl);
            vm.uploadFileLoading = false;
          } else {
            this.$bus.$emit("alertMessage", response.data.message, "danger");
          }
        });
    },
    uploadProduct: function(item) {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      var api = `${process.env.VUE_APP_API}/admin/product/${item.id}`;
      this.$http.put(api, { data: item }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.getProducts();
          this.$bus.$emit("alertMessage", "編輯成功", "success");
          vm.dialog = false;
        }
      });
    }
  },
};
</script>