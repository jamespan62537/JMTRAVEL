<template>
  <div>
    <div class="my-5 row justify-content-center w-100">
      <form class="form-card" @submit.prevent="creatOrder">
        <div class="form-group form-title">
          <h2>基本資料</h2>
        </div>
        <div class="form-group pd">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid': errors.has('email')}"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
          >
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group pd">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': errors.has('name')}"
            name="name"
            id="username"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="請輸入姓名"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名不得為空</span>
        </div>
        <div class="form-group pd">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          >
        </div>
        <div class="form-group pd">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': errors.has('address')}"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            v-validate="'required'"
          >
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        <div class="form-group pd">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right pd pd-b-2">
          <button class="btn btn-danger" type="submit">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    // 建立訂單
    creatOrder: function() {
      var vm = this;
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/order`;
      const order = vm.form;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
           vm.$store.dispatch("updateLoading", false);
            console.log(response.data);
            if(response.data.success) {
                vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
          });
        }else{
            console.log('欄位不完整')
        }
      });
    }
  }
};
</script>

<style scoped>
.form-card {
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 8px;
  width: 40%;
  background-color: rgb(243,243,243);
}
.form-card label {
  margin-bottom: 5px;
}
.form-title {
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding: 20px 0;
  background-color: rgb(54, 54, 54);
  color: rgb(255, 255, 255);
  border-radius: 8px 8px 0 0;
  font-weight: 700;
}
.pd {
  padding: 0 20px
}
.pd-b-2 {
  padding-bottom: 20px !important;
}
</style>
