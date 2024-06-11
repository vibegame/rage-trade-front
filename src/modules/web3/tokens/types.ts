import { StaticImageData } from "next/image";
import { Address } from "viem";
import { Connector } from "wagmi";
import { arbitrum } from "wagmi/chains";

export type AccountToken = {
  type: "account";
  name: string;
  symbol: string;
  chainId: number;
  decimals: number;
  accountAddress: Address;
  contractAddress: Address;
  connector: Connector;
  balance: {
    token: string;
    usd: number;
  };
};

export type HyperliquidToken = {
  type: "hyperliquid";
  name: string;
  chainId: typeof arbitrum.id;
  symbol: string;
  accountAddress: Address;
  connector: {
    name: "Hyperliquid";
    icon: StaticImageData | string;
  };
  balance: {
    token: string;
    usd: number;
  };
};
