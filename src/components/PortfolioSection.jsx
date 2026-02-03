import React, { useEffect, useState } from "react";
import { Instagram, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function PortfolioSection() {
  const [data, setData] = useState(null);
  const [activeReel, setActiveReel] = useState(null);
  const [showComic, setShowComic] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    supabase
      .from("portfolio_content")
      .select("content")
      .eq("section_name", "portfolio")
      .single()
      .then(({ data }) => setData(data?.content));
  }, []);

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
                  <video
                    src={post.video_url}
                    className="h-full w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center opacity-100 group-hover:opacity-0 transition-opacity">
                    <span className="text-xs font-semibold text-white px-3">
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
                    className="text-[11px] font-semibold text-[#E1306C] flex items-center gap-1"
                  >
                    <Instagram size={12} /> Watch
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
                className="overflow-hidden rounded-3xl bg-[#FAF7F4] shadow-soft"
              >
                <button
                  onClick={() => setActiveReel(video)}
                  className="group relative block w-full overflow-hidden rounded-3xl"
                >
                  <video
                    src={video.video_url}
                    className="h-full w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition" />
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
                  className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden"
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
              <div className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden">
                <button
                  onClick={() => setShowComic(true)}
                  className="block w-full"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={data.comic_strip.image}
                      className="h-full w-full object-cover"
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
                className="rounded-3xl bg-[#FAF7F4] shadow-soft overflow-hidden"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover"
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
                className="rounded-[32px] border-[10px] border-[#F4ECE6] bg-white shadow-soft overflow-hidden text-left"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={photo.image}
                    className="h-full w-full object-cover"
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

      {/* Modal Video */}
      {activeReel && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-md bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1"
            >
              <X size={20} />
            </button>
            <video
              src={activeReel.video_url}
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh]"
            />
            <div className="bg-white p-4">
              <h4 className="font-bold">{activeReel.label}</h4>
              <p className="text-xs text-gray-500">{activeReel.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Gambar (Comic/Photo) */}
      {(showComic || activePhoto) && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => {
            setShowComic(false);
            setActivePhoto(null);
          }}
        >
          <img
            src={showComic ? data.comic_strip?.image : activePhoto?.image}
            className="max-h-[90vh] max-w-full rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
