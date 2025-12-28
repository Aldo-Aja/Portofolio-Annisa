import React, { useState } from "react";
import { Instagram, Play, ExternalLink, X } from "lucide-react";

const igPosts = [
  {
    label: "PPDB Promotion",
    role: "Kameramen & Talent",
    reelsUrl: "https://www.instagram.com/reels/DF5V2RiPjgT/",
    video: "/video/ig/ppdb-promotion.mp4",
    teaserDuration: 4,
    orientation: "portrait",
  },
  {
    label: "PPDB Content",
    role: "Kameramen",
    reelsUrl: "https://www.instagram.com/reels/DKdTaeHh9Bj/",
    video: "/video/ig/ppdb-content.mp4",
    teaserDuration: 4,
    orientation: "portrait",
  },
  {
    label: "DBL Content",
    role: "Kameramen",
    reelsUrl: "https://www.instagram.com/reels/DOoJtUgDyIz/",
    video: "/video/ig/dbl-content.mov",
    teaserDuration: 4,
    orientation: "portrait",
  },
  {
    label: "DBL Content",
    role: "Kameramen & Editor",
    reelsUrl: "https://www.instagram.com/reels/DPQ17jpj8Za/",
    video: "/video/ig/dbl-editor.mov",
    teaserDuration: 4,
    orientation: "portrait",
  },
];


const videoProjects = [
  {
    label: "Short Video Clip – Ribuan Memori",
    role: "Editor & Kameramen",
    reelsUrl: "https://www.instagram.com/reel/DSrPqPeEsce/",
    video: "/video/vidgraf/ribuanmemori.mov",
    teaserDuration: 4,
    orientation:"landscape",
  },
  {
    label: "Short Music Video Remake",
    role: "Editor",
    reelsUrl: "https://www.instagram.com/reels/DGaaLwrvF6M/",
    video: "/video/vidgraf/blue.mp4",
    teaserDuration: 4,
    orientation:"landscape",
  },
];


const digitalCharacters = [
  "Character 01",
  "Character 02",
  "Character 03",
  "Character 04",
];

const comicStrip = {
  title: "Comic Strip – Original Story",
};

const packaging = [
  {
    title: "3D Packaging – Product Concept 01",
    image: "/img/Packaging1.png",
    description:
      "Packaging untuk kue yang memiliki bungkus tersendiri.",
  },
  {
    title: "3D Packaging – Product Concept 02",
    image: "/img/Packaging2.png",
    description:
      "Jenis packaging kue bertemakan nusantara.",
  },
];


const photos = [
  {
    title: "Portrait Session 01",
    image: "/img/Photo1.jpeg",
    description:
      "Foto dengan menggunakan aksen dua warna.",
  },
  {
    title: "Portrait Session 02",
    image: "/img/Photo2.jpeg",
    description:
      "Foto dengan aksen warna dingin.",
  },
  {
    title: "Portrait Session 03",
    image: "/img/Photo3.jpeg",
    description:
      "Foto dengan aksen warna panas.",
  },
];


export default function PortfolioSection() {
  const [activeReel, setActiveReel] = useState(null);
  const [showComic, setShowComic] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h3 className="font-heading text-[90px] font-bold text-[#222222] mb-3">
            PORTOFOLIO
          </h3>
        </div>

        {/* IG Content */}
        <div className="mb-16 grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Feeds Instagram Content
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              Konten ini mencakup promosi PPDB serta dokumentasi DBL. Saya
              berperan sebagai kameramen, talent, sekaligus editor untuk
              menyesuaikan gaya visual dengan identitas sekolah dan platform
              Instagram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {igPosts.map((post) => (
              <div
                key={post.label + post.role}
                className="overflow-hidden rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setActiveReel(post)}
                  className="group relative block w-full overflow-hidden rounded-3xl"
                >
                  <video
                    src={post.video}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const v = e.currentTarget;
                      v.currentTime = 0; // mulai dari awal
                      v.muted = true;
                      v.play().catch(() => {}); // kalau browser rewel, jangan error
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget;
                      v.pause();
                      v.currentTime = 0; // balik ke frame awal
                    }}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.currentTime >= post.teaserDuration) {
                        v.currentTime = 0; // loop hanya 0–teaserDuration
                      }
                    }}
                  />

                  {/* Layer gradient tetap ada */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* Layer teks yang hilang saat hover */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white px-3">
                      {post.label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#E1306C] shadow">
                      Hover to preview
                    </span>
                  </div>
                </button>

                {/* Caption bawah + Watch on Reels */}
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#222222]">
                    {post.label}
                  </p>
                  <p className="text-[11px] text-[#666666] mb-2">{post.role}</p>

                  <a
                    href={post.reelsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E1306C] hover:text-[#c1275a]"
                  >
                    <Instagram className="h-3 w-3" />
                    Watch on Reels
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videografi */}
        <div className="mb-16">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Videografi
            </h3>
            <p className="font-script text-[32px] text-[#E6B9C0]">
              Short Video & Music Clip
            </p>
            <p className="mt-2 text-sm text-[#666666] max-w-xl">
              Beberapa project video pendek yang saya kerjakan sebagai editor
              maupun kameramen, termasuk video musik dan video kenangan singkat.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {videoProjects.map((video) => (
              <div
                key={video.label + video.role}
                className="overflow-hidden rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition-shadow"
              >
                {/* Area video teaser (hover play, click = buka modal) */}
                <button
                  type="button"
                  onClick={() => setActiveReel(video)}
                  className="group relative block w-full overflow-hidden rounded-3xl"
                >
                  <video
                    src={video.video}
                    playsInline
                    preload="metadata"
                    muted
                    className="h-full w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const v = e.currentTarget;
                      v.currentTime = 0;
                      v.muted = true;
                      v.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget;
                      v.pause();
                      v.currentTime = 0;
                    }}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.currentTime >= video.teaserDuration) {
                        v.currentTime = 0;
                      }
                    }}
                  />

                  {/* gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* teks hilang saat hover */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white px-3">
                      {video.label}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#E6B9C0] shadow">
                      Hover to preview
                    </span>
                  </div>
                </button>

                {/* Caption bawah + Watch on Reels */}
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-[#222222] mb-1">
                    {video.label}
                  </p>
                  <p className="text-xs text-[#666666] mb-2">
                    Peran: {video.role}
                  </p>
                  <a
                    href={video.reelsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E6B9C0] hover:text-[#d08aa0]"
                  >
                    <Instagram className="h-3 w-3" />
                    Watch on Reels
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Drawing */}
        <div className="mb-16">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Digital Drawing
            </h3>
            <p className="font-script text-[38px] text-[#E6B9C0]">
              Characters & Comic Strip
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
            {/* Characters */}
            <div className="grid grid-cols-2 gap-4">
              {digitalCharacters.map((name, index) => (
                <div
                  key={name}
                  className="rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={`/img/Char${index + 1}.png`}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#222222]">
                      {name}
                    </p>
                    <p className="text-[11px] text-[#666666]">
                      Original character illustration
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comic Strip */}
            <div className="rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition overflow-hidden">
              <button
                type="button"
                onClick={() => setShowComic(true)}
                className="block w-full"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/img/Comic.png"
                    alt={comicStrip.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </button>
              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-[#222222] mb-1">
                  {comicStrip.title}
                </p>
                <p className="text-xs text-[#666666]">
                  Comic strip dengan karakter dan alur cerita orisinal yang
                  menggambarkan ekspresi dan emosi tokoh.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Packaging */}
        <div className="mb-16">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Packaging
            </h3>
            <p className="font-script text-[35px] text-[#E6B9C0]">
              3D Packaging
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {packaging.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Frame gambar */}
                <div className="aspect-[4/3] overflow-hidden transform-gpu transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Teks bawah */}
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-[#222222] mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#666666]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fotografi */}
        <div className="mb-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Fotografi
            </h3>
            <p className="font-script text-[24px] text-[#E6B9C0]">Person</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {photos.map((photo) => (
              <button
                key={photo.title}
                type="button"
                onClick={() => setActivePhoto(photo)}
                className="rounded-[32px] border-[10px] border-[#F4ECE6] bg-white shadow-soft hover:shadow-xl transition-shadow overflow-hidden text-left group"
              >
                <div className="aspect-[3/4] overflow-hidden transform-gpu transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-[#222222]">
                    {photo.title}
                  </p>
                  <p className="text-[11px] text-[#666666]">
                    Portrait photography
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeReel && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4"
          onClick={() => setActiveReel(null)}
        >
          <div
            className={
              "relative w-full rounded-3xl bg-white shadow-soft overflow-hidden " +
              (activeReel.orientation === "landscape"
                ? "max-w-3xl"
                : "max-w-[420px] md:max-w-[480px]")
            }
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              type="button"
              onClick={() => setActiveReel(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Video: beda aspect tergantung orientation */}
            <div
              className={
                "bg-black flex items-center justify-center " +
                (activeReel.orientation === "landscape"
                  ? "aspect-video"
                  : "aspect-[9/16]")
              }
            >
              <video
                src={activeReel.video}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info bawah modal */}
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-[#222222]">
                {activeReel.label}
              </p>
              <p className="text-[11px] text-[#666666] mb-2">
                Peran: {activeReel.role}
              </p>

              <a
                href={activeReel.reelsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E1306C] hover:text-[#c1275a]"
              >
                <Instagram className="h-3 w-3" />
                Lihat Reels di Instagram
              </a>
            </div>
          </div>
        </div>
      )}

      {showComic && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4"
          onClick={() => setShowComic(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white shadow-soft overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              type="button"
              onClick={() => setShowComic(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Gambar comic full */}
            <div className="max-h-[80vh] bg-[#111] flex items-center justify-center">
              <img
                src="/img/Comic.png"
                alt={comicStrip.title}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>

            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-[#222222]">
                {comicStrip.title}
              </p>
              <p className="text-[11px] text-[#666666]">
                Tampilan penuh comic strip untuk melihat detail panel dan
                ekspresi karakter.
              </p>
            </div>
          </div>
        </div>
      )}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white shadow-soft overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Foto besar */}
            <div className="max-h-[80vh] bg-[#111] flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>

            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-[#222222]">
                {activePhoto.title}
              </p>
              <p className="text-[11px] text-[#666666]">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
