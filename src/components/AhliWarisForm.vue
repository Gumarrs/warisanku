<template>
  <div class="bg-white p-6 rounded-xl shadow space-y-4">
    <h2 class="text-lg font-bold text-green-700 mb-2">👨‍👩‍👧‍👦 Data Ahli Waris</h2>

    <div v-for="(jumlah, jenis) in ahliWaris" :key="jenis">
      <label class="block text-sm text-gray-700 mb-1 capitalize">
        {{ jenis.replace('_', ' ') }}
      </label>
      <input
        v-model.number="ahliWaris[jenis]"
        type="number"
        min="0"
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-300"
        placeholder="0"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const ahliWaris = reactive({
  suami: 0,
  istri: 0,
  ayah: 0,
  ibu: 0,
  anak_laki: 0,
  anak_perempuan: 0,
  saudara_laki: 0,
  saudara_perempuan: 0,
})

watch(ahliWaris, () => {
  emit('update:modelValue', { ...ahliWaris })
}, { deep: true })
</script>
