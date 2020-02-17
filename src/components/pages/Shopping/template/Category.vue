<template>
  <div>
    <div class="d-flex justify-space-around pt-2 pb-2 grey darken-4">
      <v-btn text color="error" large style="font-size: 20px;" @click="visibleCat('all')">全部</v-btn>
      <v-btn text color="error" large style="font-size: 20px;" @click="visibleCat('north')">漫遊北歐</v-btn>
      <v-btn text color="error" large style="font-size: 20px;" @click="visibleCat('south')">鄉村南歐</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    visibleCat: function(visibility) {
      this.$emit("visibleCat", visibility);
    }
  }
};
</script>