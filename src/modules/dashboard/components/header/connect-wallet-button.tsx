import { ButtonHTMLAttributes, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import ConnectWalletModal from "./connect-wallet-modal";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ConnectWalletButton({
  className,
  ...restProps
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        {...restProps}
        className={twMerge(
          "border border-gray-10 bg-gray-10 hover:bg-gray-8 h-[36px] px-5 rounded-4 transition-colors flex items-center",
          className
        )}
        onClick={(event) => {
          setIsOpen(true);
          restProps.onClick && restProps.onClick(event);
        }}
      >
        <IoWallet size={16} />
        <span className="ml-2 text-xs font-semibold text-gray-1">
          Connect Wallet
        </span>
      </button>
      <ConnectWalletModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
