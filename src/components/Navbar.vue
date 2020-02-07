<template>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">JM TRAVEL</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
                </li>
            </ul>
        </nav>
</template>

<script>
export default {
    methods: {
        signOut: function() {
            let vm = this;
            const api = "https://vue-course-api.hexschool.io/logout";
            this.$http.post(api, vm.user).then((response) => {
                // console.log(response.data)
                if(response.data.success) {
                    vm.$router.push('/homepage');
                };
            });
        }
    }
}
</script>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 1020;
}
</style>
