<template>
  <div class="bg-white p-6 rounded-xl shadow space-y-4">
    <h2 class="text-lg font-bold text-green-700 mb-2">💼 Data Pewaris</h2>

    <div>
      <label class="block text-sm mb-1">Total Harta</label>
      <CurrencyInput v-model="local.harta" />
    </div>

    <div>
      <label class="block text-sm mb-1">Utang</label>
      <CurrencyInput v-model="local.utang" />
    </div>

    <div>
      <label class="block text-sm mb-1">Wasiat</label>
      <CurrencyInput v-model="local.wasiat" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from 'vue'
import CurrencyInput from '@/components/CurrencyInput.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const local = reactive({
  harta: 0,
  utang: 0,
  wasiat: 0,
})

watch(local, () => {
  emit('update:modelValue', { ...local })
}, { deep: true })

watch(() => props.modelValue, (val) => {
  Object.assign(local, val)
}, { immediate: true })
</script>
