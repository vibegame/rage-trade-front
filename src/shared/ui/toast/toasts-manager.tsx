"use client";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import Toast from "./toast";
import { ToastsContext } from "./toasts-context";

type ToastsManagerProps = {
  children: React.ReactNode;
};

type ToastItem = {
  id: string;
  message: string;
};

const ToastsManager = ({ children }: ToastsManagerProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string) => {
    const id = nanoid();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return (
    <ToastsContext.Provider value={{ addToast: addToast }}>
      {children}
      <div className="fixed bottom-5 left-1/2 w-[350px] -translate-x-1/2 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastsContext.Provider>
  );
};

export default ToastsManager;
