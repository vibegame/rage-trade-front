import { createContext } from "react";
import { Chain } from "viem";
import { Address } from "viem/accounts";
import { Connector } from "wagmi";

export type Web3Token = {
  name: string;
  symbol: string;
  balance: bigint;
  chainId: number;
  decimals: number;
  wallet: Wallet;
  address: Address;
  value: {
    usd: number;
  };
};

export type Wallet = {
  accounts: readonly [Address, ...Address[]];
  connector: {
    name: string;
    icon: string;
  };
};

export type WalletsContextType = {
  wallets: Wallet[];
  connect: ({ connector }: { connector: any }) => void;
  disconnect: () => void;
  connectors: readonly Connector[];
  tokens: Web3Token[];
  fullBalance: number;
  walletsBalances: Record<string, number>;
  chainsBalances: Record<number, number>;
  chains: readonly [Chain, ...Chain[]];
};

export const WalletsContext = createContext<WalletsContextType>(null as any);
