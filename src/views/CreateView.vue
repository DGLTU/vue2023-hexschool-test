<script setup>
import axios from "axios";
import { ref } from "vue";
import{ RouterLink, useRouter } from 'vue-router'


const router = useRouter()
const data = ref({
  userId:[]
})

const addData = () =>{
  axios.post('http://localhost:3000/data', data.value)
  .then((res)=>{
    console.log("addData")
    router.push('/admin')
  })
  .catch((err)=>{
    console.log(`addData ${err}`)
  })
  
}

</script>
<template>
  <form class="container mt-4 w-25">
    <label for="title">標題</label>
    <input type="text" class="form-control" id="title" v-model="data.title">
    <label for="description">內文</label>
    <textarea class="form-control" id="description" minlength="5" rows="6" v-model="data.description"></textarea>
    <button type="button" class="mt-4 btn btn-primary form-control" @click="addData">新增</button>
  </form>
</template>