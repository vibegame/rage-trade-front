import { useWallets } from "modules/web3";
import Image from "next/image";
import { Modal } from "shared/ui/modal";
import { twMerge } from "tailwind-merge";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type WalletItemProps = {
  name: string;
  onClick?: () => void;
  icon: string;
  active: boolean;
};

const WalletItem = ({ name, icon, onClick, active }: WalletItemProps) => {
  return (
    <button
      className={twMerge(
        "flex w-full items-center gap-2 rounded-8 bg-gray-11 px-4 py-2 text-left transition-colors ",
        active ? "bg-gray-10 cursor-auto" : "hover:bg-gray-9"
      )}
      onClick={active ? undefined : onClick}
    >
      <Image src={icon} width={24} height={24} alt={name} />
      <span className="text-gray-3">{name}</span>
      <div className="ml-auto flex items-center gap-1">
        <span className="size-1 rounded-full bg-[#26ff4a]"></span>
        <span className="text-xs font-semibold">Connected</span>
      </div>
    </button>
  );
};

export default function ConnectWalletModal({ isOpen, setIsOpen }: Props) {
  const { wallets, connect, connectors } = useWallets();

  return (
    <Modal
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="w-[400px]"
    >
      <div className="flex flex-col gap-2">
        {connectors
          .filter((connector) => connector.id !== "injected")
          .map((connector, index) => {
            const active = wallets.some(
              (wallet) => wallet.connector.name === connector.name
            );

            return (
              <WalletItem
                key={index}
                name={connector.name}
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false);
                }}
                icon={connector.icon || ""}
                active={active}
              />
            );
          })}
      </div>
    </Modal>
  );
}
