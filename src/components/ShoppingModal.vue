<template>
  <div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquote-footer text-justify">{{product.description}}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <del
                class="h5"
                v-if="product.origin_price != product.price"
              >原價 {{ product.origin_price | currency}} 元</del>
              <div class="h5" v-if="product.price">總計 {{ product.price | currency}} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option value disabled>請選擇人數</option>
              <option :value="num" v-for="num in 10" :key="num">{{ num }} {{ product.unit }} 人</option>
            </select>
          </div>
          <div class="modal-footer" style="align-items:baseline;">
            <p>小計 {{ product.price * product.num }} 元</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="addCart(product.id, product.num)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>