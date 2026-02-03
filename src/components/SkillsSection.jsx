import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SkillsSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mengambil data baris 'skills' dari database
    supabase
      .from("portfolio_content")
      .select("content")
      .eq("section_name", "skills")
      .single()
      .then(({ data }) => setData(data?.content));
  }, []);

  if (!data) return null;

  return (
    <section id="skills" className="bg-white py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#222222] mb-3">
            My Personal Skill
          </h2>
          <p className="font-script text-[35px] text-[#E6B9C0]">
            Hard and Soft Skill
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Hard Skills */}
          <div>
            <h3 className="text-xl font-semibold text-[#222222] mb-4">
              Hard Skill
            </h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              {data.hard_skills?.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#E6B9C0]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-semibold text-[#222222] mb-4">
              Soft Skill
            </h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              {data.soft_skills?.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#E6B9C0]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description Box */}
          <div className="bg-[#FAF7F4] border border-[#E6B9C0]/30 rounded-3xl p-8 flex items-center shadow-sm">
            <p className="text-sm leading-relaxed text-[#666666]">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
