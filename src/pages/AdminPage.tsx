import React, { useMemo, useRef, useState } from 'react';
import type { GalleryImage } from '../data/galleryData';

type StoredImage = Omit<GalleryImage, 'id' | 'width' | 'height'> & {
  id: string;
  width?: number;
  height?: number;
};

const LS_KEY = 'custom_gallery_images_v1';

function readStored(): StoredImage[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as StoredImage[]) : [];
  } catch {
    return [];
  }
}

function writeStored(images: StoredImage[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(images));
}

const AdminPage: React.FC = () => {
  const [images, setImages] = useState<StoredImage[]>(() => readStored());
  const [form, setForm] = useState({
    url: '',
    title: '',
    description: '',
    photographer: '',
    location: '',
    tags: '', // comma separated
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.url.trim() || !form.title.trim()) return;
    const newItem: StoredImage = {
      id: `custom-${Date.now()}`,
      url: form.url.trim(),
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      photographer: form.photographer.trim() || undefined,
      location: form.location.trim() || undefined,
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    };
    const next = [newItem, ...images];
    setImages(next);
    writeStored(next);
    setForm({ url: '', title: '', description: '', photographer: '', location: '', tags: '' });
  };

  const handleDelete = (id: string) => {
    const next = images.filter(i => i.id !== id);
    setImages(next);
    writeStored(next);
  };

  const importFromFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const first = files[0];
    const objectUrl = URL.createObjectURL(first);
    setForm(prev => ({ ...prev, url: objectUrl, title: first.name.replace(/\.[^.]+$/, '') }));
  };

  const imagesCount = useMemo(() => images.length, [images]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">관리자 - 이미지 업로드</h1>
          <a href="/" className="text-sm text-emerald-700 hover:underline">갤러리로 돌아가기</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-1 bg-white border rounded-2xl p-4">
          <h2 className="text-base font-semibold mb-4">새 이미지 추가</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">이미지 URL</label>
              <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">로컬 파일</label>
              <div className="flex items-center gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => importFromFiles(e.target.files)} className="block w-full text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">제목</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">설명</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">작가</label>
                <input name="photographer" value={form.photographer} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">위치</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">태그 (,로 구분)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="nature, mountain" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            </div>

            <button onClick={handleAdd} className="w-full mt-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">추가</button>
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">내가 추가한 이미지</h2>
            <span className="text-sm text-gray-500">{imagesCount}개</span>
          </div>

          {images.length === 0 ? (
            <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">아직 추가한 이미지가 없습니다.</div>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-4">
              {images.map(img => (
                <li key={img.id} className="bg-white border rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold line-clamp-1">{img.title}</div>
                    {img.description && <div className="text-sm text-gray-500 line-clamp-2">{img.description}</div>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-500">{img.tags?.length ? `#${img.tags.join(' #')}` : '태그 없음'}</div>
                      <button onClick={() => handleDelete(img.id)} className="text-xs text-red-600 hover:underline">삭제</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-gray-500">로컬스토리지에 저장됩니다. 다른 브라우저/기기에서는 보이지 않습니다.</p>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;


