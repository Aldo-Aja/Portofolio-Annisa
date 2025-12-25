import React from 'react'

const hardSkills = ['Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'Capcut', 'Microsoft Office']

const softSkills = ['Kerjasama Tim', 'Komunikasi', 'Organisasi', 'Public Speaking']

export default function SkillsSection() {
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
          <div>
            <h3 className="text-xl font-semibold text-[#222222] mb-4">
              Hard Skill
            </h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              {hardSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#E6B9C0]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#222222] mb-4">
              Soft Skill
            </h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              {softSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#E6B9C0]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF7F4] border border-[#E6B9C0]/30 rounded-3xl p-8 flex items-center">
            <p className="text-sm leading-relaxed text-[#666666]">
              Saya terbiasa bekerja dalam tim dan berkoordinasi dengan berbagai
              pihak untuk menyelesaikan sebuah project. Selain kemampuan teknis
              dalam mengoperasikan software desain dan editing, saya juga
              berusaha menjaga komunikasi yang baik, disiplin terhadap deadline,
              dan bertanggung jawab terhadap amanah yang diberikan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
