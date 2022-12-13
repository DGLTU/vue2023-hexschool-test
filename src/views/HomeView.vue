<script setup>
import Card from '@/components/Card.vue'
import axios from 'axios'
import { ref } from 'vue'

let data = ref({})

axios.get('http://localhost:3000/data')
.then((res)=>{
  data.value = res.data
})

</script>

<template>
  <div class="container w-75">
    <div class="wrap mt-5 d-flex justify-content-between flex-wrap">
      <div class="spotList" v-for="item in data" :key="item.id">
        <Card :title="item.title" :description="item.description" :id="item.id" />
      </div>
    </div>
  </div>
</template>
