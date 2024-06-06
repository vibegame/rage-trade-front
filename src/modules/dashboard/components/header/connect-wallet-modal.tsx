import { Modal } from "shared/ui/modal";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const wallets = [
  {
    name: "MetaMask"
  },
  {
    name: "Trust Wallet"
  }
];

type WalletItemProps = {
  name: string;
};

const WalletItem = ({ name }: WalletItemProps) => {
  return (
    <button className="w-full rounded-8 bg-gray-11 px-4 py-2 text-left transition-colors hover:bg-gray-9">
      <span className="text-gray-3">{name}</span>
    </button>
  );
};

export default function ConnectWalletModal({ isOpen, setIsOpen }: Props) {
  return (
    <Modal
      title="Connect Wallet"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="w-[400px]"
    >
      <div className="flex flex-col gap-2">
        {wallets.map((wallet, index) => (
          <WalletItem key={index} name={wallet.name} />
        ))}
      </div>
    </Modal>
  );
}
