import Image from "next/image";
import { Modal } from "shared/ui/modal";
import { twMerge } from "tailwind-merge";
import { useConnect } from "wagmi";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type WalletItemProps = {
  name: string;
  onClick?: () => void;
  icon: string;
};

const WalletItem = ({ name, icon, onClick }: WalletItemProps) => {
  return (
    <button
      className={twMerge(
        "flex w-full items-center gap-2 rounded-8 bg-gray-11 px-4 py-2 text-left transition-colors "
      )}
      onClick={onClick}
    >
      <Image src={icon} width={24} height={24} alt={name} />
      <span className="text-gray-3">{name}</span>
    </button>
  );
};

export default function ConnectWalletModal({ isOpen, setIsOpen }: Props) {
  const { connect, connectors } = useConnect();

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
            return (
              <WalletItem
                key={index}
                name={connector.name}
                onClick={() => {
                  connect({ connector });
                  setIsOpen(false);
                }}
                icon={connector.icon || ""}
              />
            );
          })}
      </div>
    </Modal>
  );
}
