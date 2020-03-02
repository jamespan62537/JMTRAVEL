import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/pages/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Products from '../components/pages/Products/Products'
import Orders from '../components/pages/Orders.vue'
import Shopping from '../components/pages/Shopping/Shopping'
import CartList from '../components/pages/CartList.vue'
import Home from '../components/pages/Home/Home'
import OrderForm from '../components/pages/OrderForm.vue'
import CustomerCheckOut from '../components/pages/CustomerCheckOut.vue'
import HomePage from '../components/pages/Home/template/HomePage'
import Coupons from '../components/pages/Coupons.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: 'shopping',
        },

        // 後端使用介面
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'Dashboard',
            path: '/admin',
            component: Dashboard,
            children: [
                {
                    name: 'Products',
                    path: 'products',
                    component: Products,
                    meta: {requiresAuth: true},
                },
                {
                    name: 'Orders',
                    path: 'orders',
                    component: Orders,
                    meta: {requiresAuth: true},
                },
                {
                    name: 'Coupons',
                    path: 'coupons',
                    component: Coupons,
                    meta: {requiresAuth: true},
                }
            ],
        },

        // 前端使用介面
        {
            name: 'Home',
            path: '/',
            component: Home,
            children: [
                {
                    name: 'HomePage',
                    path: '',
                    component: HomePage
                },
                {
                    name: 'Shopping',
                    path: 'shopping',
                    component: Shopping,
                },
                {
                    name: 'CartList',
                    path: 'cart',
                    component: CartList
                },
                {
                    name: 'OrderForm',
                    path: 'order_form',
                    component: OrderForm
                },
                {
                    name: 'CustomerCheckOut',
                    path: 'customer_checkout/:orderId',
                    component: CustomerCheckOut
                }
            ]
        }
    ]
})