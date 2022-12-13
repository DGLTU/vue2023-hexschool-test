<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref()
const isAdmin = ref()
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
token.value = getCookie("token")
isAdmin.value = (getCookie("role") === "admin")
const logout = () =>{
  document.cookie = "token="
  document.cookie = "userId="
  document.cookie = "role="
  router.go(0)
}
router.beforeEach(async (to) => {
   if (token.value ==="" && 
       to.name !== 'sign-in' && 
       to.name === 'collection') {
     return { name: 'sign-in' }
   }else if( to.name === 'admin' && !(isAdmin.value)){
    alert('your are not admin')
    return { name: 'home' }
   }
})
router.afterEach(async (to, from) => {
  if(to.name ==='home' && (from.name ==='sign-in')){
    location.reload()
  }
})
</script>

<template>
  <header>
      <nav class="nav justify-content-between bg-light p-4 " v-if="!token">
          <RouterLink to="/" class="nav-link text-dark fs-4 fw-bold">LOGO</RouterLink>
          <div class="nav-link d-flex ">
           <RouterLink to="/sign-in" class="nav-link text-dark" aria-current="page" href="#">登入</RouterLink>
            <RouterLink to="/register" class="btn btn-primary">免費註冊</RouterLink>
          </div>
      </nav>
      <nav class="nav justify-content-between bg-light p-4" v-else-if="(token && !isAdmin)">
          <RouterLink to="/" class="nav-link text-dark fs-4 fw-bold" href="#">LOGO</RouterLink>
          <div class="nav-link d-flex ">
            <RouterLink to="/admin" class="btn btn-primary" v-if="isAdmin">前往後台</RouterLink>
            <RouterLink to="/collection" class="nav-link text-dark">收藏列表</RouterLink>
            <span class="d-flex align-items-center text-dark">Hello!</span>
           <button type="button" class="btn" @click="logout">登出</button>
          </div>
      </nav>
      <nav class="nav justify-content-between bg-dark p-4" v-else-if="isAdmin">
          <RouterLink to="/" class="nav-link text-light fs-4 fw-bold" href="#">LOGO</RouterLink>
          <div class="nav-link d-flex ">
            <RouterLink to="/admin" class="btn btn-primary">前往後台</RouterLink>
            <RouterLink to="/collection" class="nav-link text-light">收藏列表</RouterLink>
            <span class="me-2 d-flex align-items-center text-light">Hello!</span>
           <button type="button" class="btn btn-light" @click="logout">登出</button>
          </div>
      </nav>
  </header>
  <RouterView  />
</template>

<style scoped>
</style>
