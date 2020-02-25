<template>
  <v-toolbar
    dense
    class="indigo darken-2"
    style="position: fixed; left: 0; right: 0; z-index: 5;"
    dark
  >
    <v-toolbar-title>JM TRAVEL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click.prevent="signOut">登出</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    signOut: function() {
      let vm = this;
      const api = "https://vue-course-api.hexschool.io/logout";
      this.$http.post(api, vm.user).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          vm.$router.push("/homepage");
        }
      });
    }
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 996;
}
</style>
