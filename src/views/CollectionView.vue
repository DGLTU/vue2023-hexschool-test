<script setup>
import axios from 'axios'
import { ref } from 'vue'

const data = ref([])
const userId = ref()
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
userId.value = getCookie("userId")



const getData = (id) => {
  axios.get('http://localhost:3000/data')
  .then((res)=>{
    data.value = res.data.filter((item)=>item.userId.includes(id))
  })
  .catch((err)=>{
    console.log(err)
  })
}
const editData = (temp,id) => {
  axios.put(`http://localhost:3000/data/${id}`, temp)
  .then((res)=>{
    console.log(res)
    getData(userId.value)
  })
  .catch(err=>{
    console.log(err)
  })
}

const cancelCollection = (item, id) =>{
  const index = item.userId.indexOf(userId.value)
  const temp = item
  temp.userId.splice(index, 1)
  editData(temp,id)
}

getData(userId.value)
</script>

<template>
<div class="container d-flex justify-content-start">
  <div v-for ="item in data" :key="item.id">
    <div class="collection border rounded my-4 me-4 p-4">
      <div class="d-flex justify-content-end">
        <button type="button" class="mb-4 btn btn-warning" @click="cancelCollection(item, item.id)">已收藏</button>
      </div>
      <h1>{{item.title}}</h1>
      <p class="brief">{{item.description}}</p>
    </div>
  </div>
</div>
</template>

<style>
.collection{
  width: 350px;
  height: 350px;
}
.brief{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>