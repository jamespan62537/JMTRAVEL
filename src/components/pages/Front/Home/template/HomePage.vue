<template>
  <div>
    <div class="home-page-container">
      <div class="welcome">
        <div class="title-bg flex">
          <div>
            <v-btn dark outlined large @click="shopping">WELCOME EUROPE</v-btn>
          </div>
        </div>
      </div>
      <div class="hot-product-container">
        <ul class="hot-list flex pl-0">
          <li class="list list-one">
            <div class="hover-effect flex">
              <v-btn dark outlined large @click="shopping">THE LONDON EYE</v-btn>
            </div>
          </li>
          <li class="list list-two pa-0">
            <div class="hover-effect flex">
              <v-btn dark outlined large @click="shopping">ITALY</v-btn>
            </div>
          </li>
        </ul>
      </div>
      <div class="slo d-flex align-center justify-center">
        <div>
          <v-btn dark outlined large @click="shopping">ENJOY THE TRIP</v-btn>
        </div>
      </div>
      <div class="footer flex">
        <p>此網站純為練習用 無商業用途</p>©2019 All Right Reserved | Design by James
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
export default {
  data() {
    return {}
  },
  methods: {
    shopping: function() {
      var vm = this;
      vm.$router.push("/shopping");
    }
  }
}
</script>

<style scoped>
@import "../../../../../assets/css/_homepage.css";
</style>
