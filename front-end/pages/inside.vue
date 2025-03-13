<template>
    você está logado
    <p>oii {{ authStore.user?.name }}</p>
</template>

<script setup>

definePageMeta({
    middleware: ['auth']
})

const authStore = useAuthStore()
const axios = useAxios()

const result = await axios.get('/closed')
</script>