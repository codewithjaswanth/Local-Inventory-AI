'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, Loader2 } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

export interface ConfirmLogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSigningOut?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | HTMLElement>;
}

export const ConfirmLogoutDialog: React.FC<ConfirmLogoutDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isSigningOut = false,
  triggerRef,
}) => {
  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus management, Escape key listener & Enter key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape' && !isSigningOut) {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
      } else if (e.key === 'Enter' && !isSigningOut) {
        e.preventDefault();
        onConfirm();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const focusTimer = setTimeout(() => confirmBtnRef.current?.focus(), 50);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(focusTimer);
      };
    }
  }, [isOpen, isSigningOut, onClose, onConfirm, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 selection:bg-rose-500/30"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-logout-title"
          aria-describedby="confirm-logout-description"
        >
          {/* Backdrop Blur & Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={!isSigningOut ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[999998]"
          />

          {/* Modal Dialog Card (Centered perfectly in viewport) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[999999] w-full max-w-sm bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 overflow-hidden text-slate-900 dark:text-slate-100 my-auto"
          >
            {/* Close Cross Button */}
            {!isSigningOut && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close confirmation dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Logout Warning Badge */}
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 text-rose-500 dark:text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
              <LogOut className="w-7 h-7" />
            </div>

            {/* Title & Message */}
            <div className="text-center space-y-1.5">
              <h3 id="confirm-logout-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Confirm Logout
              </h3>
              <p id="confirm-logout-description" className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                Are you sure you want to log out?
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

              <button
                ref={confirmBtnRef}
                type="button"
                disabled={isSigningOut}
                onClick={onConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 active:scale-95 transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <span>OK</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Backwards-compatible alias for LogoutModal
export const LogoutModal = ConfirmLogoutDialog;
