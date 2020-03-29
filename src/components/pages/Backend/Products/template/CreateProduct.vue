<template>
  <div>
    <v-btn class="ma-2 white--text" color="amber darken-2" @click="openDialog()">建立新產品</v-btn>
    <v-dialog v-model="dialog" width="70%" style="z-index: 998;">
      <v-card style="margin: 0 auto;">
        <div class="d-flex justify-start align-center">
          <v-icon class="indigo success elevation-4 pa-5 mr-5 ml-5" large dark>fas fa-file-alt</v-icon>
          <div style="font-size: 25px;">新增產品</div>
        </div>
        <v-form ref="form" class="pa-4">
          <v-row>
            <v-col cols="4">
              <v-text-field
                class="mb-6"
                v-model="query_option.imgUrl"
                dense
                outlined
                color="purple"
                item-color="purple"
                height="20px"
                label="輸入圖片網址"
                hide-details
              ></v-text-field>
              <v-file-input
                @change="uploadFile"
                ref="file"
                prepend-inner-icon="mdi-camera"
                prepend-icon
                outlined
                dense
                label="或上傳圖片"
                color="purple"
                hide-details
              ></v-file-input>
              <img class="img-fluid" :src="query_option.imgUrl" alt />
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-text-field
                    v-model="query_option.title"
                    label="請輸入標題"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="query_option.category"
                    label="請輸入分類"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="query_option.unit"
                    label="請輸入單位"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="query_option.origin_price"
                    label="請輸入原價"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="query_option.price"
                    label="請輸入售價"
                    outlined
                    dense
                    color="purple"
                    hide-details
                  ></v-text-field>
                </v-col>
                <hr />
                <v-col cols="12">
                  <v-textarea
                    v-model="query_option.description"
                    label="請輸入產品描述"
                    outlined
                    auto-grow
                    rows="3"
                    shaped
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="query_option.content"
                    label="請輸入產品說明內容"
                    outlined
                    auto-grow
                    rows="3"
                    shaped
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <p>是否啟用</p>
                  <v-switch v-model="query_option.is_enabled"></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn class="mr-3" color="green darken-1" dark @click="uploadProduct">確認</v-btn>
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
      query_option: {
        imgUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: false
      }
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
    },
    uploadFile: function(e) {
      let vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/admin/upload`;
      const uploadedFile = this.$refs.file.internalArrayValue[0];
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
            vm.$store.dispatch("updateLoading", false);
            vm.query_option.imgUrl = response.data.imageUrl;
          } else {
            vm.$store.dispatch("updateLoading", false);
            this.$bus.$emit("alertMessage", response.data.message, "danger");
          }
        });
    },
    uploadProduct: function() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      var api = `${process.env.VUE_APP_API}/admin/product`;
      this.$http.post(api, { data: vm.query_option }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          vm.getProducts();
          this.$bus.$emit("alertMessage", "新增成功", "success");
          vm.dialog = false;
        }
      });
    }
  }
};
</script>