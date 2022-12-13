<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = ref()
const id = ref(route.params.id)
const userId = ref()
const isSign = ref()
const isFav = ref(false)

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const fav = () =>{
  if(isFav.value === false){
    isFav.value = true
    const addData = data.value[0]
    addData.userId.push(userId.value)
    //addData.userId = []
    axios.put(`http://localhost:3000/data/${id.value}`, addData)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }else if(isFav.value === true){
    isFav.value = false
    let addData = data.value[0]
    //尋找景點資料裡對應userId的index
    let index = addData.userId.indexOf(userId.value)
    addData.userId.splice(index, 1)
    axios.put(`http://localhost:3000/data/${id.value}`, addData)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

axios.get(`http://localhost:3000/data?id=${id.value}`)
.then((res)=>{
  data.value = res.data
  isSign.value = (getCookie("token")) ? true : false
  userId.value = getCookie("userId")
  if(data.value[0].userId.includes(userId.value)) {
    isFav.value = true
  }
  else{
    isFav.value = false
  }
  
})
.catch((err)=>{
  console.log(err)
})

</script>
<template>
  <div class="container mt-4">
    <div class="favorite" v-if="isSign">
      <p v-if="!isFav">未加入收藏</p>
      <p v-else-if="isFav">已加入收藏</p>
      <button type="button" class="mb-4 btn btn-warning" @click="fav()" v-if="!isFav">加入收藏</button>
      <button type="button" class="mb-4 btn btn-light" @click="fav()" v-else-if="isFav">取消收藏</button>
    </div>
  <h1>單筆內文</h1>
    {{data}}
  </div>
</template>