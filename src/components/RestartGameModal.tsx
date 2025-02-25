import { ModalOverlayProps } from "react-aria-components";
import Modal from "./ui/Modal";

import Button from "./ui/Button";

interface RestartGameModalProps extends ModalOverlayProps {
  onRestart: () => void;
  onCancel: () => void;
}

export default function RestartGameModal({
  onRestart,
  onCancel,
  ...rest
}: RestartGameModalProps) {
  return (
    <Modal {...rest}>
      <h2 className="text-steel-500 text-center text-2xl leading-8 font-bold tracking-[1.5px] md:text-5xl md:leading-12 md:tracking-[2.5px]">
        RESTART GAME?
      </h2>
      <div className="mt-7 space-x-4">
        <Button onPress={onCancel} color="neutral">
          NO, CANCEL
        </Button>
        <Button onPress={onRestart} color="primary">
          YES, RESTART
        </Button>
      </div>
    </Modal>
  );
}
