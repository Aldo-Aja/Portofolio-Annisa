import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    supabase
      .from("portfolio_content")
      .select("content")
      .eq("section_name", "experience")
      .single()
      .then(({ data }) => {
        // Pastikan data content adalah array, jika tidak jadikan array kosong
        setExperiences(Array.isArray(data?.content) ? data.content : []);
      });
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="bg-[#F4ECE6] py-24">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#222222] mb-3">
            Pengalaman Organisasi
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="h-full rounded-3xl bg-white p-8 shadow-soft hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl text-[#222222] mb-1 font-semibold">
                {exp.title}
              </h3>
              <p className="text-sm font-medium text-[#E6B9C0] mb-1">
                {exp.organization}
              </p>
              <p className="text-xs text-[#666666] mb-4 font-mono">
                {exp.period}
              </p>

              <ul className="space-y-2 text-sm text-[#666666]">
                {exp.responsibilities?.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="mt-1.5 h-[4px] w-[4px] min-w-[4px] rounded-full bg-[#E6B9C0]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
