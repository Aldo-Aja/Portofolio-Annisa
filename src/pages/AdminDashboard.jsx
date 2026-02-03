import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Save,
  LogOut,
  Upload,
  Plus,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Video,
} from "lucide-react";

// --- SUB-COMPONENT: IMAGE/VIDEO UPLOADER ---
const MediaUploader = ({ currentUrl, onUpload, label, type = "image" }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload ke bucket 'portfolio-images'
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
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
    <div className="mb-2">
      <label className="block text-xs font-bold text-gray-500 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-3">
        {currentUrl && type === "image" && (
          <img
            src={currentUrl}
            alt="Preview"
            className="w-12 h-12 rounded object-cover border"
          />
        )}
        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 border rounded text-xs bg-white hover:bg-gray-50 shadow-sm">
          {uploading ? (
            <Loader2 className="animate-spin h-3 w-3" />
          ) : type === "video" ? (
            <Video size={14} />
          ) : (
            <ImageIcon size={14} />
          )}
          {uploading ? "..." : currentUrl ? "Ganti" : "Upload"}
          <input
            type="file"
            className="hidden"
            accept={type === "video" ? "video/*" : "image/*"}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        {currentUrl && (
          <span className="text-[10px] text-gray-400 truncate max-w-[100px]">
            {currentUrl.split("/").pop()}
          </span>
        )}
      </div>
    </div>
  );
};

// --- EDITOR GENERIC LIST (Untuk Portfolio Items) ---
const PortfolioListEditor = ({ title, items, onChange, schema }) => {
  const addItem = () => {
    // Buat object kosong sesuai schema
    const newItem = {};
    schema.forEach((field) => (newItem[field.key] = ""));
    onChange([...(items || []), newItem]);
  };

  const updateItem = (idx, key, val) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [key]: val };
    onChange(newItems);
  };

  const removeItem = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className="bg-gray-50 p-4 rounded-xl border mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-700">{title}</h3>
        <button
          onClick={addItem}
          className="text-xs bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-gray-800"
        >
          <Plus size={12} /> Item Baru
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-3 rounded-lg border shadow-sm relative"
          >
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
            <div className="space-y-3 pr-6">
              {schema.map((field) => (
                <div key={field.key}>
                  {field.type === "media" ? (
                    <MediaUploader
                      label={field.label}
                      currentUrl={item[field.key]}
                      type={field.mediaType || "image"}
                      onUpload={(url) => updateItem(idx, field.key, url)}
                    />
                  ) : (
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400">
                        {field.label}
                      </label>
                      <input
                        className="w-full border-b text-sm py-1 focus:border-black outline-none"
                        value={item[field.key] || ""}
                        onChange={(e) =>
                          updateItem(idx, field.key, e.target.value)
                        }
                        placeholder={`Isi ${field.label}...`}
                      />
                    </div>
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

// --- MAIN PAGE ---
export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("portfolio"); // Default ke Portfolio biar langsung kelihatan
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchData();
    });
  }, []);

  const fetchData = async () => {
    const { data: result } = await supabase
      .from("portfolio_content")
      .select("*");
    const mapped = {};
    result?.forEach((row) => (mapped[row.section_name] = row.content));
    setData(mapped);
    setLoading(false);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("portfolio_content")
      .update({ content: data[activeTab] })
      .eq("section_name", activeTab);
    if (error) alert("Gagal simpan!");
    else alert("Berhasil disimpan!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.reload();
  };

  if (!session)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Admin Login</h2>
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white p-2 rounded font-bold">
            Masuk
          </button>
        </form>
      </div>
    );

  if (loading) return <div className="p-10 text-center">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="font-bold text-xl">CMS Portofolio</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {["hero", "skills", "experience", "portfolio"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={() =>
              supabase.auth.signOut().then(() => window.location.reload())
            }
            className="text-red-500 text-sm font-bold flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize text-gray-800">
              {activeTab} Editor
            </h2>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-blue-700 flex gap-2"
            >
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            {/* --- HERO EDITOR --- */}
            {activeTab === "hero" && (
              <div className="space-y-4">
                <MediaUploader
                  label="Foto Profil"
                  currentUrl={data.hero?.image_url}
                  onUpload={(url) =>
                    setData({ ...data, hero: { ...data.hero, image_url: url } })
                  }
                />
                <input
                  className="w-full p-2 border rounded"
                  value={data.hero?.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, name: e.target.value },
                    })
                  }
                  placeholder="Nama"
                />
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  value={data.hero?.description}
                  onChange={(e) =>
                    setData({
                      ...data,
                      hero: { ...data.hero, description: e.target.value },
                    })
                  }
                  placeholder="Deskripsi"
                />
              </div>
            )}

            {/* --- SKILLS EDITOR --- */}
            {activeTab === "skills" && (
              <div className="text-center text-gray-500">
                Gunakan JSON Editor atau minta versi sederhana jika perlu.
              </div>
            )}

            {/* --- PORTFOLIO EDITOR (COMPLEX) --- */}
            {activeTab === "portfolio" && (
              <div className="space-y-8">
                {/* 1. IG Content */}
                <PortfolioListEditor
                  title="Instagram Content"
                  items={data.portfolio?.ig_posts}
                  onChange={(v) =>
                    setData({
                      ...data,
                      portfolio: { ...data.portfolio, ig_posts: v },
                    })
                  }
                  schema={[
                    { key: "label", label: "Judul Konten" },
                    { key: "role", label: "Peran" },
                    { key: "reels_url", label: "Link Instagram" },
                    {
                      key: "video_url",
                      label: "Upload Video",
                      type: "media",
                      mediaType: "video",
                    },
                  ]}
                />

                {/* 2. Videography */}
                <PortfolioListEditor
                  title="Videography Project"
                  items={data.portfolio?.video_projects}
                  onChange={(v) =>
                    setData({
                      ...data,
                      portfolio: { ...data.portfolio, video_projects: v },
                    })
                  }
                  schema={[
                    { key: "label", label: "Judul Video" },
                    { key: "role", label: "Peran" },
                    {
                      key: "video_url",
                      label: "File Video",
                      type: "media",
                      mediaType: "video",
                    },
                  ]}
                />

                {/* 3. Characters */}
                <PortfolioListEditor
                  title="Digital Characters"
                  items={data.portfolio?.digital_characters}
                  onChange={(v) =>
                    setData({
                      ...data,
                      portfolio: { ...data.portfolio, digital_characters: v },
                    })
                  }
                  schema={[
                    { key: "name", label: "Nama Karakter" },
                    { key: "image", label: "Gambar Karakter", type: "media" },
                  ]}
                />

                {/* 4. Packaging */}
                <PortfolioListEditor
                  title="Packaging Design"
                  items={data.portfolio?.packaging}
                  onChange={(v) =>
                    setData({
                      ...data,
                      portfolio: { ...data.portfolio, packaging: v },
                    })
                  }
                  schema={[
                    { key: "title", label: "Nama Produk" },
                    { key: "description", label: "Deskripsi" },
                    { key: "image", label: "Desain Packaging", type: "media" },
                  ]}
                />

                {/* 5. Photos */}
                <PortfolioListEditor
                  title="Photography"
                  items={data.portfolio?.photos}
                  onChange={(v) =>
                    setData({
                      ...data,
                      portfolio: { ...data.portfolio, photos: v },
                    })
                  }
                  schema={[
                    { key: "title", label: "Judul Foto" },
                    { key: "description", label: "Keterangan" },
                    { key: "image", label: "File Foto", type: "media" },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
