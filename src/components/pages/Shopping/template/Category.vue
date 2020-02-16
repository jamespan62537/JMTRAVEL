<template>
  <div>
    <div class="nav-location-list nav-scroller py-1">
      <nav class="nav d-flex justify-content-space-around">
        <a
          class="p-2 text-muted hvr-underline-from-center"
          href="#"
          @click="visibleCat('all')"
        >全部</a>
        <a
          class="p-2 text-muted hvr-underline-from-center"
          href="#"
          @click="visibleCat('north')"
        >漫遊北歐</a>
        <a
          class="p-2 text-muted hvr-underline-from-center"
          href="#"
          @click="visibleCat('south')"
        >鄉村南歐</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    visibleCat: function(visibility) {
      this.$emit("visibleCat", visibility)
    }
  }
}
</script>