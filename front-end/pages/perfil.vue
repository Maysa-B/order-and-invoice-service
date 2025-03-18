<template>
    <div class="d-flex p-5 flex-column justify-content-center align-items-center mb-4">
        <table class="table w-75">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="`${order.id}-order`">
                    <th scope="row">{{ order.id }}</th>
                    <td>{{ order.product }}</td>
                    <td>R$ {{ order.price }}</td>
                    <td>{{ order.amount }}</td>
                    <td>{{ order.created_at }}</td>
                </tr>
            </tbody>
        </table>
        <section>
            <nuxt-link class="btn btn-secondary mt-5" to="/order/create">Create order</nuxt-link>
        </section>
        <Toast ref="toast" />
    </div>
</template>

<script setup>
const toast = ref(null)
const authStore = useAuthStore()
const env = useRuntimeConfig()
const axios = useAxios()
const router = useRouter()
const orders = ref([])

definePageMeta({
    middleware: ['auth']
})

onBeforeMount(async () => {
    if (!authStore?.token) router.push('/')

    await axios.get(`${env.public.ORDER_SERVICE}/orders`).then(data => {
        orders.value = data
    }).catch(err => {
        console.log(err)
        toast.value.showToast(err?.response?.data?.message, 'error')
    })
})
</script>