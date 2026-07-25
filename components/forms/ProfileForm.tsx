'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { Button } from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';

interface ProfileFormProps {
  user: UserProfile;
  onSave?: (updated: UserProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [preferredRadius, setPreferredRadius] = useState(user.preferredRadius);

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      phone,
      address,
      preferredRadius,
    };
    onSave?.(updated);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          Profile preferences updated successfully!
        </div>
      )}
      <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500" />
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
            {user.tier}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Preferred Radius (Miles)</label>
          <select
            value={preferredRadius}
            onChange={(e) => setPreferredRadius(parseFloat(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          >
            <option value={0.5}>0.5 Miles</option>
            <option value={1.0}>1.0 Miles</option>
            <option value={2.0}>2.0 Miles</option>
            <option value={5.0}>5.0 Miles</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Default Delivery / Pickup Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <Button type="submit" variant="primary" size="md" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
        Save Profile Changes
      </Button>
    </form>
  );
};
