import React from "react";
import { Phone, Mail, Instagram } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="about" className="bg-[#F4ECE6] pt-28 pb-20">
      <div className="section-container grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#666666]">
            <span className="h-[2px] w-6 bg-[#E6B9C0]" />
            Halo, Annisa di sini
          </span>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#222222] leading-tight">
            Halo,
            <span className="block">Annisa di sini!</span>
          </h1>

          <p className="font-body text-base md:text-lg text-[#666666] leading-relaxed">
            Perkenalkan, saya{" "}
            <span className="font-semibold text-[#222222]">
              Annisa Furna Nazuwa
            </span>
            . Seorang pelajar yang sekarang bersekolah di SMK Prestasi Prima
            dengan{" "}
            <span className="font-semibold text-[#222222]">
              jurusan Desain Komunikasi Visual (DKV)
            </span>{" "}
            yang berada di Jakarta Timur.{" "}
            <span className="font-semibold text-[#222222]">
              Saya memiliki ketertarikan pada bidang Fotografi, Videografi,
              Content Creating, dan Desain Grafis.
            </span>{" "}
            Saya dapat mengoperasikan beberapa software editing dengan cukup
            baik.
          </p>

          <div className="font-body space-y-1 text-sm text-[#666666]">
            <p>• Mampu bekerja sama dan berkomunikasi dengan baik.</p>
            <p>• Mampu berkomitmen dan menjaga amanah yang diberikan.</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="button"
              onClick={() => scrollTo("portfolio")}
              className="rounded-full bg-[#222222] px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-black transition-colors"
            >
              Lihat Portofolio
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-[#222222] bg-transparent px-6 py-3 text-sm font-semibold text-[#222222] hover:bg-[#222222] hover:text-white transition-colors"
            >
              Kontak Saya
            </button>
          </div>
        </div>

        {/* Polaroid */}
        <div className="flex justify-center md:justify-end">
          <div className="relative rounded-[32px] border-[10px] border-[#F4ECE6] bg-white p-4 shadow-soft w-72 md:w-80">
            <div className="h-80 w-full rounded-3xl overflow-hidden">
              <img
                src="/img/FotoAnnisa.jpg"
                alt="Annisa Furna Nazuwa"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="font-serif text-lg font-semibold text-[#222222]">
                Annisa Furna Nazuwa
              </p>
              <p className="text-xs text-[#666666]">
                Student • Desain Komunikasi Visual
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <div className="mt-12 border-top border-[#E6B9C0]/40">
        <div className="section-container flex flex-wrap items-center gap-6 py-6 text-sm text-[#666666] border-t border-[#E6B9C0]/40">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-[#E6B9C0]" />
            <span>0878-4020-0900</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#E6B9C0]" />
            <span>annisafurna@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="h-4 w-4 text-[#E6B9C0]" />
            <span>@annisafrnz__</span>
          </div>
        </div>
      </div>
    </section>
  );
}
