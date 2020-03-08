import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/pages/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Products from '../components/pages/Backend/Products/Products'
import Orders from '../components/pages/Backend/Orders/Orders'
import Shopping from '../components/pages/Front/Shopping/Shopping'
import CartList from '../components/pages/Front/Cart/CartList.vue'
import Home from '../components/pages/Front/Home/Home'
import OrderForm from '../components/pages/Front/Check/OrderForm.vue'
import CustomerCheckOut from '../components/pages/Front/Check/CustomerCheckOut.vue'
import HomePage from '../components/pages/Home/template/HomePage'
import Coupons from '../components/pages/Backend/Coupons/Coupons'

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