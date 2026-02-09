import React, { useEffect, useState } from "react";
import { Phone, Mail, Instagram, Download } from "lucide-react"; // Import ikon Download
import { supabase } from "../lib/supabaseClient";

export default function HeroSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase
      .from("portfolio_content")
      .select("content")
      .eq("section_name", "hero")
      .single()
      .then(({ data }) => setData(data?.content));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!data) return <div className="py-20 text-center">Loading Hero...</div>;

  return (
    <section id="about" className="bg-[#F4ECE6] pt-28 pb-20">
      <div className="section-container grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#666666]">
            <span className="h-[2px] w-6 bg-[#E6B9C0]" />
            Halo, Annisa di sini
          </span>

          <div
            className="font-serif text-4xl md:text-5xl font-bold text-[#222222] leading-tight [&>p]:mb-0 [&>p]:leading-tight"
            dangerouslySetInnerHTML={{ __html: data.name }}
          />

          <div
            className="font-body text-base md:text-lg text-[#666666] leading-relaxed [&>p]:mb-2"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="font-body space-y-1 text-sm text-[#666666]">
            <p>• Mampu bekerja sama dan berkomunikasi dengan baik.</p>
            <p>• Mampu berkomitmen dan menjaga amanah yang diberikan.</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollTo("portfolio")}
              className="rounded-full bg-[#222222] px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-black transition-colors"
            >
              Lihat Portofolio
            </button>

            {/* TOMBOL DOWNLOAD CV DINAMIS */}
            {data.cv_url ? (
              <a
                href={data.cv_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#222222] bg-transparent px-6 py-3 text-sm font-semibold text-[#222222] hover:bg-[#222222] hover:text-white transition-colors"
              >
                <Download size={16} /> Download CV
              </a>
            ) : (
              // Fallback jika CV belum diupload
              <button
                onClick={() => scrollTo("contact")}
                className="rounded-full border border-[#222222] bg-transparent px-6 py-3 text-sm font-semibold text-[#222222] hover:bg-[#222222] hover:text-white transition-colors"
              >
                Kontak Saya
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative rounded-[32px] border-[10px] border-[#F4ECE6] bg-white p-4 shadow-soft w-72 md:w-80">
            <div className="h-80 w-full rounded-3xl overflow-hidden">
              <img
                src={data.image_url}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-serif text-lg font-semibold text-[#222222]">
                Annisa Furna Nazuwa
              </p>
              <p className="text-xs text-[#666666]">{data.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-[#E6B9C0]/40">
        <div className="section-container flex flex-wrap items-center gap-6 py-6 text-sm text-[#666666]">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-[#E6B9C0]" />
            <span>{data.contacts?.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#E6B9C0]" />
            <span>{data.contacts?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="h-4 w-4 text-[#E6B9C0]" />
            <span>{data.contacts?.instagram}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
