"use client";
import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";

const effect = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30
    }
  },
  exit: {
    y: "100vh",
    opacity: 0
  }
};

interface BackdropProps {
  handleClose: () => void;
  children: ReactNode;
}

const Backdrop = ({ children, handleClose }: BackdropProps) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    onClick={handleClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

interface ModalContentProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const ModalContent = ({
  children,
  onClose,
  title,
  className
}: ModalContentProps) => (
  <motion.div
    tabIndex={-1}
    role="dialog"
    aria-modal="true"
    className={twMerge("bg-gray-12 rounded-12 p-3", className)}
    variants={effect}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={(event) => event.stopPropagation()}
  >
    <div className="mb-4 flex items-center">
      <h4 className="text-lg font-semibold">{title}</h4>
      <button
        className="ml-auto flex size-6 items-center justify-center rounded-4 bg-gray-10 transition-colors hover:bg-gray-8 focus:bg-gray-8 focus:outline-none"
        onClick={onClose}
      >
        <IoClose />
      </button>
    </div>
    {children}
  </motion.div>
);

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Modal = ({ isOpen, onClose, children, className, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (!isOpen || event.key !== "Escape") return;
      onClose();
    }

    setIsBrowser(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isOpen]);

  if (!isBrowser) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Backdrop handleClose={onClose}>
          <FocusLock>
            <ModalContent title={title} className={className} onClose={onClose}>
              {children}
            </ModalContent>
          </FocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
