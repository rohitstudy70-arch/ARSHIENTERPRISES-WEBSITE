import React, { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaUpload, FaTrash, FaCopy, FaImage, FaCloudUploadAlt } from 'react-icons/fa';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const load = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getMedia();
      setMedia(res.data.data || []);
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const uploadFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        await adminAPI.uploadMedia(formData);
      }
      toast.success(`${files.length} file(s) uploaded`);
      load();
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (e) => {
    await uploadFiles(Array.from(e.target.files));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    await uploadFiles(files);
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await adminAPI.deleteMedia(filename);
      toast.success('File deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => toast.success('URL copied!'));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-slate-400 text-sm mt-0.5">Upload and manage images</p>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 shadow-lg ${
          uploading
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white shadow-blue-500/25 hover:-translate-y-0.5'
        }`}>
          {uploading
            ? <><div className="w-3.5 h-3.5 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" /> Uploading...</>
            : <><FaUpload size={13} /> Upload Files</>
          }
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-sky-500/50 bg-sky-500/5'
            : 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
          <FaCloudUploadAlt size={28} className={dragOver ? 'text-sky-400' : 'text-slate-500'} />
        </div>
        <p className="text-slate-300 font-medium mb-1">
          {dragOver ? 'Drop to upload' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-slate-500 text-sm">PNG, JPG, WEBP supported · Max 10MB per file</p>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading media...</p>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No media files yet. Upload some images to get started.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">{media.length} file{media.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
            {media.map((item, i) => (
              <div
                key={i}
                className="group relative bg-slate-800/60 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-all duration-200"
              >
                <div className="aspect-square">
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-slate-700"><svg xmlns="http://www.w3.org/2000/svg" class="text-slate-500" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>';
                    }}
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg text-white transition-all"
                    title="Copy URL"
                  >
                    <FaCopy size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.filename)}
                    className="p-2 bg-red-500/20 backdrop-blur-sm hover:bg-red-500/40 rounded-lg text-red-400 hover:text-red-300 transition-all"
                    title="Delete"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
                {/* Info */}
                <div className="p-2 border-t border-white/[0.04]">
                  <p className="text-xs text-slate-400 truncate">{item.filename}</p>
                  {item.size && (
                    <p className="text-xs text-slate-600">{(item.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
