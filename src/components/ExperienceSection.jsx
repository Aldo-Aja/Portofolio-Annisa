import React from 'react'

const experiences = [
  {
    title: "Sekretaris Umum OSIS",
    organization: "SMP Nassa School",
    period: "2022 – 2023",
    responsibilities: [
      "Membantu ketua dalam mengawasi kinerja OSIS dan menjalankan program kerja",
      "Menyusun dan mengelola administrasi organisasi",
      "Menyiarkan, mendistribusikan, dan menyimpan surat serta arsip kegiatan",
      "Bertindak sebagai notulis dalam rapat dan kegiatan resmi",
    ],
  },
  {
    title: "Volunteer Green Competition",
    organization: "Kegiatan Lingkungan",
    period: "2023",
    responsibilities: [
      "Membantu persiapan teknis dan dekorasi area kegiatan",
      "Mengarahkan peserta dan memberikan informasi kepada pengunjung",
      "Mendokumentasikan momen kegiatan untuk kebutuhan publikasi",
      "Berkoordinasi dengan panitia lain agar acara berjalan lancar",
    ],
  },
  {
    title: "Sekretaris OSIS",
    organization: "SMK Prestasi Prima",
    period: "2024 – Sekarang",
    responsibilities: [
      "Mendampingi Ketua dan Wakil Ketua dalam pengelolaan administrasi OSIS",
      "Menyusun notulen dan laporan kegiatan",
      "Membuat dan mengarsipkan surat serta proposal kegiatan",
      "Ikut terlibat dalam perencanaan dan evaluasi program kerja OSIS",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#F4ECE6] py-24">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#222222] mb-3">Pengalaman Organisasi</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="h-full rounded-3xl bg-white p-8 shadow-soft hover:-translate-y-1 hover:shadow-xl transition"
            >
              <h3 className="text-xl text-[#222222] mb-1">{exp.title}</h3>
              <p className="text-sm font-medium text-[#E6B9C0] mb-1">{exp.organization}</p>
              <p className="text-xs text-[#666666] mb-4">{exp.period}</p>
              <ul className="space-y-2 text-sm text-[#666666]">
                {exp.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-[3px] w-4 rounded-full bg-[#E6B9C0]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
