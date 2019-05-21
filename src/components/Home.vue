<template>
  <div>
    <Alert></Alert>
    <div class="container">
      <div class="cover flex">
        <header class="blog-header fixed-title">
          <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-4 pt-1">
              <a class="text-muted" href="#">
                <img src="../assets/img/logo.png" alt>
              </a>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center bg-b">
              <router-link to="/" class="btn btn-sm">關於我們</router-link>
              <router-link to="/shopping" class="btn btn-sm">輕旅歐洲</router-link>
              <router-link to="/login" class="btn btn-sm">ADMIN</router-link>
            </div>
          </div>
        </header>
        <p>TRAVEL NOW</p>
      </div>
      <main role="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "./AlertMessage.vue";
export default {
  data: function() {
    return {};
  },
  components: {
    Alert
  },
  methods: {
    changePage: function(item) {
      if (item == "travel") {
        this.$router.push("/shopping");
      } else if (item == "cart") {
        this.$router.push("/cart");
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/_home.css";
</style>
