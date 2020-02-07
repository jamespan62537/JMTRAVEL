<template>
  <div>
    <div class="home-page-container">
      <div class="welcome">
        <div class="title-bg flex">
          <div class="title">
            <router-link to="/shopping">WELCOME EUROPE</router-link>
          </div>
        </div>
      </div>
      <div class="hot-product-container">
        <ul class="hot-list flex">
          <li class="list list-one">
            <div class="hover-effect flex">
              <router-link to="/shopping">THE LONDON EYE</router-link>
            </div>
          </li>
          <li class="list list-two">
            <div class="hover-effect flex">
              <router-link to="/shopping">ITALY</router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="slo">
        <div class="slo-effect flex">
          <router-link to="/shopping" class="flex">ENJOY THE TRIP</router-link>
        </div>
      </div>
      <div class="footer flex">
        <p>此網站純為練習用 無商業用途</p>©2019 All Right Reserved | Design by James
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/_homepage.css";
</style>
