import React from "react";
import { Mail, Phone, Instagram } from "lucide-react";

export default function ContactFooter() {
  // Biar gampang reuse mailto
  const mailto = `mailto:annisafurna@gmail.com?subject=${encodeURIComponent(
    "Kolaborasi / Project Desain"
  )}&body=${encodeURIComponent(
    `Halo Annisa,

Saya tertarik untuk bekerja sama / menawarkan kesempatan terkait:
- (contoh: project desain grafis / videografi / fotografi / content creation)

Silakan balas email ini atau hubungi saya di:
Nama:
Perusahaan/Instansi:
Kontak (WhatsApp/Telepon):

Terima kasih.`
  )}`;

  return (
    <footer id="contact" className="bg-[#222222] text-white pt-16 pb-8 mt-8">
      <div className="section-container grid gap-10 md:grid-cols-3">
        {/* Intro */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Terima kasih sudah melihat portofolio saya ✨
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Saya terbuka untuk kesempatan magang, freelance project, maupun
            kolaborasi di bidang desain grafis, fotografi, videografi, dan
            content creation.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#E6B9C0]" />
              {/* kalau mau langsung ke WA bisa ganti href ke wa.me */}
              <a
                href="https://wa.me/6287840200900"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                0878-4020-0900
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#E6B9C0]" />
              {/* jadikan email clickable */}
              <a href={mailto} className="hover:underline">
                annisafurna@gmail.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-[#E6B9C0]" />
              <a
                href="https://www.instagram.com/annisafrnz__"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @annisafrnz__
              </a>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-base font-semibold mb-3">Arah berikutnya</h3>
          <p className="text-sm text-gray-300 mb-4">
            Jika tertarik bekerja sama, Anda bisa menghubungi saya melalui
            WhatsApp atau email. CV dan portofolio lengkap dapat saya kirimkan
            sesuai kebutuhan.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#222222] hover:bg-[#F4ECE6] transition-colors"
            >
              Download CV
            </a>
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded-full border border-gray-400 px-5 py-2.5 text-xs font-semibold text-gray-100 hover:bg-white/10 transition-colors"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/10">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Annisa Furna Nazuwa. All rights
            reserved.
          </p>
          <p className="text-[11px] text-gray-500">
            Design &amp; code by Someone
          </p>
        </div>
      </div>
    </footer>
  );
}
