<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <h1 class="text-3xl font-bold text-center text-green-700 mb-4">📊 Kalkulator Waris Islam</h1>

    <!-- 📚 Edukasi -->
    <div class="text-center mb-6">
      <router-link
        to="/edukasi"
        class="inline-block bg-yellow-100 text-yellow-800 font-semibold py-2 px-4 rounded-full hover:bg-yellow-200 transition"
      >
        📖 Pelajari Dulu Dalil & Hukum Waris Islam
      </router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <PewarisForm v-model="dataPewaris" />
      <AhliWarisForm v-model="dataAhliWaris" />

      <div class="col-span-1 md:col-span-2 text-center mt-4">
        <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl text-lg">
          💰 Hitung Pembagian Warisan
        </button> 
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PewarisForm from '@/components/PewarisForm.vue'
import AhliWarisForm from '@/components/AhliWarisForm.vue'

const dataPewaris = ref({})
const dataAhliWaris = ref({})

const router = useRouter()

const handleSubmit = () => {
  localStorage.setItem('pewaris', JSON.stringify(dataPewaris.value))
  localStorage.setItem('ahliwaris', JSON.stringify(dataAhliWaris.value))
  router.push('/hasil')
}
</script>
