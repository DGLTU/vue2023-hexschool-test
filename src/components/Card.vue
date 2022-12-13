<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
 <div class="spotList border rounded mb-4 p-4">
  <RouterLink :to="{ name:'spot',params: {id} }" class="d-flex justify-content-end">延伸閱讀</RouterLink>
  <h1>{{title}}</h1>
  <p class="brief">{{description}}</p>
 </div>
</template>

<style>
.spotList{
  width: 350px;
  height: 350px;
}
.brief{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>