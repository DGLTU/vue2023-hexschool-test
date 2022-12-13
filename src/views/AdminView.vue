<script setup>
import axios from "axios";
import { ref } from "vue";
import{ RouterLink, useRouter } from 'vue-router'

const router = useRouter()
let data = ref({});

axios.get("http://localhost:3000/data").then((res) => {
  data.value = res.data;
});
const delData = (id) =>{
  axios.delete(`http://localhost:3000/data/${id}`)
  .then((res)=>{
    console.log(`delData${res}`)
    location.reload()
  })
  .catch((err)=>{
    console.log(`delData${err}`)
  })
}

</script>
<template>
  <div class="container">
  <RouterLink to="/create" class="fs-1">新增景點</RouterLink>
    <table class="table table-striped align-middle table-responsive">
      <thead>
        <tr>
          <th scope="col" class="col-2">#標題</th>
          <th scope="col" class="text-center">內文</th>
          <th class="col-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.id">
          <th scope="row">
            <p>
              <span class="text-success fw-bold">{{ i + 1 }}</span>  {{ item.title }}
            </p>
          </th>
          <td class="p-4">
            <div class="text">
              {{ item.description }}
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-outline-danger" @click="delData(item.id)">
                刪除
              </button>
              <button type="button" class="btn btn-warning ms-2" @click="router.push({path:`/edit/${item.id}`})">編輯</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.text {
}
</style>