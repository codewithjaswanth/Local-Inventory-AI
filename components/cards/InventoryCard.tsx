'use client';

import React from 'react';
import { StockItem } from '@/types';
import { Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface InventoryCardProps {
  item: StockItem;
  shopName?: string;
  onReserve?: (item: StockItem) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ item, shopName, onReserve }) => {
  return (
    <Card className="group p-5 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="emerald">{item.category}</Badge>
          <Badge variant="amber" icon={<Sparkles className="w-3 h-3 text-amber-500" />}>
            {item.freshnessScore}% AI Fresh
          </Badge>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700/60 shadow-xs">
            <img
              src={item.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80"}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80';
              }}
            />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center font-medium">
              <Clock className="w-3 h-3 text-slate-400 mr-1" />
              Updated {item.lastUpdated}
            </p>
            <div className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 inline-flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
              <span>In Stock Verified ({item.availableQty || 20})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">₹{item.price}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">/{item.unit}</span>
        </div>

        <Button
          onClick={() => onReserve?.(item)}
          variant="secondary"
          size="sm"
        >
          Reserve Item
        </Button>
      </div>
    </Card>
  );
};
