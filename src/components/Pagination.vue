<template>
  <div>
    <v-layout class="d-flex justify-center">
      <v-flex class="d-flex justify-end">
        <v-pagination
          v-model="pages.current_page"
          :length="pages.total_pages"
          color="green darken-1"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="getPages(pages.current_page)"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object
    }
  },
  methods: {
    getPages: function(page) {
      this.$emit("callPage", page);
    }
  }
};
</script>