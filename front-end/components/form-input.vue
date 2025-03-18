<template>
    <div class="w-100 m-0 p-0">
        <div v-if="!prefix" class="form-floating mb-3 w-100">
            <input v-model="form[field]" :id="field" class="form-control" :placeholder="label" :type="type" />
            <label :for="field">{{ label }}</label>
        </div>
        <div v-else class="input-group w-100 mb-3">
            <span class="input-group-text">{{ prefix }}</span>
            <div class="form-floating">
                <input v-model="form[field]" :type="type" class="form-control" :id="field" :placeholder="label" />
                <label :for="field">{{ label }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    form: { type: Object },
    field: { type: String },
    label: { type: String },
    prefix: { type: String },
    type: { type: String }
})

</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>