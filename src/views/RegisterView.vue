<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const user = ref({
  email: '',
  password: ''
})
const signUp = (user) => {
  if(user.email!=="" && user.pwd!==""){
    let time = new Date().getTime()
    user.id = `acc${time}`
    axios.post('http://localhost:3003/users', user)
    .then(()=>{
      alert('註冊成功!')
      router.push('/sign-in')
    })
    .catch((err)=>{
      alert(err.response.data)
      cleanInput()
    })
  }else{
    alert('請輸入完整資訊 !')
    cleanInput()
  }
}
const cleanInput = () => {
  user.value={
  email: '',
  password: ''
  }
}
</script>

<template>
<div class="container w-25 p-8 mt-4">
  <h1>註冊</h1>
  <form class="border rounded p-4">
    <label for="email" class="fs-5">帳號:</label>
    <input type="email" class="form-control" id="email" v-model.trim="user.email">
    <label for="password" class="mt-4 fs-5">密碼:</label>
    <input type="password" class="form-control" id="password" v-model.trim="user.password">
    <button type="button" class="mt-5 btn btn-primary form-control fs-5" @click="signUp(user)">註冊</button>
  </form>
</div>
</template>