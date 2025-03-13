<template>
    você está logado
    <p>oii {{ authStore.user?.name }}</p>
</template>

<script setup>
const authStore = useAuthStore()
authStore.get() // mudar isso para um middleware
const axios = useAxios()

const result = await axios.get('/closed')
console.log(result)
</script>