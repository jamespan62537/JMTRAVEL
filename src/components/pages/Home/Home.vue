<template>
  <div>
    <Alert></Alert>
    <v-contant>
      <v-container>
        <v-toolbar
          class="d-flex justify-start grey darken-1"
          style="position: fixed; left: 0; right: 0; z-index: 5;"
        >
          <div class="mr-5">
            <a class="text-muted" href="#" @click.prevent="changePage">
              <img src="../../../assets/img/logo.png" alt />
            </a>
          </div>
          <div>
            <v-btn text dark @click="aboutUs">關於我們</v-btn>
            <v-btn text dark @click="shopping">輕旅歐洲</v-btn>
            <v-btn text dark @click="admin">ADMIN</v-btn>
          </div>
        </v-toolbar>
      </v-container>
      <v-container style="margin-top:64px;">
        <div class="cover d-flex align-end">
          <p>TRAVEL NOW</p>
        </div>
        <router-view></router-view>
      </v-container>
    </v-contant>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "../../AlertMessage";
export default {
  data: function() {
    return {};
  },
  components: {
    Alert
  },
  methods: {
    changePage: function() {
      this.$router.push("/");
    },
    aboutUs: function() {
      var vm = this;
      vm.$router.push("/");
    },
    shopping: function() {
      var vm = this;
      vm.$router.push("/shopping");
    },
    admin: function() {
      var vm = this;
      vm.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/_home.css";
</style>
