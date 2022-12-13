<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({
  email: '',
  password: ''
})


const signIn = (user) => {
  if(user.email!=="" || user.password!==""){
    axios.post('http://localhost:3003/signin',user)
    .then((res)=>{
      document.cookie = `token=${res.data.accessToken}`
      document.cookie = `userId = ${res.data.user.id}`
      document.cookie = `role=${res.data.user.role}`
      router.push('/')
    })
    .catch((err)=>{
      alert('填寫資料有誤')
      cleanInput()
    })
  }else{
    alert('請輸入完整資訊!')
    cleanInput()
  }
}
const cleanInput = () =>{
  user.value={
  email: '',
  password: ''
  }
}

</script>
<template>
  <div class="container w-25 p-8 mt-4">
    <h1>登入</h1>
    <form class="border rounded p-4">
      <label for="email" class="fs-5">帳號:</label>
      <input type="email" class="form-control" id="email" required v-model.trim="user.email">
      <label for="password" class="mt-4 fs-5">密碼:</label>
      <input type="password" class="form-control" id="password" required v-model.trim="user.password">
      <button type="button" class="mt-5 btn btn-primary form-control fs-5" @click="signIn(user)">登入</button>
    </form>
  </div>
</template>
