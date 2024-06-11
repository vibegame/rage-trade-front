import { useTokens } from "modules/web3/tokens";
import Image from "next/image";
import { useState } from "react";
import { chainLogoMap, tokensLogoMap } from "shared/assets";
import { Input } from "shared/ui/input";
import { Modal } from "shared/ui/modal";
import { useToasts } from "shared/ui/toast";
import { Address, erc20Abi, parseEther, parseUnits } from "viem";
import {
  useChains,
  useSendTransaction,
  useSwitchChain,
  useWriteContract
} from "wagmi";

export type PrepareTransaction = {
  accountAddress: Address;
  token: {
    address?: Address;
    symbol: string;
    decimals: number;
    chainId: number;
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  prepare: PrepareTransaction;
};

export default function SendTransactionModal({
  isOpen,
  onClose,
  prepare
}: Props) {
  const { accountTokens } = useTokens();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const toasts = useToasts();
  const chains = useChains();

  const chain = chains.find((chain) => chain.id === prepare.token.chainId)!;

  const sendEtherTransaction = async () => {
    try {
      await switchChainAsync({ chainId: prepare.token.chainId });
      await sendTransactionAsync({
        chainId: prepare.token.chainId,
        to: address as Address,
        value: parseEther(amount)
      });

      toasts.addToast("Transaction successfully sent");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        toasts.addToast(e.message);
      }
    }
  };

  const sendTokenTransaction = async () => {
    try {
      await switchChainAsync({ chainId: prepare.token.chainId });

      await writeContractAsync({
        abi: erc20Abi,
        args: [address as Address, parseUnits(amount, 6)],
        chainId: prepare.token.chainId,
        address: prepare.token.address!,
        functionName: "transfer"
      });

      toasts.addToast("Transaction successfully sent");
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        toasts.addToast(e.message);
      }
    }
  };

  return (
    <Modal
      title="Send Transaction"
      isOpen={isOpen}
      onClose={() => onClose()}
      className="w-[400px]"
    >
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-5">From:</span>
          <span>{prepare.accountAddress}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-5">Token:</span>
          <div className="flex items-center gap-2">
            <span>{prepare.token.symbol}</span>
            <Image
              src={tokensLogoMap[prepare.token.symbol]}
              width={16}
              height={16}
              alt="Token Logo"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-5">Chain:</span>
          <div className="flex items-center gap-2">
            <span>{chain.name}</span>
            <Image
              src={chainLogoMap[chain.id]}
              width={16}
              height={16}
              alt="Chain Logo"
            />
          </div>
        </div>
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={async (event) => {
          event.preventDefault();

          if (prepare.token.address === undefined) {
            return sendEtherTransaction();
          } else {
            return sendTokenTransaction();
          }
        }}
      >
        <Input
          label="Address"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <div className="flex items-end">
          <Input
            label="Amount"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            className="ml-2 h-[34px] text-xs text-purple"
            onClick={() => {
              const token = accountTokens.find(
                (token) => token.symbol === prepare.token.symbol
              );

              if (!token) return;

              setAmount(token.balance.token);
            }}
          >
            Max
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 h-[36px] rounded-4 border border-gray-10 bg-gray-10 px-5 text-center transition-colors hover:bg-gray-8 disabled:cursor-not-allowed disabled:hover:bg-gray-10"
        >
          <span className="text-xs font-semibold text-gray-1">Send</span>
        </button>
      </form>
    </Modal>
  );
}
