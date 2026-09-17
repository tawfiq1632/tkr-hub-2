import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useRouter, Link } from '../context/RouterContext';
import { OrderStatus, CategorySlug, Product } from '../types';
import { AdminLoginCard } from '../components/admin/AdminLoginCard';
import { AdminContactSettings } from '../components/admin/AdminContactSettings';
import { AdminStoreSettings } from '../components/admin/AdminStoreSettings';
import {
  Settings,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Truck,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  Search,
  ExternalLink,
  ChevronDown,
  Phone,
  LogOut,
  ShieldCheck,
  Store,
  MessageSquare
} from 'lucide-react';

export function AdminPage() {
  const {
    orders,
    products,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addToast,
    isAdminAuthenticated,
    adminEmail,
    logoutAdmin
  } = useStore();

  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'contact' | 'settings'>('contact');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CategorySlug>('gadgets');
  const [newSubcategory, setNewSubcategory] = useState('Audio');
  const [newPrice, setNewPrice] = useState('49.99');
  const [newOriginalPrice, setNewOriginalPrice] = useState('79.99');
  const [newStock, setNewStock] = useState('25');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80');
  const [newDescription, setNewDescription] = useState('High fidelity audio with ergonomic fit and long battery life.');
  const [newBadge, setNewBadge] = useState('New Release');

  // KPI calculations
  const totalGrossRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;
  const totalInventoryUnits = products.reduce((sum, p) => sum + p.stockCount, 0);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) {
      return false;
    }
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchPhone = order.customer.phone.includes(q);
      if (!matchNum && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const categoryNameMap: Record<CategorySlug, string> = {
      all: 'All',
      gadgets: 'Gadgets & Tech',
      clothing: 'Apparel & Streetwear',
      accessories: 'Everyday Accessories'
    };

    const priceNum = parseFloat(newPrice) || 19.99;
    const origPriceNum = parseFloat(newOriginalPrice) || priceNum;
    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    addProduct({
      name: newTitle.trim(),
      category: newCategory,
      categoryName: categoryNameMap[newCategory],
      subcategory: newSubcategory.trim(),
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercentage: discount,
      inStock: parseInt(newStock) > 0,
      stockCount: parseInt(newStock) || 10,
      badge: newBadge.trim() || undefined,
      shortDescription: newDescription.trim(),
      description: newDescription.trim(),
      features: ['Factory verified build quality', 'Standard manufacturer guarantee', 'COD ready'],
      specs: { 'Origin': 'Authentic TKR Verified' },
      images: [newImage.trim()],
      isFeatured: true
    });

    setIsAddProductOpen(false);
    setNewTitle('');
  };

  // Require admin authentication to access settings and management
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdminLoginCard />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Authenticated Administrator: {adminEmail || 'admin@tkrhub.com'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            TKR Hub Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage live cash-on-delivery orders, stock inventory, and store communication channels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/shop"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
          >
            <span>Visit Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <button
            type="button"
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            type="button"
            onClick={logoutAdmin}
            className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-bold text-xs rounded-xl border border-rose-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Log out from admin portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Total Sales (Gross)</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
            ${totalGrossRevenue.toFixed(2)}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Cash on Delivery receivables
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Total Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
            {totalOrdersCount}
          </span>
          <span className="text-[11px] text-slate-500 block">
            All customer checkout records
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Pending Fulfillment</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
            {pendingOrdersCount}
          </span>
          <span className="text-[11px] text-amber-700 font-semibold block">
            Awaiting courier transit & verification
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Catalog Inventory</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
            {totalInventoryUnits} Units
          </span>
          <span className="text-[11px] text-purple-700 font-semibold block">
            Across {products.length} live product variants
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'contact'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Contact Information</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
            Live
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'settings'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-slate-500" />
          <span>Store Settings</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'products'
              ? 'border-emerald-600 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Catalog Products ({products.length})
        </button>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by order ID, name, or phone..."
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-200 focus:outline-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:outline-emerald-500 cursor-pointer"
              >
                <option value="all">All Statuses ({orders.length})</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped (In Transit)</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Order Details</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Delivery Address</th>
                    <th className="py-3 px-4 text-right">Total (COD)</th>
                    <th className="py-3 px-4 text-center">Status Action</th>
                    <th className="py-3 px-4 text-center">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Order Details */}
                      <td className="py-3.5 px-4 align-top">
                        <span className="font-mono font-black text-slate-900 block text-xs">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1">
                          {order.items.length} item(s)
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4 align-top">
                        <span className="font-bold text-slate-900 block">
                          {order.customer.fullName}
                        </span>
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="text-[11px] text-emerald-700 hover:underline block font-semibold mt-0.5"
                        >
                          {order.customer.phone}
                        </a>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        <p className="text-slate-600 text-xs line-clamp-2">
                          {order.customer.deliveryAddress}, {order.customer.city}
                        </p>
                        {order.customer.deliveryNotes && (
                          <span className="text-[10px] text-amber-700 block mt-0.5 italic">
                            Note: {order.customer.deliveryNotes}
                          </span>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 align-top text-right">
                        <span className="font-black text-slate-900 text-sm block">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          Cash on Delivery
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 align-top text-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : order.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'Packed'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : order.status === 'Cancelled'
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Track Action Link */}
                      <td className="py-3.5 px-4 align-top text-center">
                        <Link
                          to={`/track-order?orderId=${order.orderNumber}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-emerald-600 hover:underline"
                          title="View live public tracking page"
                        >
                          <span>Track</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products Catalog Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Showing {products.length} catalog products
            </span>
            <button
              type="button"
              onClick={() => setIsAddProductOpen(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {products.map((p) => (
              <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-xl bg-slate-100 border shrink-0"
                  />
                  <div className="space-y-0.5">
                    <Link
                      to={`/product/${p.slug}`}
                      className="font-bold text-sm text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-slate-600 font-medium">{p.categoryName}</span>
                      <span>•</span>
                      <span>Stock: <strong>{p.stockCount} units</strong></span>
                      {p.badge && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">{p.badge}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900">${p.price.toFixed(2)}</span>
                    {p.originalPrice > p.price && (
                      <span className="text-xs text-slate-400 line-through block">
                        ${p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock quick adjuster */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateProduct(p.id, { stockCount: Math.max(0, p.stockCount - 5) })}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg"
                      title="Reduce stock by 5"
                    >
                      -5
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProduct(p.id, { stockCount: p.stockCount + 10 })}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg"
                      title="Add stock by 10"
                    >
                      +10
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Contact Information */}
      {activeTab === 'contact' && <AdminContactSettings />}

      {/* Tab 4: Store Settings */}
      {activeTab === 'settings' && <AdminStoreSettings />}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-black text-slate-900 text-lg">Add New Product to Store</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. TKR Carbon ANC Earbuds"
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategorySlug)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-3 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  >
                    <option value="gadgets">Gadgets & Tech</option>
                    <option value="clothing">Apparel & Streetwear</option>
                    <option value="accessories">Everyday Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder="e.g. Audio, Hoodie"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  placeholder="e.g. New Release, Limited Edition"
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
