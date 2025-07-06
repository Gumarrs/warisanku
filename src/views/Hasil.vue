

<template>
  <div class="min-h-screen bg-gray-100 p-4 text-gray-800">
    <!-- ✅ Area yang akan di-export ke PDF -->
    <div ref="printArea" class="space-y-4 printArea">

      <!-- 📘 Cover Page -->
      <div class="bg-white p-4 rounded-xl shadow text-center">
        <h1 class="text-xl font-bold text-green-800">Laporan Pembagian Waris</h1>
        <p class="mt-1 text-sm">Berdasarkan Syariat Islam</p>
        <p class="mt-1 text-xs text-gray-500">Tanggal: {{ new Date().toLocaleDateString('id-ID') }}</p>
        <p class="mt-2 text-xs text-gray-400 italic">Dokumen ini disusun untuk edukasi dan kemudahan memahami hukum waris Islam</p>
      </div>

      <!-- 📋 Ringkasan -->
      <div class="bg-white rounded-xl shadow p-4 break-inside-avoid">
        <h2 class="text-base font-semibold mb-1 text-green-700">Ringkasan Pewaris</h2>
        <ul class="space-y-1 text-sm">
          <li><strong>Total Harta:</strong> Rp {{ format(pewaris.harta) }}</li>
          <li><strong>Utang:</strong> Rp {{ format(pewaris.utang) }}</li>
          <li><strong>Wasiat:</strong> Rp {{ format(pewaris.wasiat) }}</li>
          <li><strong>Sisa Warisan:</strong> Rp {{ format(sisaWarisan) }}</li>
        </ul>
      </div>

      <!-- 📑 Hasil Pembagian -->
      <div class="bg-white rounded-xl shadow p-4 break-inside-avoid">
        <h2 class="text-base font-semibold mb-2 text-green-700">Pembagian Ahli Waris</h2>
        <transition name="fade">
          <div v-if="hasil.length > 0" class="overflow-x-auto">
            <table class="table-auto w-full text-left text-sm">
              <thead>
                <tr class="bg-green-100 text-green-900">
                  <th class="p-2">Ahli Waris</th>
                  <th class="p-2">Bagian</th>
                  <th class="p-2">Jumlah</th>
                  <th class="p-2">Total (Rp)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in hasil" :key="index" class="border-t hover:bg-gray-50">
                  <td class="p-2 capitalize">{{ row.jenis.replace('_', ' ') }}</td>
                  <td class="p-2">
                    <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-full shadow-sm font-semibold">
                      {{ row.bagianText }}
                    </span>
                  </td>
                  <td class="p-2">{{ row.jumlah }}</td>
                  <td class="p-2">Rp {{ format(row.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
        <div v-if="hasil.length === 1 && hasil[0].bagianText.includes('Radd')" class="text-sm text-yellow-700 mt-1">
          ⚠️ Karena tidak ada ahli waris lain, maka sisa harta dikembalikan (radd) kepada istri/suami sesuai hukum Islam.
        </div>
        <div v-else-if="hasil.length === 0" class="text-red-500 mt-1">Data tidak ditemukan atau belum lengkap.</div>
      </div>

      <!-- 📚 Dalil Ringkas -->
      <div class="bg-white rounded-xl shadow p-4 break-inside-avoid">
        <h2 class="text-base font-bold text-green-700 mb-2">📚 Dalil-dalil Syariat Pembagian Waris</h2>
        <ul class="text-sm space-y-1 text-gray-700 list-disc list-inside">
          <li><strong>QS. An-Nisa: 11</strong> – Anak laki-laki mendapat dua bagian anak perempuan.</li>
          <li><strong>QS. An-Nisa: 12</strong> – Suami/istri mendapat bagian berbeda tergantung ada tidaknya anak.</li>
          <li><strong>QS. An-Nisa: 176</strong> – Pembagian untuk saudara kandung jika pewaris tidak punya anak dan orang tua.</li>
          <li><strong>HR. Abu Dawud, Tirmidzi</strong> – Tidak boleh berwasiat kepada ahli waris (la washiyyata liwarits).</li>
          <li><strong>Ijma’ & Qiyas</strong> – Sisa harta (radd) dapat dikembalikan ke ahli waris jika tidak ada yang lain.</li>
        </ul>
      </div>

<!-- 🖊️ Tanda Tangan -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="grid grid-cols-2 gap-8 text-sm text-gray-700 text-center mt-8">
          <div>
            <p>Mengetahui,</p>
            <p class="mt-16 font-semibold">Ahli Waris</p>
          </div>
          <div>
            <p>Disusun Oleh,</p>
            <p class="mt-16 font-semibold">____________________</p>
          </div>
        </div>
      </div>

    </div>

    <!-- 🧾 Tombol -->
    <div class="text-center mt-4 space-x-2">
      <button @click="downloadPDF" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg">
        Export ke PDF
      </button>
      <button @click="resetData" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
        Ulangi Perhitungan
      </button>
    </div>
  </div>
</template>




<script setup>



import { useRouter } from 'vue-router'
import html2pdf from 'html2pdf.js'
import { ref, onMounted } from 'vue'

const router = useRouter()

function resetData() {
  localStorage.removeItem('pewaris')
  localStorage.removeItem('ahliwaris')
  router.push({ name: 'home' }) // ✅ navigasi ke halaman Home.vue
}
const printArea = ref(null)
const pewaris = ref({})
const ahliwaris = ref({})
const sisaWarisan = ref(0)
const hasil = ref([])

onMounted(() => {
  pewaris.value = JSON.parse(localStorage.getItem('pewaris')) || {}
  ahliwaris.value = JSON.parse(localStorage.getItem('ahliwaris')) || {}
  hitungWarisan()
})

function format(value) {
  return Number(value || 0).toLocaleString('id-ID')
}

function downloadPDF() {
  const element = printArea.value
  const opt = {
    margin: 0.5,
    filename: 'hasil-pembagian-waris.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }
  html2pdf().set(opt).from(element).save()
}

function hitungWarisan() {
  const total = Number(pewaris.value.harta || 0)
  const utang = Number(pewaris.value.utang || 0)
  const wasiat = Number(pewaris.value.wasiat || 0)

  const maxWasiat = total / 3
  const wasiatValid = Math.min(wasiat, maxWasiat)
  const sisa = total - utang - wasiatValid
  sisaWarisan.value = sisa

  const bagian = []
  const anakL = ahliwaris.value.anak_laki || 0
  const anakP = ahliwaris.value.anak_perempuan || 0
  const hasAnak = (anakL + anakP) > 0
  const hasSaudara = (ahliwaris.value.saudara_laki || 0) + (ahliwaris.value.saudara_perempuan || 0) > 0

  if (ahliwaris.value.ibu > 0) {
    let fraksi = 1 / 3
    if (hasAnak || hasSaudara) fraksi = 1 / 6
    bagian.push({
      jenis: 'ibu',
      jumlah: ahliwaris.value.ibu,
      bagianText: `${fraksi === 1/6 ? '1/6' : '1/3'}`,
      total: sisa * fraksi
    })
  }

  if (ahliwaris.value.ayah > 0) {
    if (hasAnak) {
      bagian.push({
        jenis: 'ayah',
        jumlah: ahliwaris.value.ayah,
        bagianText: '1/6',
        total: sisa * (1 / 6),
      })
    } else {
      bagian.push({
        jenis: 'ayah',
        jumlah: ahliwaris.value.ayah,
        bagianText: 'Ashabah (sisa)',
        total: 0,
      })
    }
  }

  if (ahliwaris.value.istri > 0) {
    const fraksi = hasAnak ? 1 / 8 : 1 / 4
    bagian.push({
      jenis: 'istri',
      jumlah: ahliwaris.value.istri,
      bagianText: hasAnak ? '1/8' : '1/4',
      total: sisa * fraksi,
    })
  }

  if (ahliwaris.value.suami > 0) {
    const fraksi = hasAnak ? 1 / 4 : 1 / 2
    bagian.push({
      jenis: 'suami',
      jumlah: ahliwaris.value.suami,
      bagianText: hasAnak ? '1/4' : '1/2',
      total: sisa * fraksi,
    })
  }

  const totalBagianAnak = (anakL * 2) + (anakP * 1)
  if (totalBagianAnak > 0) {
    const sisaAnak = sisa - bagian.reduce((acc, cur) => acc + cur.total, 0)
    const perBagian = sisaAnak / totalBagianAnak
    if (anakL > 0) {
      bagian.push({
        jenis: 'anak_laki',
        jumlah: anakL,
        bagianText: '2 bagian',
        total: anakL * perBagian * 2,
      })
    }
    if (anakP > 0) {
      bagian.push({
        jenis: 'anak_perempuan',
        jumlah: anakP,
        bagianText: '1 bagian',
        total: anakP * perBagian,
      })
    }
  }

  if (!hasAnak && ahliwaris.value.ayah > 0) {
    const totalDibagikan = bagian.reduce((acc, cur) => acc + cur.total, 0)
    const sisaAshabah = sisa - totalDibagikan
    const ayahRow = bagian.find(x => x.jenis === 'ayah' && x.bagianText === 'Ashabah (sisa)')
    if (ayahRow) {
      ayahRow.total = sisaAshabah
    }
  }

  if (!hasAnak && ahliwaris.value.ayah === 0) {
    const sisaSdr = sisa - bagian.reduce((acc, cur) => acc + cur.total, 0)
    const sdrL = ahliwaris.value.saudara_laki || 0
    const sdrP = ahliwaris.value.saudara_perempuan || 0
    const totalBagian = (sdrL * 2) + (sdrP * 1)
    if (totalBagian > 0) {
      const perBagian = sisaSdr / totalBagian
      if (sdrL > 0) {
        bagian.push({
          jenis: 'saudara_laki',
          jumlah: sdrL,
          bagianText: '2 bagian',
          total: sdrL * perBagian * 2,
        })
      }
      if (sdrP > 0) {
        bagian.push({
          jenis: 'saudara_perempuan',
          jumlah: sdrP,
          bagianText: '1 bagian',
          total: sdrP * perBagian,
        })
      }
    }
  }

  hasil.value = bagian

 const totalDibagi = bagian.reduce((acc, cur) => acc + cur.total, 0)
const sisaRadd = sisa - totalDibagi

// Cek kondisi 'hanya satu ahli waris'
const hanyaIbu = ahliwaris.value.ibu > 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  (anakL + anakP === 0) &&
  (ahliwaris.value.saudara_laki || 0) === 0 &&
  (ahliwaris.value.saudara_perempuan || 0) === 0

const hanyaAyah = ahliwaris.value.ayah > 0 &&
  ahliwaris.value.ibu === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  (anakL + anakP === 0) &&
  (ahliwaris.value.saudara_laki || 0) === 0 &&
  (ahliwaris.value.saudara_perempuan || 0) === 0

const hanyaIstri = ahliwaris.value.istri > 0 &&
  ahliwaris.value.suami === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.ibu === 0 &&
  (anakL + anakP === 0) &&
  !hasSaudara

const hanyaSuami = ahliwaris.value.suami > 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.ibu === 0 &&
  (anakL + anakP === 0) &&
  !hasSaudara

const hanyaAnakLaki = anakL > 0 && anakP === 0 &&
  ahliwaris.value.ibu === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  !hasSaudara

const hanyaAnakPerempuan = anakP > 0 && anakL === 0 &&
  ahliwaris.value.ibu === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  !hasSaudara

const hanyaSaudaraLaki = (ahliwaris.value.saudara_laki || 0) > 0 &&
  (ahliwaris.value.saudara_perempuan || 0) === 0 &&
  ahliwaris.value.ibu === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  anakL === 0 && anakP === 0

const hanyaSaudaraPerempuan = (ahliwaris.value.saudara_perempuan || 0) > 0 &&
  (ahliwaris.value.saudara_laki || 0) === 0 &&
  ahliwaris.value.ibu === 0 &&
  ahliwaris.value.ayah === 0 &&
  ahliwaris.value.istri === 0 &&
  ahliwaris.value.suami === 0 &&
  anakL === 0 && anakP === 0

// Berikan sisa harta (radd) ke ahli waris tunggal yang sah
if (sisaRadd > 0) {
  if (hanyaIbu) {
    const row = bagian.find(x => x.jenis === 'ibu')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaAyah) {
    const row = bagian.find(x => x.jenis === 'ayah')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaIstri) {
    const row = bagian.find(x => x.jenis === 'istri')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaSuami) {
    const row = bagian.find(x => x.jenis === 'suami')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaAnakLaki) {
    const row = bagian.find(x => x.jenis === 'anak_laki')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaAnakPerempuan) {
    const row = bagian.find(x => x.jenis === 'anak_perempuan')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaSaudaraLaki) {
    const row = bagian.find(x => x.jenis === 'saudara_laki')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }

  if (hanyaSaudaraPerempuan) {
    const row = bagian.find(x => x.jenis === 'saudara_perempuan')
    if (row) {
      row.bagianText += ' + Radd'
      row.total += sisaRadd
    }
  }
}


}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>

