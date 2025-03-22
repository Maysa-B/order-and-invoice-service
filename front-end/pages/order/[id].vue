<template>
    <div class="d-flex p-5 flex-column justify-content-center align-items-center mb-4">
        <p>{{ order.id }}</p>
        <p>{{ order.product }}</p>
        <p>{{ order.price }}</p>
        
        <button v-if="order.payment_status === 'pending'" @click="pay">Pay</button>

        <Toast ref="toast" />
    </div>
</template>

<script setup>
const toast = ref(null)
const authStore = useAuthStore()
const env = useRuntimeConfig()
const axios = useAxios()
const router = useRouter()
const route = useRoute()
const order = ref({})

definePageMeta({
    middleware: ['auth']
})

onBeforeMount(async () => {
    if (!authStore?.token) router.push('/')

    await axios.get(`${env.public.ORDER_SERVICE}/orders/${route.params.id}`).then(data => {
        order.value = data
    }).catch(err => {
        console.log(err)
        toast.value.showToast(err?.response?.data?.message, 'error')
    })
})

const pay = async () => {
    await axios.post(`${env.public.PAYMENT_SERVICE}/payment/${route.params.id}`).then(() => {
        // redirect or refresh
    }).catch(err => {
        console.log(err)
        toast.value.showToast(err?.response?.data?.message, 'error')
    })
}
</script>