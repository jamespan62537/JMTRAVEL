<template>
    <div>
        <form class="form-signin" @submit="signIn">
          <img class="mb-4" src="../../assets/img/logo.png" alt="" width="72" height="72">
          <h1 class="h3 mb-3 font-weight-normal">LOGIN</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control login-width" 
                v-model="user.username" placeholder="Email address" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control login-width" placeholder="Password" 
                v-model="user.password" required>
          <div class="checkbox mb-3">
              <label>
                  <input type="checkbox" value="remember-me"> Remember me
              </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block login-width" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn: function() {
      let vm = this;
      const api = "https://vue-course-api.hexschool.io/admin/signin";
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data)
        if(response.data.success) {
          vm.$router.push('/admin/products');
        };
      });
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: '微軟正黑體';
  box-shadow: 2px 6px 12px -4px rgba(0, 0, 0, 1.5) !important;
  padding: 50px 40px
}
.form-signin img {
    width: 110px;
    height: 80px;
}
.form-signin h1 {
  font-size: 30px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .login-width {
  width: 250px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

