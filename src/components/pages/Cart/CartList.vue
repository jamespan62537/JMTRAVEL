<template>
  <div class="cart-area">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <v-layout class="d-flex justify-center mt-10 mb-10" wrap>
      <v-flex lg10>
        <v-data-table
          class="elevation-1 table"
          :headers="headers"
          :items="items"
          item-key="id"
          style="background-color: rgb(255, 255, 255);"
          hide-default-footer
        >
          <template v-slot:item.action="{item}">
            <v-btn icon small @click.prevent="removeCartItem(item)">
              <v-icon small color="error">fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.is_coupon="{item}">
            <p v-if="item.coupon">已套用</p>
            <p v-else>未套用</p>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex lg10>
        <v-card min-width="100%">
          <v-layout class="d-flex justify-center wrap pa-5">
            <v-flex lg5>
              <v-text-field class="mr-5" v-model="code" outlined label="請輸入優惠碼" dense hide-details></v-text-field>
              <v-btn color="primary" @click="useCoupons">套用優惠碼</v-btn>
            </v-flex>
            <v-flex lg12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex lg12 justify-end>
              <p style="font-size: 20px;">總計:$ {{ total }}</p>
            </v-flex>
            <v-flex lg12 justify-end>
              <p  v-if="final_total !== total" style="font-size: 25px; color: red;">優惠價:$ {{ final_total }}</p>
            </v-flex>
            <v-flex lg12 justify-end>
              <v-btn @click="createOrder" color="primary">建立訂單</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <div class="bg"> -->
    <!-- <div class="cart-list-empty" v-if="cartList.carts.length == 0">
        <h2>目前尚無行程</h2>
        <button class="btn" @click="changePage">BACK TO TRAVEL</button>
    </div>-->
    <!-- <div class="cart-list-container"> -->
    <!-- 如果 isempty 為 false 代表購物車有品項 -->
    <!-- <table class="table">
          <thead>
            <th width="200">
              <h2>購物車清單</h2>
            </th>
            <th width="250">國家</th>
            <th>人數</th>
            <th width="120">小計</th>
          </thead>
          <tbody class="card-tbody">
            <tr v-for="item in cartList.carts" :key="item.id">
              <td>
                <button class="removeBtn" @click.prevent="removeCartItem(item)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>
                {{item.product.title}}
                <p class="text-primary" v-if="item.coupon">已套用優惠券</p>
              </td>
              <td>{{item.qty}}</td>
              <td class="text-right" v-if="!item.price">{{item.total | currency}}</td>
              <td v-if="item.price">{{item.total}}</td>
              <td v-if="item.price">{{item.total}}</td>
            </tr>
          </tbody>
        </table>
        <div class="input-group flex coupons-group">
          <input type="text" name id placeholder="請輸入優惠碼" v-model="code" />
          <button @click="useCoupons">套用優惠碼</button>
        </div>
        <div class="check-cart flex">
          <div class="h5 text-right total-price">總計: {{ cartList.total | currency }}</div>
          <div
            class="h5 text-right total-price dis-price"
            v-if="cartList.final_total !== cartList.total"
          >優惠價: {{ cartList.final_total | currency }}</div>
          <router-link to="/order_form" class="h5 text-center next-step">建立訂單</router-link>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      headers: [
        {
          text: "操作",
          value: "action",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "國家",
          value: "product.title",
          class: "teal--text darken-1"
        },
        {
          text: "人數",
          value: "qty",
          class: "teal--text darken-1",
          sortable: false
        },
        {
          text: "是否套用優惠券",
          value: "is_coupon",
          class: "teal--text darken-1",
          sortable: false
        }
      ],
      items: [],
      total: null,
      final_total: null,
      cartList: [],
      isLoading: false,
      isempty: false,
      code: ""
    };
  },
  methods: {
    // 取得購物車內容
    // 並將內容存至 cartList
    getCart: function() {
      let vm = this;
      vm.isLoading = true;
      const api = "https://vue-course-api.hexschool.io/api/jamespantest1/cart";
      this.$http.get(api).then(response => {
        console.log(response.data.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.items = response.data.data.carts;
          vm.total = response.data.data.total;
          vm.final_total = response.data.data.final_total;
        }
      });
    },
    // 移除購物車內容
    // 移除後再次取得購物車資訊
    removeCartItem: function(item) {
      let vm = this;
      const api = `https://vue-course-api.hexschool.io/api/jamespantest1/cart/${item.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getCart();
      });
    },
    changePage: function() {
      this.$router.push("/shopping");
    },
    useCoupons: function() {
      let vm = this;
      vm.isLoading = true;
      const coupon_code = {
        code: vm.code
      };
      const api =
        "https://vue-course-api.hexschool.io/api/jamespantest1/coupon";
      // 須注意 api 回傳結構
      this.$http.post(api, { data: coupon_code }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          this.$bus.$emit("alertMessage", response.data.message, "success");
          vm.getCart();
        } else {
          vm.isLoading = false;
          this.$bus.$emit("alertMessage", response.data.message, "danger");
        }
      });
    },
    createOrder: function() {
      var vm = this;
      vm.$router.push("/order_form");
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style scoped>
@import "../../../assets/css/_cartList.css";
</style>
