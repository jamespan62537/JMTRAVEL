<template>
  <div>
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card width="500">
        <v-toolbar color="teal darken-1" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form class style="width: 100%;" @submit="signIn">
            <v-layout class="flex-column justify-center">
              <v-flex lg12>
                <v-text-field v-model="user.username" label="Email address" outlined autofocus></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-text-field
                  v-model="user.password"
                  label="Password"
                  :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="password_show ? 'text' : 'password'"
                  outlined
                  autofocus
                  @click:append="password_show = !password_show"
                ></v-text-field>
              </v-flex>
              <v-flex class="justify-end" lg12>
                <input type="checkbox" value="remember-me" /> Remember me
              </v-flex>
              <v-flex class="justify-center" lg12>
                <v-btn color="teal darken-1" dark type="submit">Sign in</v-btn>
              </v-flex>
              <v-flex class="justify-center mt-5" lg12>
                <p>&copy; 2017-2018</p>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        username: "",
        password: ""
      },
      password_show: false
    };
  },
  methods: {
    signIn: function() {
      let vm = this;
      const api = "https://vue-course-api.hexschool.io/admin/signin";
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/admin/products");
        }
      });
    }
  }
};
</script>