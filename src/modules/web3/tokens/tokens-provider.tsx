"use client";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChains, useConnectors } from "wagmi";
import { TokensContext } from "./tokens-context";
import { formatUnits } from "viem";
import { arbitrum } from "viem/chains";
import groupBy from "lodash-es/groupBy";
import { loadChainTokens, TOKEN_PRICES } from "./tokens";
import { fetchHyperliquidBalance } from "../hyperliquid";
import { AccountToken, HyperliquidToken } from "./types";
import { walletsLogoMap } from "shared/assets";
import { arbConfig, opConfig } from "../wagmi";

type TokensProviderProps = {
  children: React.ReactNode;
};

const TokensProvider = ({ children }: TokensProviderProps) => {
  const chains = useChains();
  const {
    connector: accountConnector,
    address: accountAddress,
    isDisconnected
  } = useAccount();
  const connectors = useConnectors();
  const [accountTokens, setAccountTokens] = useState<AccountToken[]>([]);
  const [hyperliquidTokens, setHyperliquidTokens] = useState<
    HyperliquidToken[]
  >([]);

  const connector = useMemo(
    () => connectors.find((connector) => connector.id === accountConnector?.id),
    [accountConnector, connectors]
  );

  const accountBalance = useMemo(
    () => accountTokens.reduce((acc, token) => acc + token.balance.usd, 0),
    [accountTokens]
  );

  const hyperliquidBalance = useMemo(
    () => hyperliquidTokens.reduce((acc, token) => acc + token.balance.usd, 0),
    [hyperliquidTokens]
  );

  const fullBalance = accountBalance + hyperliquidBalance;

  const chainsBalances = useMemo(() => {
    const tokensByChain = groupBy(accountTokens, "chainId");

    const res: Record<number, number> = {};

    Object.entries(tokensByChain).forEach(([chainId, tokens]) => {
      res[Number(chainId)] = tokens.reduce((acc, token) => {
        const price = TOKEN_PRICES[token.symbol];
        return acc + Number(token.balance.token) * price;
      }, 0);
    });

    return res;
  }, [accountTokens]);

  useEffect(() => {
    if (accountAddress) {
      const loadTokens = async () => {
        const tokens = (
          await Promise.all(
            [arbConfig, opConfig].map((config) =>
              loadChainTokens(config, accountAddress)
            )
          )
        ).flat();

        setAccountTokens(
          tokens.map((token) => {
            const tokenBalance = formatUnits(token.value, token.decimals);

            return {
              type: "account",
              name: token.symbol,
              symbol: token.symbol,
              decimals: token.decimals,
              chainId: token.chainId,
              balance: {
                usd: TOKEN_PRICES[token.symbol] * Number(tokenBalance),
                token: tokenBalance
              },
              accountAddress,
              contractAddress: token.contractAddress,
              connector: connector!
            };
          })
        );
      };

      loadTokens();
    }
  }, [accountAddress, chains, connector]);

  // Load Hyperliquid balance
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

  useEffect(() => {
    if (isDisconnected) {
      setAccountTokens([]);
      setHyperliquidTokens([]);
    }
  }, [isDisconnected]);

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
