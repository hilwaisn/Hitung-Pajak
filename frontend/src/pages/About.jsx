export function About() {
  return (
    <>
      <header className="bg-blue-500 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hitung Pajak</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/admin" className="hover:text-gray-200">Home</a></li>
              <li><a href="/" className="hover:text-gray-200">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">PPH 21: Pajak Penghasilan Pasal 21</h2>

          <p className="text-gray-700 mb-6">
            PPH 21 atau Pajak Penghasilan Pasal 21 adalah pajak penghasilan yang dikenakan pada penghasilan yang diterima oleh orang pribadi, seperti gaji, upah, honorarium, dan bentuk kompensasi lainnya. Pajak ini merupakan bagian penting dari sistem perpajakan di Indonesia dan diatur dalam Undang-Undang Pajak Penghasilan.
          </p>

          <h3 className="text-xl font-bold mb-4">Pengertian dan Ciri-ciri PPH 21:</h3>

          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>**Subjek Pajak:** PPH 21 dikenakan pada individu yang menerima penghasilan, baik Warga Negara Indonesia (WNI) maupun Warga Negara Asing (WNA) yang bekerja di Indonesia.</li>
            <li>**Objek Pajak:** Penghasilan yang dikenakan pajak meliputi:
              <ul className="list-disc pl-8 text-gray-700">
                <li>Gaji</li>
                <li>Upah</li>
                <li>Honorarium</li>
                <li>Tunjangan</li>
                <li>Pembayaran lain yang diterima dari pekerjaan atau jasa.</li>
              </ul>
            </li>
            <li>**Pemungut Pajak:** PPH 21 biasanya dipungut oleh pemberi kerja. Pemberi kerja bertanggung jawab untuk memotong pajak dari penghasilan karyawan dan menyetorkannya ke kas negara.</li>
            <li>**Tarif Pajak:** Tarif pajak PPH 21 bervariasi tergantung pada jumlah penghasilan kena pajak dan status perpajakan individu. Tarif ini bersifat progresif, artinya semakin tinggi penghasilan, semakin tinggi persentase pajaknya.</li>
            <li>**Penghitungan dan Pelaporan:** Penghitungan pajak PPH 21 dilakukan berdasarkan penghasilan bruto dikurangi dengan penghasilan tidak kena pajak (PTKP) dan potongan-potongan lain yang diatur. Pelaporan dan pembayaran pajak dilakukan secara bulanan dan tahunan.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Pentingnya PPH 21:</h3>

          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>**Keadilan:** Memastikan bahwa setiap individu membayar pajak sesuai dengan penghasilan yang mereka terima.</li>
            <li>**Pembiayaan Negara:** Membantu pemerintah dalam membiayai berbagai kebutuhan negara, seperti infrastruktur, pendidikan, dan kesehatan.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Kesimpulan:</h3>

          <p className="text-gray-700 mb-6">
            PPH 21 merupakan salah satu jenis pajak yang penting dalam sistem perpajakan Indonesia. Memahami pengertian, ciri-ciri, dan pentingnya PPH 21 dapat membantu individu dalam memenuhi kewajiban perpajakan mereka dan berkontribusi pada pembangunan negara.
          </p>
        </section>
      </main>

      <footer className="bg-blue-500 text-white py-4 px-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Hitung Pajak</p>
        </div>
      </footer>
    </>
  );
}

export default About;