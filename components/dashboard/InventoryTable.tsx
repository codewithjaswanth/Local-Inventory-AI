'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Boxes,
  Plus,
  AlertTriangle,
  CheckCircle2,
  PackageX,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  unit: string;
  image: string;
  freshnessScore: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

interface InventoryTableProps {
  products: ProductItem[];
  onEditProduct: (product: ProductItem) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProductClick: () => void;
  isLoading?: boolean;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onAddProductClick,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', 'Toys & Games', 'Hardware & Tools', 'Party Supplies', 'Pet Care', 'Gardening', 'Beauty & Cosmetics', 'Baby Care', 'Auto Accessories', 'Pooja Essentials', 'Sewing & Crafts', 'Travel Accessories', 'Footwear Care'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white dark:bg-[#090F1D] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl dark:shadow-2xl p-5 sm:p-6 space-y-5 overflow-hidden transition-colors">
      {/* Header Bar & Search/Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-5">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Boxes className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span>Active Produce Catalog</span>
            <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {filteredProducts.length} Items
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time live inventory catalog synchronized with local shoppers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search produce name or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={onAddProductClick}
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-glow-emerald transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-3 py-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        /* Empty State */
        <div className="py-12 text-center space-y-3">
          <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No produce matches your current search or category filter. Try clearing filters or add a new product.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="text-xs text-emerald-400 hover:underline font-medium"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80 select-none">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Item</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Stock Qty</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">AI Freshness</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-2xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {paginatedProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/70 transition-colors group">
                  {/* Image & Product Name */}
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div>
                        <span className="font-extrabold text-white text-sm block truncate max-w-[180px] sm:max-w-xs">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Updated {p.lastUpdated}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
                      {p.category}
                    </span>
                  </td>

                  {/* Stock Level */}
                  <td className="p-3.5">
                    <div className="text-xs font-bold text-white">
                      {p.stock} <span className="text-[10px] text-slate-400 font-normal">{p.unit}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-3.5 font-bold text-emerald-400 text-xs">{p.price}</td>

                  {/* Freshness Score */}
                  <td className="p-3.5 text-xs font-bold text-teal-400">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span>{p.freshnessScore}%</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <StatusBadge
                      type={
                        p.status === 'In Stock'
                          ? 'success'
                          : p.status === 'Low Stock'
                          ? 'warning'
                          : 'error'
                      }
                      label={p.status}
                    />
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        type="button"
                        onClick={() => onEditProduct(p)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 text-slate-400 transition-colors"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:text-rose-400 text-slate-400 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {!isLoading && paginatedProducts.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-mono text-slate-400">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
          </span>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
