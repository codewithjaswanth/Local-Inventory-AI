'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

interface ReviewCardProps {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  itemPurchased?: string;
  verifiedPurchase?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  avatar,
  rating,
  date,
  comment,
  itemPurchased,
  verifiedPurchase = true,
}) => {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover border border-emerald-500" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
              {author}
              {verifiedPurchase && (
                <span className="ml-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {itemPurchased ? `Purchased: ${itemPurchased} • ` : ''}{date}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-amber-400 font-bold text-xs bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-xl">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        "{comment}"
      </p>
    </Card>
  );
};
