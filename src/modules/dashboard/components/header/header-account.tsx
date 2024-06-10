import Image from "next/image";
import { twMerge } from "tailwind-merge";
import userAvatar from "shared/assets/user-avatar.png";
import { Popover } from "shared/ui/popover";
import metamaskLogo from "shared/assets/metamask.png";
import { IoCopy } from "react-icons/io5";
import { useToasts } from "shared/ui/toast";
import { useAccount } from "wagmi";
import { useWallets } from "modules/web3";
import ConnectWalletButton from "./connect-wallet-button";

type Props = {
  className?: string;
};

export default function HeaderAccount({ className }: Props) {
  const { disconnect } = useWallets();
  const { address } = useAccount();
  const toasts = useToasts();

  if (!address) throw new Error("Account not found");

  return (
    <div className={twMerge("ml-auto flex items-center gap-2", className)}>
      <Popover
        trigger={
          <div className={twMerge("flex items-center gap-2")}>
            <button className="flex cursor-pointer items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px] hover:bg-gray-9">
              <Image
                alt="Wallet Avatar"
                width={24}
                height={24}
                src={userAvatar}
              />
              <span className="text-xs font-semibold">$37,555.24</span>
            </button>
          </div>
        }
      >
        <div className="bg-gray-10 p-3">
          <div className="flex items-center gap-2">
            <Image
              src={metamaskLogo}
              width={24}
              height={24}
              alt="Metamask Logo"
            />
            <span>
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(address);
                toasts.addToast("Address copied to clipboard");
              }}
              className="text-purple"
            >
              <IoCopy />
            </button>
          </div>

          <button
            className="mt-2 h-[32px] w-full rounded-4 bg-gray-9 transition-colors hover:bg-gray-8"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      </Popover>
      <ConnectWalletButton />
    </div>
  );
}
