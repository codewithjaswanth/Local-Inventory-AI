'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Boxes,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PackageX,
  AlertTriangle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { InventoryItemModel, inventoryService } from '@/services/inventory.service';
import { InventoryStatsHeader } from './InventoryStatsHeader';
import { ProductFormModal } from './ProductFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useAuth } from '@/hooks/useAuth';

interface InventoryManagerProps {
  shopId?: string;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ shopId = 'shop-1' }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItemModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search, Filter, Sort, Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'updated'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItemModel | null>(null);
  const [deletingItem, setDeletingItem] = useState<InventoryItemModel | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial data
  const fetchInventory = async () => {
    setIsLoading(true);
    const data = await inventoryService.getInventoryByShopId(shopId);
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, [shopId]);

  // Derived Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [items]);

  // Filtered & Sorted items
  const processedItems = useMemo(() => {
    let result = items.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const catMatch = item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = nameMatch || catMatch;

      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesAvailability =
        availabilityFilter === 'All' || item.availability === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    result.sort((a, b) => {
      let valA: any = a[sortBy === 'stock' ? 'stock_quantity' : sortBy === 'updated' ? 'updated_at' : sortBy];
      let valB: any = b[sortBy === 'stock' ? 'stock_quantity' : sortBy === 'updated' ? 'updated_at' : sortBy];

      if (sortBy === 'price') {
        valA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0 : a.price;
        valB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0 : b.price;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, searchTerm, categoryFilter, availabilityFilter, sortBy, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(processedItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedItems.slice(start, start + itemsPerPage);
  }, [processedItems, currentPage, itemsPerPage]);

  // Real-time Stat calculations
  const totalProducts = items.length;
  const lowStockCount = items.filter(
    (i) => i.availability === 'Low Stock' || (i.stock_quantity > 0 && i.stock_quantity <= 10)
  ).length;
  const outOfStockCount = items.filter(
    (i) => i.availability === 'Out of Stock' || i.stock_quantity <= 0
  ).length;
  const totalValue = items.reduce((acc, curr) => {
    const numPrice = typeof curr.price === 'string' ? parseFloat(curr.price.replace(/[^0-9.]/g, '')) || 0 : curr.price;
    return acc + numPrice * curr.stock_quantity;
  }, 0);

  // Optimistic Save Action
  const handleSaveProduct = async (
    productData: Omit<InventoryItemModel, 'id' | 'created_at' | 'updated_at'>
  ) => {
    if (editingItem) {
      // Optimistic update
      const tempUpdated: InventoryItemModel = {
        ...editingItem,
        ...productData,
        updated_at: new Date().toISOString()
      };
      setItems((prev) => prev.map((item) => (item.id === editingItem.id ? tempUpdated : item)));
      showToast(`Updated "${productData.name}"`);

      const res = await inventoryService.updateInventoryItem(editingItem.id, productData);
      if (res.error) {
        showToast(`Sync warning: ${res.error}`);
      }
    } else {
      // Optimistic create
      const tempId = `temp-${Date.now()}`;
      const tempCreated: InventoryItemModel = {
        id: tempId,
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setItems((prev) => [tempCreated, ...prev]);
      showToast(`Added "${productData.name}" to inventory`);

      const res = await inventoryService.createInventoryItem(productData);
      if (res.data) {
        setItems((prev) => prev.map((item) => (item.id === tempId ? res.data! : item)));
      } else if (res.error) {
        showToast(`Sync warning: ${res.error}`);
      }
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    setIsDeleting(true);
    const targetId = deletingItem.id;
    const targetName = deletingItem.name;

    // Optimistic remove
    setItems((prev) => prev.filter((item) => item.id !== targetId));
    showToast(`Deleted "${targetName}"`);

    const res = await inventoryService.deleteInventoryItem(targetId);
    setIsDeleting(false);
    setDeletingItem(null);

    if (res.error) {
      showToast(`Deletion warning: ${res.error}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center space-x-2 border border-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Stats Header */}
      <InventoryStatsHeader
        totalProducts={totalProducts}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
        totalValue={totalValue}
      />

      {/* Main Inventory Manager Container */}
      <div className="bg-[#090F1D] rounded-3xl border border-slate-800/80 shadow-2xl p-5 sm:p-6 space-y-5 overflow-hidden">
        {/* Top Action & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Boxes className="w-5 h-5 text-emerald-400" />
              <span>Supabase Inventory Module</span>
              <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {processedItems.length} Matched
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Full CRUD inventory management with Supabase RLS and Storage integration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search product or category..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition-all"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => {
                setAvailabilityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition-all font-medium"
            >
              <option value="All">All Stock Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {/* Add Product Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          /* Empty State */
          <div className="py-12 text-center space-y-3 select-none">
            <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No products found in inventory</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search criteria or category/status filters, or add a new product.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setAvailabilityFilter('All');
              }}
              className="text-xs font-medium text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Inventory Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#050A14] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800/80 select-none">
                <tr>
                  <th
                    className="p-3.5 rounded-l-2xl cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Product Item</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th className="p-3.5">Category</th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortBy('stock');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Stock Quantity</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortBy('price');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Price</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th className="p-3.5">Availability</th>
                  <th className="p-3.5">Freshness</th>
                  <th className="p-3.5 rounded-r-2xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedItems.map((item) => {
                  const isLowStock = item.availability === 'Low Stock' || (item.stock_quantity > 0 && item.stock_quantity <= 10);
                  const isOutOfStock = item.availability === 'Out of Stock' || item.stock_quantity <= 0;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors group ${
                        isOutOfStock
                          ? 'bg-rose-950/20 hover:bg-rose-900/30'
                          : isLowStock
                          ? 'bg-amber-950/20 hover:bg-amber-900/30'
                          : 'hover:bg-slate-900/70'
                      }`}
                    >
                      {/* Image & Name */}
                      <td className="p-3.5">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className={`w-10 h-10 rounded-xl object-cover border shrink-0 transition-transform group-hover:scale-105 ${
                              isOutOfStock
                                ? 'border-rose-500/50'
                                : isLowStock
                                ? 'border-amber-500/50'
                                : 'border-slate-800'
                            }`}
                          />
                          <div>
                            <span className="font-extrabold text-white text-sm block truncate max-w-[180px] sm:max-w-xs">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-500">ID: {item.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
                          {item.category}
                        </span>
                      </td>

                      {/* Stock Quantity */}
                      <td className="p-3.5">
                        <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                          {isOutOfStock && <PackageX className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                          {isLowStock && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          <span className={isOutOfStock ? 'text-rose-400' : isLowStock ? 'text-amber-400' : 'text-white'}>
                            {item.stock_quantity} {item.unit}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-3.5 font-bold text-emerald-400 text-xs">
                        {typeof item.price === 'number' ? `₹${item.price.toFixed(2)}` : item.price}
                      </td>

                      {/* Availability Status */}
                      <td className="p-3.5">
                        <StatusBadge
                          type={isOutOfStock ? 'error' : isLowStock ? 'warning' : 'success'}
                          label={item.availability}
                        />
                      </td>

                      {/* Freshness Score */}
                      <td className="p-3.5 text-xs font-bold text-teal-400">
                        {item.freshness_score ? `${item.freshness_score}%` : '98.5%'}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsFormOpen(true);
                            }}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 text-slate-400 transition-colors"
                            title="Edit Item"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingItem(item)}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:text-rose-400 text-slate-400 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!isLoading && paginatedItems.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs text-slate-400 select-none font-medium">
            <div className="flex items-center space-x-3">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, processedItems.length)} of {processedItems.length} products
              </span>

              <div className="flex items-center space-x-1.5">
                <span className="text-[11px]">Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
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
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingItem}
        shopId={shopId}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        productName={deletingItem?.name || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};
