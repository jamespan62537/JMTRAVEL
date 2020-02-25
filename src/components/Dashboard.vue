<template>
  <div class="main">
    <Alert></Alert>
    <Navbar></Navbar>
    <div class="content">
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Alert from "./AlertMessage.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    Alert
  }
};
</script>

<style>
.main {
  position: relative;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  padding: 8px 15px 15px 270px;
}
</style>