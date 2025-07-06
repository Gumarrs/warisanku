<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
    <div class="w-full max-w-3xl space-y-6">

      <!-- 🟢 Judul -->
      <h1 class="text-2xl font-bold text-center text-green-700">
        📚 Edukasi Waris Islam
      </h1>

      <!-- 📘 Edukasi Ilmu Waris -->
      <div class="bg-white p-6 rounded-xl shadow space-y-6">
        <!-- ✅ Rukun dan Syarat -->
        <section>
          <h2 class="text-xl font-semibold text-green-800">🧠 Rukun dan Syarat Waris</h2>
          <ul class="list-disc pl-6 text-gray-700 text-sm space-y-1 mt-2">
            <li>💀 Meninggalnya pewaris</li>
            <li>👥 Adanya ahli waris</li>
            <li>⛔ Tidak ada penghalang waris (misal: beda agama, pembunuhan)</li>
          </ul>
        </section>

        <!-- ✅ Dalil-Dalil Al-Qur'an -->
        <section>
          <h2 class="text-xl font-semibold text-green-800">📖 Dalil Al-Qur’an tentang Warisan</h2>
          <div
            v-for="(dalil, index) in dalilList"
            :key="index"
            class="border p-4 rounded-lg cursor-pointer hover:bg-green-50 transition"
            @click="toggleDalil(index)"
          >
            <p class="font-semibold text-green-800">{{ dalil.judul }}</p>
            <p class="text-sm text-gray-700 italic mt-1">"{{ dalil.teks }}"</p>
            <transition name="fade">
              <div v-if="dalil.show" class="mt-2 text-sm text-gray-600 bg-gray-50 rounded p-3">
                {{ dalil.syarah }}
              </div>
            </transition>
          </div>
        </section>

        <!-- ✅ Wasiat dan Utang -->
        <section>
          <h2 class="text-xl font-semibold text-green-800">📝 Wasiat dan Utang</h2>
          <p class="text-sm text-gray-700 mt-2">
            Dalam Islam, <strong>wasiat</strong> maksimal <strong>1/3</strong> dari total harta dan tidak diberikan kepada ahli waris.
            <br />
            <strong>Utang</strong> pewaris harus diselesaikan terlebih dahulu sebelum pembagian warisan.
          </p>
          <p class="text-sm mt-2 text-gray-600 italic">"Tidak ada wasiat untuk ahli waris." (HR. Abu Dawud)</p>
        </section>
      </div>

      <!-- 📊 Hasil Perhitungan -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dalilList = ref([
  {
    judul: 'QS. An-Nisa: 7',
    teks: 'Bagi laki-laki ada hak bagian dari harta peninggalan orang tua dan kerabatnya, dan bagi perempuan ada hak bagian dari harta peninggalan orang tua dan kerabatnya, baik sedikit atau banyak menurut bagian yang telah ditetapkan.',
    syarah: 'Ini adalah ayat pertama yang secara eksplisit menyatakan bahwa perempuan juga memiliki hak waris, mematahkan tradisi jahiliyah yang hanya memberikan warisan kepada laki-laki dewasa. Ini menunjukkan keadilan dan rahmat Islam dalam menghargai hak perempuan.',
    show: false,
  },
  {
    judul: 'QS. An-Nisa: 11',
    teks: 'Allah mewasiatkan kepada kalian tentang (pembagian warisan kepada) anak-anak kalian: bagian seorang anak laki-laki adalah dua kali bagian seorang anak perempuan...',
    syarah: 'Dasar hukum utama pembagian warisan kepada anak. Anak laki-laki mendapat dua bagian karena dalam Islam, laki-laki memikul tanggung jawab finansial keluarga, sementara perempuan dilindungi dan dinafkahi.',
    show: false,
  },
  {
    judul: 'QS. An-Nisa: 12',
    teks: 'Bagi kalian (para suami) setengah dari harta yang ditinggalkan istri kalian, jika mereka tidak mempunyai anak. Jika mereka mempunyai anak, maka bagi kalian seperempat dari harta yang ditinggalkan. Dan bagi para istri seperempat dari harta yang kalian tinggalkan, jika kalian tidak mempunyai anak. Jika kalian mempunyai anak, maka bagi mereka seperdelapan dari harta yang kalian tinggalkan...',
    syarah: 'Dalil pembagian bagian warisan bagi suami dan istri. Bagian warisan bergantung pada apakah pasangan memiliki keturunan atau tidak.',
    show: false,
  },
  {
    judul: 'QS. An-Nisa: 176',
    teks: 'Jika seseorang meninggal dunia dan ia tidak mempunyai anak, tetapi mempunyai saudara laki-laki atau perempuan, maka bagi masing-masing dari keduanya seperenam. Tetapi jika mereka lebih dari dua orang, maka mereka bersekutu dalam sepertiga...',
    syarah: 'Ayat ini menjelaskan pembagian warisan dalam kasus kalalah, yaitu pewaris tidak memiliki anak maupun ayah. Warisan bisa diberikan kepada saudara kandung (baik laki-laki maupun perempuan).',
    show: false,
  },
  {
    judul: 'HR. Abu Dawud, Tirmidzi, Ibnu Majah',
    teks: '"La washiyyata liwārith" — Tidak boleh ada wasiat untuk ahli waris.',
    syarah: 'Hadis ini menjadi dasar hukum bahwa seseorang tidak boleh memberikan wasiat kepada orang yang sudah termasuk ahli waris, agar tidak terjadi ketimpangan dan kecurangan dalam pembagian.',
    show: false,
  },
  {
    judul: 'Ijma’ (Konsensus Ulama)',
    teks: 'Para ulama sepakat bahwa jika seluruh bagian waris telah dibagikan dan masih ada sisa harta (radd), maka sisa itu dapat dikembalikan (radd) kepada para ahli waris yang sudah menerima bagian, sesuai proporsi.',
    syarah: 'Ijma’ adalah sumber hukum Islam yang kuat. Dalam konteks waris, radd terjadi jika tidak ada ahli waris ashabah yang dapat menerima sisa harta. Maka sisa dibagi proporsional kepada yang berhak.',
    show: false,
  },
  {
    judul: 'Qiyas (Analogis)',
    teks: 'Dalam beberapa kasus yang tidak disebutkan secara eksplisit dalam Al-Qur’an maupun Hadis, para ulama menggunakan qiyas untuk menetapkan hukum waris.',
    syarah: 'Contohnya, jika ditemukan kasus waris modern seperti anak tiri, bayi tabung, atau warisan digital, maka hukum ditetapkan berdasarkan qiyas terhadap hukum-hukum yang sudah ada.',
    show: false,
  },
])

function toggleDalil(index) {
  dalilList.value[index].show = !dalilList.value[index].show
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(number)
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
