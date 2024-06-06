import { cloneElement, HTMLProps, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId
} from "@floating-ui/react";
import { twMerge } from "tailwind-merge";
import { motion, Variants } from "framer-motion";

type Props = {
  trigger: React.ReactElement<HTMLProps<any>>;
  children: React.ReactNode;
  className?: string;
};

const effect: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

export default function Popover({ trigger, children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start"
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  const headingId = useId();

  return (
    <>
      {cloneElement(trigger, {
        ref: refs.setReference,
        ...getReferenceProps()
      })}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <motion.div
              className={twMerge("", className)}
              variants={effect}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </motion.div>
        </FloatingFocusManager>
      )}
    </>
  );
}
