<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <section class="d-flex flex-column bg-body p-5 rounded justify-content-center align-items-center w-25"
            style="--bs-bg-opacity: .5">
            <h3 class="text-center fw-bolder">ORDER #{{ route.params.id }}</h3>
            <div class="form d-flex p-5 flex-column justify-content-center align-items-center mb-4 w-100">
                <p><strong>Product:</strong> {{ order.product }}</p>
                <p><strong>Price:</strong> R${{ order.price }}</p>
                <p><strong>Amount:</strong> {{ order.amount }}</p>
                <p><strong>Date:</strong> {{ order.created_at }}</p>
                <p><strong>Payment status:</strong> {{ order.payment_status }}</p>
                <p><strong>Order status:</strong> {{ order.status }}</p>

                <button v-if="order.payment_status === 'pending'" class="btn btn-primary mt-1" @click="pay">Pay</button>
            </div>
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
        router.push('/perfil')
    }).catch(err => {
        console.log(err)
        toast.value.showToast(err?.response?.data?.message, 'error')
    })
}
</script>