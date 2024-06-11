"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnectors } from "wagmi";
import { TokensContext } from "./tokens-context";
import { Address, formatUnits } from "viem";
import { arbitrum } from "viem/chains";
import { getBalance } from "wagmi/actions";
import groupBy from "lodash-es/groupBy";
import { SUPPORTED_TOKENS, TOKEN_PRICES } from "./tokens";
import { fetchHyperliquidBalance } from "../hyperliquid";
import { AccountToken, HyperliquidToken } from "./types";
import { walletsLogoMap } from "shared/assets";
import { wagmiConfig } from "../wagmi";

type TokensProviderProps = {
  children: React.ReactNode;
};

const TokensProvider = ({ children }: TokensProviderProps) => {
  const [accountTokens, setAccountTokens] = useState<AccountToken[]>([]);
  const [hyperliquidTokens, setHyperliquidTokens] = useState<
    HyperliquidToken[]
  >([]);
  const { connector: accountConnector, address: accountAddress } = useAccount();
  const connectors = useConnectors();

  const connector = connectors.find((c) => c.id === accountConnector?.id);

  const accountBalance = accountTokens.reduce((acc, token) => {
    const price = TOKEN_PRICES[token.symbol];
    return acc + Number(token.balance.token) * price;
  }, 0);

  const hyperliquidBalance = hyperliquidTokens.reduce(
    (acc, token) => acc + token.balance.usd,
    0
  );

  const fullBalance = accountBalance + hyperliquidBalance;

  const tokensByChain = groupBy(accountTokens, (token) => token.chainId);

  let chainsBalances: Record<number, number> = {};

  Object.entries(tokensByChain).forEach(([chainId, tokens]) => {
    chainsBalances[Number(chainId)] = tokens.reduce((acc, token) => {
      const price = TOKEN_PRICES[token.symbol];
      return acc + Number(token.balance.token) * price;
    }, 0);
  });

  useEffect(() => {
    const getTokensBalance = async (
      accountAddress: Address
    ): Promise<AccountToken[]> => {
      const awaitedTokens = await Promise.all(
        SUPPORTED_TOKENS.map(async ({ contractAddress, chainId, symbol }) => ({
          symbol,
          chainId,
          data: await getBalance(wagmiConfig, {
            address: accountAddress,
            chainId: chainId as any,
            token: contractAddress
          }),
          contractAddress
        }))
      );

      return awaitedTokens.map(({ data, chainId, symbol, contractAddress }) => {
        const tokenBalance = formatUnits(data.value, data.decimals);

        return {
          type: "account",
          name: data.symbol,
          symbol,
          decimals: data.decimals,
          chainId,
          balance: {
            usd: TOKEN_PRICES[symbol] * Number(tokenBalance),
            token: tokenBalance
          },
          accountAddress,
          contractAddress: contractAddress!,
          connector: connector!
        };
      });
    };

    if (accountAddress) {
      getTokensBalance(accountAddress).then(setAccountTokens);
    } else {
      setAccountTokens([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountAddress]);

  useEffect(() => {
    if (accountAddress) {
      fetchHyperliquidBalance(accountAddress).then((res) => {
        setHyperliquidTokens(
          res.data.balances.map((balance) => ({
            type: "hyperliquid",
            name: balance.coin,
            symbol: balance.coin,
            chainId: arbitrum.id,
            accountAddress,
            connector: {
              name: "Hyperliquid",
              icon: walletsLogoMap.hyperliquid
            },
            balance: {
              usd: Number(balance.total),
              token: balance.total
            }
          }))
        );
      });
    }
  }, [accountAddress]);

  return (
    <TokensContext.Provider
      value={{
        accountTokens,
        accountBalance,
        chainsBalances,
        hyperliquidTokens,
        hyperliquidBalance,
        fullBalance
      }}
    >
      {children}
    </TokensContext.Provider>
  );
};

export default TokensProvider;
