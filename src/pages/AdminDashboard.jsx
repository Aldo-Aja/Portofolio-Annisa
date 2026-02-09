import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Save, LogOut, Upload, Plus, Trash2, Loader2, Image as ImageIcon, Video, Briefcase, User, PenTool, Layout, Type, Bold, Italic, Menu, X, FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// --- CONFIG QUILL ---
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'header': [1, 2, 3, false] }],
    ['clean']
  ],
};

// --- KOMPONEN: UNIVERSAL UPLOADER (IMAGE/VIDEO/PDF) ---
const MediaUploader = ({ currentUrl, onUpload, label, type = "image" }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      // Validasi Ukuran (Max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        alert("File terlalu besar! Maksimal 20MB.");
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-images") // Pastikan bucket ini public
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filePath);
      onUpload(data.publicUrl);
    } catch (error) {
      alert("Gagal upload: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-500 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        {/* PREVIEW LOGIC */}
        {currentUrl && type === "image" && (
          <img src={currentUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover border bg-gray-50 shadow-sm" />
        )}
        {currentUrl && type === "video" && (
          <video src={currentUrl} className="w-24 h-16 rounded-lg object-cover border bg-black shadow-sm" muted />
        )}
        {currentUrl && type === "document" && (
          <div className="w-16 h-16 rounded-lg border bg-gray-50 flex items-center justify-center text-red-500 shadow-sm">
             <FileText size={24} />
          </div>
        )}

        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50 shadow-sm transition active:scale-95">
          {uploading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : type === "video" ? (
            <Video size={16} />
          ) : type === "document" ? (
            <FileText size={16} />
          ) : (
            <ImageIcon size={16} />
          )}
          <span className="font-medium">
            {uploading ? "..." : currentUrl ? "Ganti File" : "Upload File"}
          </span>
          <input
            type="file"
            className="hidden"
            accept={type === "video" ? "video/*" : type === "document" ? "application/pdf" : "image/*"}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
      {currentUrl && (
        <a href={currentUrl} target="_blank" rel="noreferrer" className="mt-1 text-[10px] text-blue-500 hover:underline truncate max-w-[200px] block">
          Lihat File Saat Ini
        </a>
      )}
    </div>
  );
};

// --- KOMPONEN LIST EDITORS (Tetap Sama) ---
const StringListEditor = ({ title, items, onChange }) => (
  <div className="bg-gray-50 p-4 rounded-xl border mb-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-sm text-gray-700">{title}</h3>
      <button onClick={() => onChange([...(items || []), "Baru"])} className="text-xs bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gray-800">
        <Plus size={12}/> Tambah
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items?.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input className="flex-1 p-2.5 border rounded-lg text-sm focus:border-black outline-none shadow-sm" value={item} onChange={e => {const newItems = [...items]; newItems[idx] = e.target.value; onChange(newItems);}} />
          <button onClick={() => onChange(items.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"><Trash2 size={18}/></button>
        </div>
      ))}
    </div>
  </div>
);

const DynamicListEditor = ({ title, items, onChange, schema }) => {
  const addItem = () => {
    const newItem = {};
    schema.forEach(field => newItem[field.key] = field.type === 'array' ? [] : '');
    onChange([...(items || []), newItem]);
  };
  const updateItem = (idx, key, val) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [key]: val };
    onChange(newItems);
  };
  const removeItem = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-xl border mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
        <button onClick={addItem} className="text-xs bg-black text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-800 shadow-sm active:scale-95 transition">
          <Plus size={14}/> Item Baru
        </button>
      </div>
      <div className="space-y-4">
        {items?.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border shadow-sm relative group">
            <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition p-2"><Trash2 size={18}/></button>
            <div className="grid gap-4 md:grid-cols-2 pr-0 md:pr-8 pt-4 md:pt-0">
              {schema.map((field) => (
                <div key={field.key} className={field.type === 'textarea' || field.type === 'array' ? 'col-span-1 md:col-span-2' : 'col-span-1'}>
                  {field.type === 'media' ? (
                    <MediaUploader label={field.label} currentUrl={item[field.key]} type={field.mediaType || 'image'} onUpload={(url) => updateItem(idx, field.key, url)} />
                  ) : field.type === 'array' ? (
                     <div className="mt-2">
                       <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">{field.label}</label>
                       <textarea className="w-full p-3 border rounded-lg text-sm bg-gray-50 focus:bg-white transition focus:ring-1 ring-black/10 outline-none" rows={3} value={Array.isArray(item[field.key]) ? item[field.key].join('\n') : item[field.key]} onChange={e => updateItem(idx, field.key, e.target.value.split('\n'))} placeholder="List item..." />
                     </div>
                  ) : field.type === 'textarea' ? (
                     <div><label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">{field.label}</label><textarea className="w-full border p-3 rounded-lg text-sm focus:border-black outline-none focus:ring-1 ring-black/10" rows={2} value={item[field.key] || ''} onChange={e => updateItem(idx, field.key, e.target.value)}/></div>
                  ) : (
                    <div><label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">{field.label}</label><input className="w-full border p-3 rounded-lg text-sm focus:border-black outline-none bg-transparent" value={item[field.key] || ''} onChange={e => updateItem(idx, field.key, e.target.value)} placeholder={`Isi ${field.label}...`}/></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ADMIN ---
export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchData();
    });
  }, []);

  const fetchData = async () => {
    const { data: result } = await supabase.from('portfolio_content').select('*');
    const mapped = {};
    result?.forEach(row => mapped[row.section_name] = row.content);
    setData(mapped);
    setLoading(false);
  };

  const handleSave = async () => {
    const { error } = await supabase.from('portfolio_content').update({ content: data[activeTab] }).eq('section_name', activeTab);
    if (error) alert(`Gagal simpan: ${error.message}`); else alert('Berhasil disimpan!');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message); else window.location.reload();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); 
  };

  if (!session) return (
    <div className="h-screen flex items-center justify-center bg-[#F4ECE6] px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#222222]">Admin Login</h2>
        <input className="w-full p-3 rounded-lg border bg-gray-50 outline-none focus:ring-2 ring-black/10" type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full p-3 rounded-lg border bg-gray-50 outline-none focus:ring-2 ring-black/10" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button className="w-full bg-[#222222] text-white p-3 rounded-lg font-bold hover:bg-black transition">Masuk</button>
      </form>
    </div>
  );

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500 animate-pulse">Memuat Data...</div>;

  const tabs = [
    { id: 'hero', label: 'Hero / Profil', icon: User },
    { id: 'skills', label: 'Skills', icon: PenTool },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-[#222222]">
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b z-30 px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="font-serif font-bold text-lg">CMS Portofolio</h1>
        <button onClick={() => setSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg text-gray-700">
          <Menu size={20} />
        </button>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="font-serif font-bold text-xl">CMS Portofolio</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500"><X size={20}/></button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 ${activeTab === tab.id ? 'bg-[#222222] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t absolute bottom-0 w-full bg-white">
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="w-full text-left px-4 py-2 text-red-500 text-sm font-bold flex items-center gap-2 hover:bg-red-50 rounded-lg transition"><LogOut size={16}/> Logout</button>
        </div>
      </aside>
      
      {/* MAIN CONTENT */}
      <main className="flex-1 w-full md:w-auto p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 sticky top-0 md:top-0 bg-gray-100 py-4 z-20 backdrop-blur-sm bg-opacity-90 gap-4 md:gap-0">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold capitalize text-gray-900">{activeTab} Editor</h2>
              <p className="text-gray-500 text-xs md:text-sm">Edit konten website secara real-time</p>
            </div>
            <button onClick={handleSave} className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2">
              <Save size={20}/> <span className="md:inline">Simpan</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8 min-h-[500px]">
            {/* --- HERO EDITOR --- */}
            {activeTab === 'hero' && (
              <div className="space-y-8 max-w-2xl">
                 <div className="bg-gray-50 p-6 rounded-xl border space-y-6">
                    <MediaUploader label="Foto Profil Utama" currentUrl={data.hero?.image_url} onUpload={(url) => setData({...data, hero: {...data.hero, image_url: url}})} />
                    
                    {/* INPUT UPLOAD CV BARU DI SINI */}
                    <div className="border-t pt-6">
                      <MediaUploader 
                        label="File CV / Resume (PDF)" 
                        currentUrl={data.hero?.cv_url} 
                        type="document" 
                        onUpload={(url) => setData({...data, hero: {...data.hero, cv_url: url}})} 
                      />
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Judul / Headline Utama</label>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <ReactQuill theme="snow" modules={modules} value={data.hero?.name || ''} onChange={val => setData({...data, hero: {...data.hero, name: val}})}/>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Role / Jurusan</label>
                    <input className="w-full p-3 border rounded-lg bg-gray-50" value={data.hero?.role} onChange={e => setData({...data, hero: {...data.hero, role: e.target.value}})} />
                 </div>

                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Deskripsi Diri</label>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <ReactQuill theme="snow" modules={modules} value={data.hero?.description || ''} onChange={val => setData({...data, hero: {...data.hero, description: val}})}/>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input className="p-3 border rounded-lg text-sm bg-gray-50" placeholder="No HP" value={data.hero?.contacts?.phone} onChange={e => setData({...data, hero: {...data.hero, contacts: {...data.hero.contacts, phone: e.target.value}}})} />
                    <input className="p-3 border rounded-lg text-sm bg-gray-50" placeholder="Email" value={data.hero?.contacts?.email} onChange={e => setData({...data, hero: {...data.hero, contacts: {...data.hero.contacts, email: e.target.value}}})} />
                    <input className="p-3 border rounded-lg text-sm bg-gray-50" placeholder="Instagram" value={data.hero?.contacts?.instagram} onChange={e => setData({...data, hero: {...data.hero, contacts: {...data.hero.contacts, instagram: e.target.value}}})} />
                 </div>
              </div>
            )}

            {/* --- SKILLS, EXPERIENCE, PORTFOLIO (Sama Seperti Sebelumnya) --- */}
            {activeTab === 'skills' && <div className="space-y-8"><StringListEditor title="Hard Skills" items={data.skills?.hard_skills} onChange={v => setData({...data, skills: {...data.skills, hard_skills: v}})} /><StringListEditor title="Soft Skills" items={data.skills?.soft_skills} onChange={v => setData({...data, skills: {...data.skills, soft_skills: v}})} /><div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Deskripsi Tambahan</label><textarea className="w-full p-4 border rounded-xl bg-gray-50 text-sm" rows={4} value={data.skills?.description} onChange={e => setData({...data, skills: {...data.skills, description: e.target.value}})} /></div></div>}
            
            {activeTab === 'experience' && <DynamicListEditor title="Pengalaman Organisasi" items={data.experience || []} onChange={v => setData({...data, experience: v})} schema={[{ key: 'title', label: 'Jabatan' }, { key: 'organization', label: 'Organisasi' }, { key: 'period', label: 'Periode' }, { key: 'responsibilities', label: 'Tanggung Jawab', type: 'array' }]} />}
            
            {activeTab === 'portfolio' && <div className="space-y-10"><DynamicListEditor title="Instagram Content" items={data.portfolio?.ig_posts} onChange={v => setData({...data, portfolio: {...data.portfolio, ig_posts: v}})} schema={[{ key: 'label', label: 'Judul Konten' }, { key: 'role', label: 'Peran' }, { key: 'reels_url', label: 'Link Instagram' }, { key: 'video_url', label: 'Upload Video', type: 'media', mediaType: 'video' }]} /><DynamicListEditor title="Videography Project" items={data.portfolio?.video_projects} onChange={v => setData({...data, portfolio: {...data.portfolio, video_projects: v}})} schema={[{ key: 'label', label: 'Judul Video' }, { key: 'role', label: 'Peran' }, { key: 'video_url', label: 'File Video', type: 'media', mediaType: 'video' }]} /><DynamicListEditor title="Digital Characters" items={data.portfolio?.digital_characters} onChange={v => setData({...data, portfolio: {...data.portfolio, digital_characters: v}})} schema={[{ key: 'name', label: 'Nama Karakter' }, { key: 'image', label: 'Gambar Karakter', type: 'media' }]} /><DynamicListEditor title="Packaging Design" items={data.portfolio?.packaging} onChange={v => setData({...data, portfolio: {...data.portfolio, packaging: v}})} schema={[{ key: 'title', label: 'Nama Produk' }, { key: 'description', label: 'Deskripsi', type: 'textarea' }, { key: 'image', label: 'Desain Packaging', type: 'media' }]} /><DynamicListEditor title="Photography" items={data.portfolio?.photos} onChange={v => setData({...data, portfolio: {...data.portfolio, photos: v}})} schema={[{ key: 'title', label: 'Judul Foto' }, { key: 'description', label: 'Keterangan', type: 'textarea' }, { key: 'image', label: 'File Foto', type: 'media' }]} /></div>}
          </div>
        </div>
      </main>
    </div>
  );
}