import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    AlertTriangle,
    Search,
    Edit3,
    X,
    ShoppingBag,
    Database
} from "lucide-react";

// ==========================================
// 1. DATA INTERFACES & CONFIG
// ==========================================

export interface Product {
    _id: string;
    name: string;
    price: number;
    inStock: number; // ✅ Fixed: Added stock tracking property
    category: string;
    description: string;
    imageUrl?: string;
    availability: string;
}

const CATEGORIES = ["All", "Therapeutics", "Chronic Nutrition", "Supplements"];

// ==========================================
// 2. MAIN COMPONENT INITIALIZATION
// ==========================================

export const MedicalStore: React.FC = () => {
    // Products and loading states
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Search & Filter state
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Selection state for detail drawer / modal
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isAdminView, setIsAdminView] = useState<boolean>(false);

    // Form states for creating / editing products
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        name: "",
        price: "",
        inStock: "", // ✅ Tracked as a clean string state for form inputs
        category: "Supplements",
        description: "",
        imageUrl: ""
    });

    // Fetch data on load
    useEffect(() => {
        fetchProducts();
    }, []);
    // ==========================================
    // 3. API FETCH & DATA PARSING LOGIC
    // ==========================================

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get("http://localhost:8000/api/products");



            // Ensure the response data is a valid array before mounting to state
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else if (response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (err: any) {
            console.error("Failed to fetch products:", err);
            setError("Unable to load the pharmacy inventory. Please verify backend state.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // 4. FILTERING & SEARCH COMPUTATION
    // ==========================================

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
    // ==========================================
    // 5. THE SAFE FORM SAVE & TYPE CONVERSION FUNCTION
    // ==========================================

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setFormValues({
            name: product.name,
            price: product.price.toString(),
            inStock: product.inStock.toString(), // ✅ Keep form inputs as strings
            category: product.category,
            description: product.description,
            imageUrl: product.imageUrl || ""
        });
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;

        try {
            setError(null);

            // 🌟 FIX: This line safely checks if your ID is stored as '_id' or 'id' 
            const productId = selectedProduct._id || (selectedProduct as any).id;

            if (!productId) {
                alert("Error: Could not find a valid database ID for this product.");
                return;
            }

            const payload = {
                name: formValues.name,
                price: Number(formValues.price) || 0,
                inStock: parseInt(formValues.inStock, 10) || 0,
                category: formValues.category,
                description: formValues.description,
                imageUrl: formValues.imageUrl,
                availability: parseInt(formValues.inStock, 10) > 0 ? "Available" : "Out of Stock"
            };

            // 🌟 FIX: We use the safe 'productId' variable in the URL below
            const res = await axios.put(
                `http://127.0.0{productId}`,
                payload
            );

            if (res.status === 200) {
                await fetchProducts();
                setIsEditing(false);
                setSelectedProduct(null);
                alert("Product updated successfully!");
            }
        } catch (err: any) {
            console.error("Storage write error detailed report:", err);
            setError(
                err.response?.data?.detail ||
                "Failed to update product settings inside storage engine. Verify field configurations."
            );
        }
    };

    // ==========================================
    // 6. MAIN RENDER VIEW: TOP HEADER & CONTROLS
    // ==========================================

    return (
        <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Error Alert Display Banner */}
                {error && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100/50 text-rose-600">
                        <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
                        <div className="text-xs font-medium leading-relaxed">{error}</div>
                        <button onClick={() => setError(null)} className="ml-auto text-rose-400 hover:text-rose-600">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Store Title Bar & Mode Toggle Switch */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Petla's Pharmacy Store</h1>
                        <p className="text-sm text-slate-500">Manage medical inventory and diagnostic health supplements</p>
                    </div>
                    <button
                        onClick={() => setIsAdminView(!isAdminView)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${isAdminView
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {isAdminView ? <Database size={14} /> : <ShoppingBag size={14} />}
                        {isAdminView ? "Switch to Customer View" : "Open Admin Gateway"}
                    </button>
                </div>

                {/* Filter Toolbar Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${selectedCategory === category
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search catalog, pharmacy items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Loading Spinner Skeleton */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs font-semibold uppercase tracking-wider animate-pulse">Querying Live Inventory...</p>
                    </div>
                ) : (
                    /* ==========================================
                       7. PRODUCT CATALOG GRID DISPLAY
                       ========================================== */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="group relative bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300"
                            >
                                {/* Clean Availability Badge Logic */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-sm border ${product.availability === "Available" || product.availability === "In Stock"
                                        ? "bg-emerald-50 border-emerald-200/50 text-emerald-600"
                                        : "bg-rose-50 border-rose-200/50 text-rose-600"
                                        }`}>
                                        {product.availability === "Available" || product.availability === "In Stock" ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Visual Asset Box */}
                                    <div className="aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100/50 overflow-hidden flex items-center justify-center p-6">
                                        <img
                                            src={product.imageUrl || "https://unsplash.com"}
                                            alt={product.name}
                                            className="max-height-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (target.src !== "/assets/placeholder-pet.png") {
                                                    // Safe local fallback that won't infinite-loop
                                                    target.src = "/assets/placeholder-pet.png";
                                                }
                                            }}
                                        />

                                    </div>

                                    {/* Metadata Text */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                                        <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description || "No therapeutic evaluation summary configured."}</p>
                                    </div>
                                </div>

                                {/* Card Action Row */}
                                <div className="flex items-center justify-between border-t border-slate-50 mt-5 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
                                        <span className="text-base font-black text-slate-900">₹{product.price.toFixed(2)}</span>
                                    </div>

                                    {isAdminView ? (
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                        >
                                            <Edit3 size={12} />
                                            Edit Product Fields
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/10 transition-all"
                                        >
                                            View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* ==========================================
           8. SLIDING SIDE PANEL (VIEW DETAILS / ADMIN EDIT FORM)
           ========================================== */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end">
                        <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-200">

                            {/* Drawer Top Header Row */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <h2 className="text-md font-bold text-slate-900 tracking-tight">
                                    {isEditing ? "Edit Product Parameters" : "Product Specifications"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(null);
                                        setIsEditing(false);
                                    }}
                                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Drawer Main Content Area */}
                            <div className="flex-1 py-6">
                                {isEditing ? (
                                    /* ADMIN EDIT FORM MODE */
                                    <form onSubmit={handleSaveProduct} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                                            <input
                                                type="text"
                                                value={formValues.name}
                                                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price ($ USD)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formValues.price}
                                                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Units in Stock</label>
                                                <input
                                                    type="number"
                                                    step="1"
                                                    value={formValues.inStock}
                                                    onChange={(e) => setFormValues({ ...formValues, inStock: e.target.value })}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Classification Group</label>
                                            <select
                                                value={formValues.category}
                                                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-500"
                                            >
                                                {CATEGORIES.filter(c => c !== "All").map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Therapeutic Description</label>
                                            <textarea
                                                rows={4}
                                                value={formValues.description}
                                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 resize-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Image URL</label>
                                            <input
                                                type="text"
                                                value={formValues.imageUrl}
                                                onChange={(e) => setFormValues({ ...formValues, imageUrl: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                                                placeholder="Optional fallback string"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-4"
                                        >
                                            Commit Structural Changes
                                        </button>
                                    </form>
                                ) : (
                                    /* CUSTOMER PRODUCT VIEW DETAILS MODE */
                                    <div className="space-y-6">
                                        <div className="aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-6">
                                            <img
                                                src={selectedProduct.imageUrl || "https://unsplash.com"}
                                                alt={selectedProduct.name}
                                                className="max-height-full max-w-full object-contain"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md uppercase tracking-wider">{selectedProduct.category}</span>
                                            <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400 font-bold uppercase">Database Identifier</span>
                                                <span className="font-mono text-slate-600">{selectedProduct._id}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400 font-bold uppercase">Current Inventory Availability</span>
                                                <span className={`font-bold ${selectedProduct.availability === "Available" || selectedProduct.availability === "In Stock"
                                                        ? "text-emerald-600"
                                                        : "text-rose-600"
                                                    }`}>
                                                    {selectedProduct.availability === "Available" || selectedProduct.availability === "In Stock"
                                                        ? "Item Available"
                                                        : "Out of Stock"}
                                                </span>

                                            </div>


                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinical Pharmacology Summary</h4>
                                            <p className="text-xs leading-relaxed text-slate-600">{selectedProduct.description || "No analytical therapeutic records available."}</p>
                                        </div>

                                        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
                                                {/* ✅ Fixed: Now referencing price property properly instead of inStock */}
                                                <span className="text-2xl font-black text-slate-900">₹{selectedProduct.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};




