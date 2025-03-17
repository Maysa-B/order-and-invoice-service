<template>
	<div class="d-flex justify-content-center align-items-center vh-100">
		<section class="d-flex flex-column bg-body p-5 rounded justify-content-center align-items-center w-25"
			style="--bs-bg-opacity: .5">
			<h3 class="text-center fw-bolder">REGISTER</h3>
			<div class="form d-flex p-5 flex-column justify-content-center align-items-center mb-4 w-100">
				<input v-model="form.name" class="form-control m-1" placeholder="Name" />
				<input v-model="form.email" type="email" class="form-control m-1" placeholder="Email" />
				<input v-model="form.password" type="password" class="form-control m-1" placeholder="Password" />
				<input v-model="form.password_confirm" type="password" class="form-control m-1" placeholder="Password Check" />
				<section class="d-flex justify-content-around align-items-center w-100 pt-4">
					<button @click="submitForm" class="btn btn-sm btn-primary mt-1">Register</button>
					<span class="small">or</span>
					<a class="btn btn-sm btn-light" :href="`${env.public.AUTH_SERVICE}/auth/google`">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							class="bi bi-google" viewBox="0 0 16 16">
							<path
								d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
						</svg>
                        Sign-up with Google
					</a>
				</section>
			</div>
		</section>
		<Toast ref="toast" />
	</div>
</template>

<script setup>
const toast = ref(null)
const authStore = useAuthStore()
const env = useRuntimeConfig()
const router = useRouter()
const axios = useAxios()

definePageMeta({
    middleware: ['auth']
})

onBeforeMount(() => {
	if (authStore?.token) router.push('/inside')
})


const form = ref({
    name: '',
	email: '',
	password: '',
    password_confirm: ''
})

const submitForm = async () => {
	const formValue = form.value

    if (!formValue.email || !formValue.password || !formValue.name)
		return toast.value.showToast('All fields are required', 'error')

	if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formValue.email))
		return toast.value.showToast('Invalid email', 'error')

	if (formValue.password?.length < 8)
		return toast.value.showToast('Password must contain at least 8 characters.', 'error')

    if (formValue.password !== formValue.password_confirm)
		return toast.value.showToast('Password and password confirmation don\'t match', 'error')

	await axios.post(`${env.public.AUTH_SERVICE}/register`, form.value).then(({ user, token }) => {
		authStore.setCookies(user, token)
		router.push('/inside')
	}).catch(err => toast.value.showToast(err, 'error'))
}

</script>