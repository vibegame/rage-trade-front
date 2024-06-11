import { createContext } from "react";
import { AccountToken, HyperliquidToken } from "./types";

export type TokensContextType = {
  accountTokens: AccountToken[];
  accountBalance: number;
  hyperliquidBalance: number;
  hyperliquidTokens: HyperliquidToken[];
  chainsBalances: Record<number, number>;
  fullBalance: number;
};

export const TokensContext = createContext<TokensContextType>(null as any);
