import { AnimatePresence, motion } from "motion/react";
import {
  Modal as AriaModal,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const overlayStyles = tv({
  base: "fixed inset-0 isolate z-20 flex w-full items-center justify-center bg-black/50",
});

const modalStyles = tv({
  base: "bg-dark-slate-500 flex min-h-[228px] w-full flex-col items-center justify-center",
});

const MotionModalOverlay = motion.create(ModalOverlay);
const MotionModal = motion.create(AriaModal);

export default function Modal(props: ModalOverlayProps) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <MotionModalOverlay
          isOpen
          className={overlayStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionModal
            className={modalStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {props.children}
          </MotionModal>
        </MotionModalOverlay>
      )}
    </AnimatePresence>
  );
}
