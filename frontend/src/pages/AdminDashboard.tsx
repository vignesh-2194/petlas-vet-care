import React, { useState, useEffect } from 'react';
import { Calendar, ShoppingBag, Upload, LogOut, Trash2 } from 'lucide-react';
import axios from 'axios';
interface AppointmentRecord {
  id: string;
  _id?: string;
  customerName: string;
  phone: string;
  email: string;
  petName: string;
  petType: string;
  breed: string;
  age: number;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
}

interface ProductRecord {
  id: string;
  _id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  availability: string;
}
export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'products'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for creating a new product
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCat, setNewProdCategory] = useState('Therapeutics');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');
    // --- INLINE EDITING STATE HOOKS ---
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProdName, setEditProdName] = useState('');
  const [editProdPrice, setEditProdPrice] = useState('');
  const [editProdCat, setEditProdCat] = useState('Therapeutics');
  const [editProdDesc, setEditProdDesc] = useState('');
  const [editProdAvailability, setEditProdAvailability] = useState('In Stock');

  // --- SECURITY FIREWALL GATEWAY SHIELD CHECK ---
  useEffect(() => {
    const activeSessionToken = localStorage.getItem('adminToken');
    if (activeSessionToken !== 'petlas_authenticated_secure_token_2026') {
      alert('⚠️ Unauthenticated Access Request Blocked! Redirecting to secure login gateway...');
      window.location.href = '/login';
    }
  }, []);
    const loadConsoleData = () => {
    setLoading(true);
    Promise.all([
      axios.get('http://localhost:8000/api/appointments'),
      axios.get('http://localhost:8000/api/products')
    ]).then(([apptRes, prodRes]) => {
      setAppointments(apptRes.data);
      setProducts(prodRes.data);
    })
    .catch(err => console.error("Error connecting to operations streams:", err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'petlas_authenticated_secure_token_2026') {
      loadConsoleData();
    }
  }, []);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const maxDimension = 500;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setNewProdImg(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };
    const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdDesc) return alert("Please fill out all product fields!");

    const stockDropdown = document.getElementById('clientStockStatus') as HTMLSelectElement;
    const selectedStockValue = stockDropdown ? stockDropdown.value : "In Stock";

    const productPayload = {
      name: newProdName,
      price: parseFloat(newProdPrice),
      category: newProdCat,
      description: newProdDesc,
      imageUrl: newProdImg || "https://unsplash.com",
      availability: selectedStockValue
    };

    try {
      await axios.post('http://localhost:8000/api/products', productPayload);
      alert("🎉 Product uploaded and saved directly to the database successfully!");
      setNewProdName('');
      setNewProdPrice('');
      setNewProdDesc('');
      setNewProdImg('');
      loadConsoleData();
    } catch (err) {
      console.error("Error writing new product item:", err);
      alert("Failed to write to database storage. Check your terminal connection.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to remove this item from the store inventory?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      alert("🗑️ Product successfully deleted from database storage!");
      loadConsoleData();
    } catch (err) {
      console.error("Error deleting product item:", err);
      alert("Failed to delete item. Make sure your backend server is running.");
    }
  };
    const startEditingProduct = (product: ProductRecord) => {
    const pId = product._id || product.id || '';
    setEditingProductId(pId);
    setEditProdName(product.name);
    setEditProdPrice(product.price.toString());
    setEditProdCat(product.category);
    setEditProdDesc(product.description);
    setEditProdAvailability(product.availability || 'In Stock');
  };

  const handleUpdateProductSubmit = async (productId: string) => {
    if (!editProdName || !editProdPrice || !editProdDesc) {
      return alert("Please fill out all fields before saving changes!");
    }

    const updatedPayload = {
      name: editProdName,
      price: parseFloat(editProdPrice),
      category: editProdCat,
      description: editProdDesc,
      imageUrl: products.find(p => (p._id || p.id) === productId)?.imageUrl || "https://unsplash.com",
      availability: editProdAvailability
    };

    try {
      await axios.put(`http://localhost:8000/api/products/${productId}`, updatedPayload);
      alert("✏️ Product variations successfully updated in database storage!");
      setEditingProductId(null);
      loadConsoleData();
    } catch (err) {
      console.error("Error updating product details mapping:", err);
      alert("Failed to update product settings inside storage engine.");
    }
  };

  const handleUpdateStatus = async (appointmentId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:8000/api/appointments/${appointmentId}`, { status: newStatus });
      alert(`Pipeline status successfully changed to ${newStatus}!`);
      loadConsoleData();
    } catch (err) {
      console.error("Error updating intake pipeline status:", err);
      alert("Failed to update status. Make sure your backend server is running.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };
    return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between hidden md:flex text-left">
        <div className="space-y-8">
          <div className="text-white font-black tracking-wider text-lg font-mono">PETLA ADMIN HUB</div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('appointments')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'appointments' ? 'bg-teal-700 text-white shadow-md' : 'hover:bg-slate-800'}`}>
              <Calendar size={16} /> Appointments ({appointments.length})
            </button>
            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-teal-700 text-white shadow-md' : 'hover:bg-slate-800'}`}>
              <ShoppingBag size={16} /> Formulary Products ({products.length})
            </button>
          </nav>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 hover:bg-rose-950/40 text-rose-400 rounded-xl text-xs font-bold">
          <LogOut size={16} /> Exit Secure Gateway
        </button>
      </aside>

      <div className="flex-1 p-8 overflow-y-auto">
        {loading ? (
          <div className="text-center py-20 font-mono text-xs text-slate-400 animate-pulse">Syncing store shelves...</div>
        ) : activeTab === 'appointments' ? (
          <section className="space-y-6 text-left">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Active Clinical Intake Matrix</h2>
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider font-mono"><th className="p-4">Owner / Pet</th><th className="p-4">Contact Details</th><th className="p-4">Desired Schedule</th><th className="p-4">Diagnosis Note</th><th className="p-4">Pipeline Status</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {appointments.map((appt) => {
                    const apptId = appt._id || appt.id || '';
                    return (
                      <tr key={apptId} className="hover:bg-slate-50/50 transition-all">
                        <td className="p-4"><div className="font-bold text-slate-900">{appt.customerName}</div><div className="text-[10px] text-teal-600 font-mono">Pet: {appt.petName} ({appt.petType})</div></td>
                        <td className="p-4"><div>{appt.phone}</div><div className="text-slate-400 font-normal">{appt.email}</div></td>
                        <td className="p-4 font-mono"><div>{appt.preferredDate}</div><div className="text-slate-400">{appt.preferredTime}</div></td>
                        <td className="p-4 text-slate-500 max-w-xs truncate">{appt.problemDescription}</td>
                        <td className="p-4">
                          <select value={appt.status} onChange={(e) => handleUpdateStatus(apptId, e.target.value)} className={`font-bold p-1.5 rounded-lg border text-[11px] focus:outline-none ${appt.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : appt.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            <option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
                  ) : (
          <div className="text-left bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 font-mono">Product Management Workspace</h2>
            <form onSubmit={handleAddProductSubmit} className="space-y-4 max-w-md">
              <input type="text" placeholder="Product Title..." value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#0F766E]" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (e.g. 450)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#0F766E]" />
                <select value={newProdCat} onChange={(e) => setNewProdCategory(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white font-semibold text-slate-700 focus:outline-none focus:border-[#0F766E]">
                  <option value="Therapeutics">Therapeutics</option><option value="Clinical Nutrition">Clinical Nutrition</option><option value="Supplements">Supplements</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-400 font-mono text-[10px] uppercase block mb-1">Stock Availability Condition</label>
                <select id="clientStockStatus" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white font-bold text-slate-700 focus:outline-none focus:border-[#0F766E]"><option value="In Stock">In Stock (Available)</option><option value="Out of Stock">Out of Stock</option></select>
              </div>
              <label className="font-bold text-slate-600 font-mono text-[10px] uppercase block">Inventory Display Image</label>
              <label className="w-full flex flex-col items-center justify-center py-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-teal-50/20 group transition-all">
                <Upload size={18} className="text-slate-400 group-hover:text-teal-600 mb-1" /><span className="font-bold text-slate-500 group-hover:text-teal-700 text-[11px]">{newProdImg ? "✓ Image Loaded" : "Upload Local Media Asset"}</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              <textarea placeholder="Product Description..." value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white min-h-[60px] focus:outline-none focus:border-[#0F766E]" />
              <button type="submit" className="w-full bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-md hover:bg-[#0D645D] transition-all cursor-pointer">Publish Product to Store</button>
            </form>

            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider mb-4">Current Live Inventory ({products.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((item) => {
                  const productItemId = item._id || item.id || '';
                  const isEditing = editingProductId === productItemId;
                  return (
                    <div key={productItemId} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 shadow-sm hover:shadow-md transition-all relative text-left">
                      {isEditing ? (
                        <div className="space-y-3 text-xs">
                          <input type="text" value={editProdName} onChange={(e) => setEditProdName(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-none focus:border-teal-600" />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="number" value={editProdPrice} onChange={(e) => setEditProdPrice(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg text-teal-600 font-bold focus:outline-none focus:border-teal-600" />
                            <select value={editProdCat} onChange={(e) => setEditProdCat(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:border-teal-600"><option value="Therapeutics">Therapeutics</option><option value="Clinical Nutrition">Clinical Nutrition</option><option value="Supplements">Supplements</option></select>
                          </div>
                          <select value={editProdAvailability} onChange={(e) => setEditProdAvailability(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:border-teal-600"><option value="In Stock">In Stock</option><option value="Out of Stock">Out of Stock</option></select>
                          <textarea rows={2} value={editProdDesc} onChange={(e) => setEditProdDesc(e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-teal-600 leading-normal" />
                          <div className="flex gap-2 pt-2">
                            <button type="button" onClick={() => handleUpdateProductSubmit(productItemId)} className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-lg cursor-pointer">Save</button>
                            <button type="button" onClick={() => setEditingProductId(null)} className="flex-1 py-2 bg-slate-200 text-slate-600 font-bold rounded-lg cursor-pointer">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button type="button" onClick={() => handleDeleteProduct(productItemId)} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                          <div className="pr-6 space-y-2">
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
                            <p className="text-slate-500 text-[11px] font-normal line-clamp-2 leading-relaxed">{item.description}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-slate-100 mt-2">
                              <span className="font-semibold text-emerald-600">₹{item.price}</span><span className="text-slate-300">•</span><span className="text-slate-500 font-medium">{item.category}</span><span className="text-slate-300">•</span>
                              <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${(item.availability || '').toLowerCase().includes('out') ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>{item.availability || 'In Stock'}</span>
                            </div>
                            <div className="pt-2"><button type="button" onClick={() => startEditingProduct(item)} className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-[11px] cursor-pointer text-center">Edit Product Fields</button></div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};







