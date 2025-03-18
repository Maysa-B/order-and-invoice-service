<template>
    <div class="d-flex p-5 flex-column justify-content-center align-items-center">
        <div class="form d-flex p-5 flex-column justify-content-center align-items-center mb-4 w-50">
            <FormInput :form="form" field="product" label="Product" />
            <FormInput :form="form" field="price" label="Price" prefix="R$" type="number" />
            <FormInput :form="form" field="amount" label="Amount" type="number" />
            <section class="d-flex justify-content-around align-items-center w-100 pt-4">
                <button @click="submitForm" class="btn btn-primary mt-1">Create order</button>
            </section>
        </div>
        <Toast ref="toast" />
    </div>
</template>

<script setup>
const toast = ref(null)
const authStore = useAuthStore()
const env = useRuntimeConfig()
const axios = useAxios()
const router = useRouter()

definePageMeta({
    middleware: ['auth']
})

onBeforeMount(async () => {
    if (!authStore?.token) router.push('/')
})

const form = ref({
    product: null,
    price: null,
    amount: null,
})

const submitForm = async() => {
    // validações do formulário

    await axios.post(`${env.public.ORDER_SERVICE}/orders`, form.value).then(() => {
        toast.value.showToast('Order created', 'success')
        router.push('/perfil')
    }).catch(err => {
        console.log(err)
        toast.value.showToast(err?.response?.data?.message, 'error')
    })
}

</script>