import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = {
  id: string;
  message: string;
  onClose: (id: string) => void;
};

const variants = {
  initial: { opacity: 0, y: 50, scale: 0.2 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.2 }
};

export default function Toast({ id, message, onClose }: Props) {
  return (
    <motion.div
      className={twMerge("p-4 bg-gray-10 rounded-4 shadow-lg")}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>

        <button
          className="ml-auto flex size-6 items-center justify-center rounded-4 bg-gray-10 transition-colors hover:bg-gray-8 focus:bg-gray-8 focus:outline-none"
          onClick={() => onClose(id)}
        >
          <IoClose />
        </button>
      </div>
    </motion.div>
  );
}
