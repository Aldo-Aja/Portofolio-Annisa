import React, { useEffect, useState, useRef } from "react";
import { Instagram, X, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function PortfolioSection() {
  const [data, setData] = useState(null);
  const [activeReel, setActiveReel] = useState(null);
  const [showComic, setShowComic] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("portfolio_content")
      .select("content")
      .eq("section_name", "portfolio")
      .single()
      .then(({ data }) => {
        setData(data?.content);
        setLoading(false);
      });
  }, []);

  // Fungsi Helper: Menangani Play/Pause saat Hover
  const handleMouseEnter = (e) => {
    const vid = e.currentTarget;
    vid.muted = true; // Wajib mute agar browser mengizinkan autoplay
    vid.play().catch((error) => console.log("Play prevented:", error));
  };

  const handleMouseLeave = (e) => {
    const vid = e.currentTarget;
    vid.pause();
    vid.currentTime = 0; // Kembalikan ke detik awal
  };

  if (loading)
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin inline mr-2" />
        Loading Portfolio...
      </div>
    );
  if (!data) return null;

  return (
    <section id="portfolio" className="bg-white py-24">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h3 className="font-heading text-[60px] md:text-[90px] font-bold text-[#222222] mb-3">
            PORTOFOLIO
          </h3>
        </div>

        {/* 1. IG Content */}
        <div className="mb-16 grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#222222] mb-2">
              Feeds Instagram Content
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              Konten promosi dan dokumentasi. Saya berperan sebagai kameramen,
              talent, sekaligus editor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.ig_posts?.map((post, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => setActiveReel(post)}
                  className="group relative block w-full overflow-hidden rounded-3xl"
                >
                  {/* VIDEO ELEMENT DENGAN EVENT HANDLER */}
                  <video
                    src={post.video_url}
                    className="h-full w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
                    muted
                    playsInline
                    loop
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Overlay Gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* Label Hover */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center opacity-100 group-hover:opacity-0 transition-opacity">
                    <span className="text-xs font-semibold text-white px-3 bg-black/20 rounded-full py-1 backdrop-blur-sm">
                      {post.label}
                    </span>
                  </div>
                </button>
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-[#222222]">
                    {post.label}
                  </p>
                  <p className="text-[11px] text-[#666666] mb-2">{post.role}</p>
                  <a
                    href={post.reels_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-[#E1306C] flex items-center gap-1 hover:underline"
                  >
                    <Instagram size={12} /> Watch on Reels
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Videografi */}
        <div className="mb-16">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#222222]">Videografi</h3>
            <p className="font-script text-[32px] text-[#E6B9C0]">
              Short Video & Music Clip
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {data.video_projects?.map((video, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl bg-[#FAF7F4] shadow-soft hover:shadow-lg transition"
              >
                <button
                  onClick={() => setActiveReel(video)}
                  className="group relative block w-full overflow-hidden rounded-3xl"
                >
                  {/* VIDEO ELEMENT DENGAN EVENT HANDLER */}
                  <video
                    src={video.video_url}
                    className="h-full w-full aspect-video object-cover"
                    muted
                    playsInline
                    loop
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                    <span className="text-white text-xs font-bold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      Preview
                    </span>
                  </div>
                </button>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-[#222222]">
                    {video.label}
                  </p>
                  <p className="text-xs text-[#666666]">{video.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Digital Drawing */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#222222]">
              Digital Drawing
            </h3>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
            <div className="grid grid-cols-2 gap-4">
              {data.digital_characters?.map((char, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden hover:-translate-y-1 transition duration-300"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold">{char.name}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Comic */}
            {data.comic_strip && (
              <div className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden hover:shadow-xl transition">
                <button
                  onClick={() => setShowComic(true)}
                  className="block w-full group overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={data.comic_strip.image}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      alt="Comic"
                    />
                  </div>
                </button>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold">
                    {data.comic_strip.title}
                  </p>
                  <p className="text-xs text-[#666666]">
                    {data.comic_strip.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Packaging */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-[#222222] mb-4">
            Packaging
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {data.packaging?.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] overflow-hidden group">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    alt={item.title}
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-[#666666]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Fotografi */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#222222] mb-6">
            Fotografi
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {data.photos?.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(photo)}
                className="rounded-[32px] border-[10px] border-[#F4ECE6] bg-white shadow-soft overflow-hidden text-left hover:scale-[1.02] transition duration-300"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={photo.image}
                    className="h-full w-full object-cover"
                    alt={photo.title}
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-xs font-semibold">{photo.title}</p>
                  <p className="text-[11px] text-[#666666]">
                    {photo.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Video Player */}
      {activeReel && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-md bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 transition"
            >
              <X size={20} />
            </button>
            <video
              src={activeReel.video_url}
              controls
              autoPlay
              className={`w-full ${
                activeReel.orientation === "landscape"
                  ? "aspect-video"
                  : "aspect-[9/16]"
              } object-contain bg-black`}
            />
            <div className="bg-white p-4">
              <h4 className="font-bold text-gray-900">{activeReel.label}</h4>
              <p className="text-xs text-gray-500 mb-2">{activeReel.role}</p>
              {activeReel.reels_url && (
                <a
                  href={activeReel.reels_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#E1306C] hover:underline flex items-center gap-1"
                >
                  <Instagram size={14} /> Buka di Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Image Viewer */}
      {(showComic || activePhoto) && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => {
            setShowComic(false);
            setActivePhoto(null);
          }}
        >
          <button className="absolute top-5 right-5 text-white/70 hover:text-white">
            <X size={32} />
          </button>
          <img
            src={showComic ? data.comic_strip?.image : activePhoto?.image}
            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
          />
          {activePhoto && (
            <div className="absolute bottom-10 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
              {activePhoto.title}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
