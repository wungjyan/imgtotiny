<script setup lang="ts">
import imgToTiny, { fileToBase64 } from 'imgtotiny'
import { reactive } from 'vue'
const before = reactive({
  path: '',
  size: 0
})
const after = reactive({
  path: '',
  size: 0
})
const changeFile = async e => {
  console.log('压缩前的文件===', e.target.files[0])

  const file = e.target.files[0] as File
  before.path = (await fileToBase64(file)) as string
  before.size = file.size

  const newFile = (await imgToTiny(file, { quality: 0.5, height: 300, minSize: 5 * 1024 * 1024 })) as File
  after.path = (await fileToBase64(newFile)) as string
  after.size = newFile.size

  console.log('压缩后的文件===', newFile)
}
</script>

<template>
  <input type="file" @change="changeFile" />

  <div>
    <h2>压缩之前的：</h2>
    <img class="img" :src="before.path" alt="" />
    <p>大小：{{ before.size }}</p>
  </div>

  <div>
    <h2>压缩之后的：</h2>
    <img class="img" :src="after.path" alt="" />
    <p>大小：{{ after.size }}</p>
  </div>
</template>

<style>
.img {
  display: block;
}
</style>
