'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSigningOut?: boolean;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSigningOut = false,
}) => {
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSigningOut) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSigningOut, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop Blur & Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={!isSigningOut ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 overflow-hidden text-slate-100"
          >
            {/* Close Cross Button */}
            {!isSigningOut && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Logout Warning Icon */}
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
              <LogOut className="w-7 h-7 text-rose-400" />
            </div>

            {/* Title & Message */}
            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-extrabold text-white tracking-tight">Sign out?</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Are you sure you want to sign out of your account?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <AnimatedButton
                type="button"
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={onClose}
                disabled={isSigningOut}
              >
                Cancel
              </AnimatedButton>

              <AnimatedButton
                type="button"
                variant="danger"
                size="md"
                className="flex-1"
                onClick={onConfirm}
                isLoading={isSigningOut}
              >
                Sign Out
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
