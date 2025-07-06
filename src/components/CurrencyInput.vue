<template>
  <input
    ref="inputRef"
    v-model="rawInput"
    @blur="handleBlur"
    @focus="handleFocus"
    class="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-300"
    placeholder="Rp 0,00"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const rawInput = ref('')
const inputRef = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    if (document.activeElement !== inputRef.value) {
      rawInput.value = formatRupiah(val)
    }
  },
  { immediate: true }
)

function handleFocus() {
  rawInput.value = props.modelValue?.toString() || ''
}

function handleBlur() {
  const numeric = parseInt(rawInput.value.replace(/\D/g, '')) || 0
  emit('update:modelValue', numeric)
  rawInput.value = formatRupiah(numeric)
}

function formatRupiah(value) {
  const number = Number(value || 0)
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(number)
}
</script>
