<script setup lang="ts">
import imgToTiny from 'imgtotiny'
const changeFile = async e => {
  console.log(e.target.files[0])
  const file = e.target.files[0] as File
  const resFile = await imgToTiny(file, { returnBase64: false, quality: 0.6, minSize: 300 * 1024 })
  console.log('压缩后的文件===', resFile)
}
</script>

<template>
  <input type="file" @change="changeFile" />
</template>
