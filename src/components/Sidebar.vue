<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <i class="fas fa-box-open pd"></i>
                <router-link to="/admin/products" class="nav-link in-b">產品列表</router-link>
              </li>
              <li class="nav-item">
                <i class="fas fa-address-card pd"></i>
                <router-link to="/admin/orders" class="nav-link in-b">訂單列表</router-link>
              </li>
              <li class="nav-item">
                <i class="fas fa-ticket-alt pd"></i>
                <router-link to="/admin/coupons" class="nav-link in-b">優惠券</router-link>
              </li>
            </ul>
          </div>
        </nav>    
    </div>
</template>

<style scoped>
.in-b{
  display: inline-block;
}
.pd{
  padding: 0.5rem 0 0.5rem 1rem;
}
.nav li:hover {
  background-color: rgb(200, 200, 200);
}
</style>
