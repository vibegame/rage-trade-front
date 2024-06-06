"use client";

import { createContext } from "react";

interface ToastsContextProps {
  addToast: (message: string) => void;
}

export const ToastsContext = createContext<ToastsContextProps | undefined>(
  undefined
);
