<template>
    <div data-bs-theme="dark" class="bg-secondary-subtle text-light vh-100" id="layout">
        <ul v-if="authStore.token" class="nav nav-underline justify-content-end p-3">
            <button :class="`nav-item nav-link ${item.active ? 'active' : ''}`" v-for="item in menu"
                @click="item.function" :key="`menu-${item.text}-btn`">{{ item.text }}</button>
        </ul>
        <slot />
    </div>
</template>

<script setup>
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const menu = ref([])

const generateMenu = (path) => {
    menu.value = [
        { text: 'Perfil', function: () => router.push('/perfil'), active: path === '/perfil' },
        { text: 'Create order', function: () => router.push('/order/create'), active: path === '/order/create' },
        { text: 'Logout', function: () => authStore.logout(router) },
    ]
}

generateMenu(route.path)

watch(() => route.path, (newPath) => generateMenu(newPath))
</script>

<style>
#layout {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>