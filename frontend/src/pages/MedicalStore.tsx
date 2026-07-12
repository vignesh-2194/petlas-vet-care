import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, X, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string;
  image_url?: string;
  availability: string;
}

export const MedicalStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // MAGIC HOOK STATE: Tracks which product is currently opened inside the premium details drawer
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/products")
      .then((res) => {
        const backendData = Array.isArray(res.data) ? res.data : (res.data.products || []);
        setProducts(backendData);
      })
      .catch((err) => {
        console.error("Error streaming catalog data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Therapeutics', 'Clinical Nutrition', 'Supplements'];

  const filteredProducts = products.filter(product => {
    const nameString = product && product.name ? product.name.toLowerCase() : '';
    const categoryString = product && product.category ? product.category : '';

    const matchesSearch = nameString.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || categoryString === selectedCategory;
    return matchesSearch && matchesCategory;
  });
    return (
    <div className="pb-24 pt-24 space-y-12 selection:bg-teal-100 selection:text-teal-900 text-slate-800">
      
      {/* Search and Category Control Ribbon Header */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-md shadow-teal-700/10'
                  : 'bg-white text-slate-500 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="md:col-span-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
            placeholder="Search catalog pharmacy tracking identifier..."
          />
        </div>
      </section>

      {/* Product Card Canvas Matrix */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center font-mono text-xs text-slate-400 py-20 animate-pulse">
            Querying live clinic database inventory streams...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-slate-400 py-20 font-medium text-sm">
            No formulary match codes found inside the current filter parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const stockStatus = (product.availability || '').toLowerCase();
                const isOutOfStock = stockStatus === 'out of stock';

                return (
                  <motion.div
                    key={product._id || product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-slate-100 rounded-3xl p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative text-left"
                  >
                    {/* Glowing Availability Badge Overlay */}
                    <span className={`absolute top-4 right-5 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-20 ${
                      isOutOfStock
                        ? 'bg-rose-50 text-rose-600 border border-rose-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {isOutOfStock ? 'Out of Stock' : 'Available'}
                    </span>

                    <div className="space-y-4">
                      {/* Image Frame */}
                      <div className="w-full aspect-[16/10] bg-slate-50 border border-slate-100/50 rounded-2xl overflow-hidden relative flex items-center justify-center">
                        <img
                          src={product.imageUrl || product.image_url || "https://unsplash.com"}
                          alt={product.name}
                          className={`w-full h-full object-cover select-none transition-all duration-300 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://unsplash.com";
                          }}
                        />
                      </div>

                      {/* Info Stack */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block font-mono">
                          {product.category || 'General'}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-800 tracking-tight line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                          {product.description || 'No formulary description registered.'}
                        </p>
                      </div>
                    </div>

                    {/* Pricing and Action Strip Row - FIXED WITH RUPEE ₹ */}
                    <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-5 w-full">
                      <div className="text-base font-black text-slate-900 font-mono tracking-tight">
                        ₹{product.price !== undefined ? product.price : '0.00'}
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-bold text-slate-600 hover:text-[#0F766E] transition-colors cursor-pointer py-1.5 px-3 hover:bg-teal-50/50 rounded-xl"
                      >
                        View Details
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
            {/* ==================== MAGIC PRODUCT SLIDE-OUT DRAWER ==================== */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Dark Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-slate-950 z-50 cursor-pointer"
            />

            {/* Sliding Panel Content Card */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 border-l border-slate-100 flex flex-col justify-between text-left p-6"
            >
              <div className="space-y-6 overflow-y-auto pr-1">
                {/* Header Row */}
                <div className="flex justify-between items-center border-b pb-4 border-slate-100">
                  <div className="flex items-center gap-2 text-[#0F766E] font-mono text-xs font-bold uppercase tracking-wider">
                    <ShoppingBag size={14} /> Product Profile Overview
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Display Image asset */}
                <div className="w-full aspect-[16/11] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden relative">
                  <img
                    src={selectedProduct.imageUrl || selectedProduct.image_url || "https://unsplash.com"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title and Category Block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 font-mono bg-teal-50 px-2 py-0.5 rounded-md">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight pt-1">
                    {selectedProduct.name}
                  </h2>
                </div>

                {/* Description Body Parameter */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Clinical Specification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
                    {selectedProduct.description || 'No detailed clinical properties registered for this item entry.'}
                  </p>
                </div>

                {/* DYNAMIC VISIBLE ACCENT STATUS BANNER */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Inventory Condition Status</h4>
                  {(selectedProduct.availability || '').toLowerCase() === 'out of stock' ? (
                    <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4 text-rose-700 text-xs font-medium">
                      <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <span className="font-extrabold block text-rose-800 uppercase tracking-wide font-mono text-[10px]">Out of Stock</span>
                        This formulation is currently unavailable. Contact the pharmacy desk to place a priority backorder.
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-700 text-xs font-medium">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block text-emerald-800 uppercase tracking-wide font-mono text-[10px]">Available in Vault</span>
                        This product is fully verified, stocked, and available for immediate local clinic fulfillment streams.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Fixed Checkout Pricing Bar Row */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-6 bg-white">
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Total Value</div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    ₹{selectedProduct.price}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-teal-800 transition-all cursor-pointer shadow-md"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};


