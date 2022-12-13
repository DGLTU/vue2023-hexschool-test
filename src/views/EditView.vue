<script setup>
import axios from "axios";
import { ref } from "vue";
import{ useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = ref()
id.value = route.params.id
const data = ref()
const edit = () =>{
  console.log(data.value)
  axios.put(`http://localhost:3000/data/${id.value}`,data.value)
  .then((res)=>{
    console.log(res)
    router.push('/admin')
  })
  .catch((err)=>{
    console.log(err)
  })
}

axios.get(`http://localhost:3000/data/${id.value}`)
.then((res)=>{
  data.value = res.data
})

</script>
<template>
  <form class="container mt-4 w-25">
    <label for="title">標題</label>
    <input type="text" class="form-control" id="title" v-model="data.title">
    <label for="description">內文</label>
    <textarea class="form-control" id="description" minlength="5" rows="6" v-model="data.description"></textarea>
    <button type="button" class="mt-4 btn btn-primary form-control" @click="edit">編輯</button>
  </form>
</template>