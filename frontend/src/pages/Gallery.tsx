import React, { useState, useEffect } from 'react';
import { Upload, Star } from 'lucide-react';
import axios from 'axios';

interface Comment {
  author: string;
  text: string;
  createdAt: string;
}

interface Memory {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  role: 'Customer' | 'Management';
  reviewText: string;
  rating: number;
  comments: Comment[];
  createdAt: string;
}

export const Gallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  // Submission Form Local States
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState<'Customer' | 'Management'>('Customer');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [imgBase64, setImgBase64] = useState('');

  // Comment Box State Tracker
  const [activeCommentText, setActiveCommentText] = useState<{ [key: string]: string }>({});
  const [commentAuthor, setCommentAuthor] = useState('');

  const fetchMemories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://petlas-vet-care.onrender.com'}/api/memories`);

      setMemories(res.data);
    } catch (err) {
      console.error("Error loading memories stream:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMemory = async (memoryId: string) => {
  if (!window.confirm("Are you sure you want to permanently delete this clinic memory card?")) return;

  try {
    // FIX: Using template literals (${memoryId}) with backticks to inject the actual unique ID string
    const res = await axios.delete(`${import.meta.env.VITE_API_URL || 'https://petlas-vet-care.onrender.com'}/api/memories/${memoryId}`);


    if (res.status === 200) {
      alert("Memory card deleted successfully!");
      fetchMemories(); // Refreshes the workspace grid seamlessly
    }
  } catch (err) {
    console.error("Failed to delete memory node:", err);
    alert("Error deleting item from live database pipeline.");
  }
};



  useEffect(() => {
    fetchMemories();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authorName || !reviewText || !imgBase64) {
      return alert("Please fulfill all memory tags including an image profile!");
    }

    const payload = {
      title,
      imageUrl: imgBase64,
      authorName,
      role,
      reviewText,
      rating
    };

    try {
        await axios.post(`${import.meta.env.VITE_API_URL || 'https://petlas-vet-care.onrender.com'}/api/memories/comments`, payload);


      alert("✨ Memory space cataloged directly to cloud pipeline!");
      setTitle('');
      setAuthorName('');
      setReviewText('');
      setImgBase64('');
      fetchMemories();
    } catch (err) {
      console.error("Failed writing document map:", err);
      alert("Pipeline transmission dropped.");
    }
  };

  const handlePostComment = async (memoryId: string) => {
    const text = activeCommentText[memoryId];
    const author = commentAuthor || "Anonymous User";
    if (!text) return alert("Write your text confirmation before posting comment.");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'https://petlas-vet-care.onrender.com'}/api/memories/${memoryId}/comments`, { author, text });

      setActiveCommentText(prev => ({ ...prev, [memoryId]: '' }));
      setCommentAuthor('');
      fetchMemories();
    } catch (err) {
      console.error("Error committing feedback block:", err);
    }
  };
    return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-800">
      
      {/* Sidebar Content Creator Controller Form */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm h-fit space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Log a Clinic Memory Slot</h2>
          <p className="text-xs text-slate-400 mt-0.5">Share active experiences or general client treatment feedback.</p>
        </div>

        <form onSubmit={handleCreateMemory} className="space-y-3">
          <input 
            type="text" 
            placeholder="Title (e.g., Fluffy's Recovery Checkup)" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={authorName} 
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs outline-none"
            />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white outline-none"
            >
              <option value="Customer">Customer</option>
              <option value="Management">Management</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 py-1">
            <span className="text-xs font-bold text-slate-500">Rating:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <button key={num} type="button" onClick={() => setRating(num)} className="cursor-pointer outline-none">
                <Star size={16} fill={num <= rating ? "#F59E0B" : "none"} stroke={num <= rating ? "#F59E0B" : "#94A3B8"}/>
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Write comments or specific clinical experience review tags here..." 
            value={reviewText} 
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs min-h-[80px] outline-none"
          />

          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} id="gallery-photo" className="hidden" />
            <label htmlFor="gallery-photo" className="w-full flex items-center justify-center gap-2 p-2.5 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl text-xs font-bold text-slate-600 border border-slate-200 cursor-pointer">
              <Upload size={14}/> {imgBase64 ? "Photo Loaded ✅" : "Upload Memory Image"}
            </label>
          </div>

          <button type="submit" className="w-full bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl hover:bg-[#0D645D] transition-all cursor-pointer">
            Broadcast Memory Node
          </button>
        </form>
      </div>

      {/* Main Realtime Feed Grid Screen */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">Dynamic Workspace Board ({memories.length})</h3>
        {loading ? <div className="text-center text-xs font-mono text-slate-400 py-12 animate-pulse">Streaming visual collections...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memories.map((m) => (
               <div key={(m as any)._id || m.id || Math.random().toString()} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between relative">



                <div>
                  <img src={m.imageUrl} alt="Memory Snapshot" className="w-full h-44 object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${m.role === 'Management' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-teal-50 text-teal-700 border border-teal-200'}`}>
                        {m.role}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: m.rating }).map((_, i) => (
                          <Star key={i} size={10} fill="#F59E0B" stroke="#F59E0B" />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">"{m.reviewText}"</p>
                    <span className="text-[10px] text-slate-400 font-medium block">Shared by: <span className="font-bold text-slate-600">{m.authorName}</span></span>
                                  {/* 🔒 Security Check: Renders button if explicitly inside admin gateway components */}
          {(window.location.pathname.includes("dashboard") || 
            window.location.pathname.includes("admin") || 
            document.querySelector(".PETLA-ADMIN-HUB") !== null) && (
            <button
              type="button"
              onClick={() => handleDeleteMemory((m as any)._id || (m as any).id)}



              className="mt-3 w-full py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-100/50 text-center"
            >
              Remove This Memory Block
            </button>
          )}

                  </div>
                </div>

                {/* Internal Card Comments Threading System Block */}
                <div className="border-t border-slate-50 bg-slate-50/30 p-4 space-y-3 mt-auto">
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {m.comments && m.comments.map((c, i) => (
                      <div key={i} className="text-[11px] leading-tight bg-white p-2 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700">{c.author}: </span>
                        <span className="text-slate-500">{c.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100/50">
                    <input 
                      type="text" 
                      placeholder="Your Name (Optional)" 
                      value={commentAuthor} 
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 rounded-lg text-[10px] bg-white outline-none"
                    />
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add a comment thread..." 
                        value={activeCommentText[m.id] || ''} 
                        onChange={(e) => setActiveCommentText({ ...activeCommentText, [m.id]: e.target.value })}
                        className="flex-grow px-2 py-1 border border-slate-200 rounded-lg text-[10px] bg-white outline-none"
                      />
                      <button onClick={() => handlePostComment(m.id)} className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-lg hover:bg-slate-700 transition-all cursor-pointer">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

