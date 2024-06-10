import { useState } from "react";
import { Modal } from "shared/ui/modal";
import { useToasts } from "shared/ui/toast";
import { Address, parseEther } from "viem";
import { useSendTransaction } from "wagmi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chainId: number;
};

export default function SendTransactionModal({
  isOpen,
  onClose,
  chainId
}: Props) {
  const [loading, setLoading] = useState(false);
  const { sendTransaction } = useSendTransaction();
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const toasts = useToasts();

  return (
    <Modal
      title="Send Transation"
      isOpen={isOpen}
      onClose={() => onClose()}
      className="w-[400px]"
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            setLoading(true);
            await sendTransaction({
              chainId,
              to: address as Address,
              value: parseEther(value)
            });
            toasts.addToast("Transaction successfully sent");
            onClose();
          } catch (e) {
            if (e instanceof Error) {
              toasts.addToast(e.message);
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-1">Address</span>
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="rounded-4 border border-gray-10 bg-gray-11 px-3 py-2 font-sans text-xs text-gray-1 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-1">Amount</span>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="rounded-4 border border-gray-10 bg-gray-11 px-3 py-2 font-sans text-xs text-gray-1 outline-none"
          />
        </label>
        <button
          className="mt-2 h-[36px] rounded-4 border border-gray-10 bg-gray-10 px-5 text-center transition-colors hover:bg-gray-8 disabled:cursor-not-allowed disabled:hover:bg-gray-10"
          disabled={loading}
        >
          <span className="text-xs font-semibold text-gray-1">Send</span>
        </button>
      </form>
    </Modal>
  );
}
