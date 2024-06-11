import axios from "axios";
import { Address } from "viem";

const hyperliquidClient = axios.create({
  baseURL: "https://api.hyperliquid.xyz",
  headers: {
    "Content-Type": "application/json"
  }
});

export const fetchHyperliquidBalance = async (accountAddress: Address) => {
  return hyperliquidClient.post<{
    balances: {
      coin: string;
      hold: string;
      total: string;
    }[];
  }>("/info", {
    type: "spotClearinghouseState",
    user: accountAddress
  });
};

export const fetchHyperliquidTokensCosts = async () => {
  return hyperliquidClient.post<Record<string, string>>("/info", {
    type: "allMids"
  });
};
