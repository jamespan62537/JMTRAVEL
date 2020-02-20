<template>
  <div>
    <v-navigation-drawer
      class="side-bar"
      dark
      style="position: fixed; left: 0; top: 53.6px; bottom: 0; z-index: 997;"
    >
      <v-img
        src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg"
        style=" background-position: center center;"
        height="100%"
      >
        <v-layout
          style="height: 100vh; background-color: rgba(0, 0, 0, 0.7); border-radius: unset;"
          class="fill-height"
          column
          tag="v-list"
        >
          <v-list-item>
            <v-list-item class="title">Admin</v-list-item>
          </v-list-item>
          <v-divider />
          <v-list>
            <v-list-group
              v-model="item.active"
              v-for="item in items"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
              active-class="success--text"
            >
              <v-list-item slot="activator">
                <v-list-item-content>
                  <v-list-item class="pa-0">{{ item.title }}</v-list-item>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="subItem in item.items"
                :key="subItem.title"
                ripple
                @click
                :to="subItem.link"
                color="success"
                style="background: rgba(81, 81, 81, 0.4)"
              >
                <v-list-item-content>
                  <v-list-item v-text="subItem.title">></v-list-item>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-layout>
      </v-img>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          action: "fas fa-box-open",
          title: "產品管理",
          active: false,
          items: [{ title: "產品列表", link: "/admin/products" }]
        },
        {
          action: "fas fa-address-card",
          title: "訂單管理",
          active: false,
          items: [{ title: "訂單列表", link: "/admin/orders" }]
        },
        {
          action: "fas fa-ticket-alt",
          title: "活動管理",
          active: false,
          items: [{ title: "優惠券", link: "/admin/coupons" }]
        }
      ]
    };
  }
};
</script>
