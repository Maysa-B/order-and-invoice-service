<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div v-if="show" :class="['toast align-items-center text-white', 'border-0 show', type === 'error' ? 'bg-danger' : type === 'success' ? 'bg-success' : '']" role="alert"
      aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
const show = ref(false)
const message = ref("")
const type = ref("")

const showToast = (msg, tp) => {
  message.value = msg
  type.value = tp
  show.value = true

  setTimeout(() => {
    show.value = false
  }, 3000)
}

const hideToast = () => {
  show.value = false
}

defineExpose({ showToast })
</script>