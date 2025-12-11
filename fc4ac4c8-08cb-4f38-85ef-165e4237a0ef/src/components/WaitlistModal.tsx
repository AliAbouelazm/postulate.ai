import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { api, WaitlistRequest } from '../services/api';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'CREATOR' | 'COMPANY';
}

export function WaitlistModal({ isOpen, onClose, type }: WaitlistModalProps) {
  const [formData, setFormData] = useState<WaitlistRequest>({
    email: '',
    name: '',
    type,
    company: type === 'COMPANY' ? '' : undefined,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await api.joinWaitlist(formData);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({
          email: '',
          name: '',
          type,
          company: type === 'COMPANY' ? '' : undefined,
          message: '',
        });
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to join waitlist'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-amber-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                  <p className="text-gray-400">
                    We'll notify you when we launch. Thanks for your interest!
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    Join {type === 'CREATOR' ? 'Creator' : 'Company'} Waitlist
                  </h2>
                  <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    Be among the first to access postulate.ai
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {type === 'COMPANY' && (
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium mb-2"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="Company name"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                        placeholder="Tell us what you're looking for..."
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

