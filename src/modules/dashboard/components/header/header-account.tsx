import Image from "next/image";
import { twMerge } from "tailwind-merge";
import userAvatar from "shared/assets/user-avatar.png";
import { Popover } from "shared/ui/popover";
import { IoCopy, IoLogOut } from "react-icons/io5";
import { useToasts } from "shared/ui/toast";
import ConnectWalletButton from "./connect-wallet-button";
import { useAccount, useDisconnect } from "wagmi";
import { Spinner } from "shared/ui/spinner";
import { useTokens } from "modules/web3/tokens";

type Props = {
  className?: string;
};

export default function HeaderAccount({ className }: Props) {
  const { connector, address, isConnected } = useAccount();
  const { disconnectAsync, isPending: isDisconnecting } = useDisconnect();
  const { accountBalance } = useTokens();
  const toasts = useToasts();

  return (
    <div className={twMerge("ml-auto flex items-center gap-2", className)}>
      {!isConnected && <ConnectWalletButton />}

      {!!connector && !!address && (
        <>
          <button className="flex h-9 cursor-pointer items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 hover:bg-gray-9">
            <Image
              alt="Wallet Avatar"
              width={24}
              height={24}
              src={userAvatar}
            />
            <span className="text-xs font-semibold">
              ${accountBalance.toFixed(2)}
            </span>
          </button>
          <Popover
            trigger={
              <button className="flex size-9 items-center justify-center gap-2 rounded-4 bg-gray-10 hover:bg-gray-9">
                <IoLogOut />
              </button>
            }
          >
            <div className="flex flex-col gap-2 bg-gray-10 p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={connector.icon || ""}
                  width={24}
                  height={24}
                  alt="Metamask Logo"
                />
                <div key={address} className="flex items-center gap-1">
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
              </div>

              <button
                className="mt-2 inline-flex h-[32px] w-full items-center justify-center gap-2 rounded-4 bg-gray-9 transition-colors hover:bg-gray-8"
                onClick={() => {
                  disconnectAsync();
                }}
              >
                <span>Disconnect</span>
                {isDisconnecting && <Spinner />}
              </button>
            </div>
          </Popover>
        </>
      )}
    </div>
  );
}
