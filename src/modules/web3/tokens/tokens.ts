import { Address } from "viem";
import { arbitrum, optimism } from "wagmi/chains";

export const SUPPORTED_TOKENS: {
  contractAddress?: Address;
  chainId: number;
  symbol: string;
}[] = [
  {
    chainId: optimism.id,
    symbol: "ETH"
  },
  {
    chainId: arbitrum.id,
    symbol: "ETH"
  },
  {
    contractAddress: "0x4200000000000000000000000000000000000042",
    chainId: optimism.id,
    symbol: "OP"
  },
  {
    contractAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    chainId: arbitrum.id,
    symbol: "ARB"
  },
  {
    contractAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    chainId: arbitrum.id,
    symbol: "USDC"
  },
  {
    chainId: arbitrum.id,
    symbol: "WBTC",
    contractAddress: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"
  },
  {
    chainId: arbitrum.id,
    symbol: "WETH",
    contractAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
  },
  {
    chainId: arbitrum.id,
    symbol: "LINK",
    contractAddress: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4"
  },
  {
    chainId: arbitrum.id,
    symbol: "UNI",
    contractAddress: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0"
  },
  {
    chainId: arbitrum.id,
    symbol: "USDT",
    contractAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
  },
  {
    chainId: optimism.id,
    symbol: "USDC",
    contractAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
  },
  {
    chainId: optimism.id,
    symbol: "WBTC",
    contractAddress: "0x68f180fcCe6836688e9084f035309E29Bf0A2095"
  },
  {
    chainId: optimism.id,
    symbol: "WETH",
    contractAddress: "0x4200000000000000000000000000000000000006"
  },
  {
    chainId: optimism.id,
    symbol: "LINK",
    contractAddress: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6"
  },
  {
    chainId: optimism.id,
    symbol: "UNI",
    contractAddress: "0x6fd9d7AD17242c41f7131d257212c54A0e816691"
  },
  {
    chainId: optimism.id,
    symbol: "USDT",
    contractAddress: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
  }
];

export const TOKEN_PRICES: Record<string, number> = {
  USDC: 1,
  WBTC: 71742,
  WETH: 3820,
  LINK: 17.57,
  UNI: 10.59,
  USDT: 1,
  ARB: 1.1,
  OP: 2.53,
  ETH: 3820
};
