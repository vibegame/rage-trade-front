import { useContext } from "react";
import { ToastsContext } from "./toasts-context";

const useToasts = () => {
  const context = useContext(ToastsContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};

export default useToasts;
