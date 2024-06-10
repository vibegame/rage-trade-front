"use client";
import { useEffect, useState } from "react";
import { Connector, useChains, useConnect, useDisconnect } from "wagmi";
import { Wallet, WalletsContext, Web3Token } from "./wallets-context";
import { Address, erc20Abi } from "viem";
import { arbitrum, optimism } from "viem/chains";
import { readContracts } from "wagmi/actions";
import { wagmiConfig } from "modules/app/wagmi";
import groupBy from "lodash-es/groupBy";

type WalletsProviderProps = {
  children: React.ReactNode;
};

const persistKey = "wallets";

const arbitrumTokenAdresses = {
  USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  WBTC: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
  WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  LINK: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
  UNI: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
  USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  ARB: "0x912CE59144191C1204E64559FE8253a0e49E6548"
} as const;

const optimismTokenAddresses = {
  USDC: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  WBTC: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
  WETH: "0x4200000000000000000000000000000000000006",
  LINK: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
  UNI: "0x6fd9d7AD17242c41f7131d257212c54A0e816691",
  USDT: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
  OP: "0x4200000000000000000000000000000000000042"
} as const;

const prices: Record<string, number> = {
  USDC: 1,
  WBTC: 71742,
  WETH: 3820,
  LINK: 17.57,
  UNI: 10.59,
  USDT: 1,
  ARB: 1.1,
  OP: 2.53
};

const WalletsProvider = ({ children }: WalletsProviderProps) => {
  const { connectAsync: wagmiConnect, connectors } = useConnect();
  const chains = useChains();
  const { disconnect: wagmiDisconect } = useDisconnect();

  const [tokens, setTokens] = useState<Web3Token[]>([]);

  const [wallets, setWallets] = useState<Wallet[]>(() => {
    if (typeof window !== "undefined") {
      const wallets = window.localStorage.getItem(persistKey);
      return wallets ? JSON.parse(wallets) : [];
    }

    return [];
  });

  const getWalletTokensBalance = async (
    wallet: Wallet
  ): Promise<Web3Token[]> => {
    const result = await Promise.all(
      wallet.accounts.map((address) => {
        return getTokensBalance(address, wallet);
      })
    );

    return result.flat();
  };

  useEffect(() => {
    wallets.forEach((wallet) =>
      getWalletTokensBalance(wallet).then((tokens) =>
        setTokens((prev) => [...prev, ...tokens])
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTokensBalance = async (
    address: Address,
    wallet: Wallet
  ): Promise<Web3Token[]> => {
    const promises = await Promise.all([
      ...Object.values(arbitrumTokenAdresses)
        .map((tokenAddress) => [
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address!],
            chainId: arbitrum.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "name",
            chainId: arbitrum.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
            chainId: arbitrum.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "symbol",
            chainId: arbitrum.id
          }
        ])
        .map(async (contracts) => {
          return {
            data: await readContracts(wagmiConfig, { contracts }),
            chainId: arbitrum.id
          };
        }),
      ...Object.values(optimismTokenAddresses)
        .map((tokenAddress) => [
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address!],
            chainId: optimism.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "name",
            chainId: optimism.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
            chainId: optimism.id
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "symbol",
            chainId: optimism.id
          }
        ])
        .map(async (contracts) => {
          return {
            data: await readContracts(wagmiConfig, { contracts }),
            chainId: optimism.id
          };
        })
    ]);

    return promises
      .filter(({ data: [balance] }) => typeof balance.result === "bigint")
      .map(({ data: [balance, name, decimals, symbol], chainId }) => ({
        balance: balance.result as bigint,
        name: name.result as string,
        symbol: symbol.result as string,
        decimals: decimals.result as number,
        chainId,
        address,
        wallet,
        value: {
          usd:
            prices[symbol.result as string] * Number(balance.result as bigint)
        }
      }));
  };

  const connect = async ({ connector }: { connector: Connector }) => {
    const res = await wagmiConnect({ connector });

    const newWallet = {
      accounts: res.accounts,
      connector: {
        name: connector.name,
        icon: connector.icon || ""
      }
    };

    const newTokens = await getWalletTokensBalance(newWallet);

    setTokens((prev) => [...prev, ...newTokens]);

    const newWallets = [...wallets, newWallet];

    setWallets(newWallets);
    localStorage.setItem(persistKey, JSON.stringify(newWallets));
  };

  const disconnect = () => {
    setWallets([]);
    localStorage.removeItem(persistKey);
    wagmiDisconect();
  };

  const fullBalance = tokens.reduce((acc, token) => {
    const price = prices[token.symbol];
    return acc + Number(token.balance) * price;
  }, 0);

  const tokensByWallet = groupBy(
    tokens,
    (token) => token.wallet.connector.name
  );

  const tokensByChain = groupBy(tokens, (token) => token.chainId);

  let walletsBalances: Record<string, number> = {};
  let chainsBalances: Record<number, number> = {};

  Object.entries(tokensByWallet).forEach(([walletName, tokens]) => {
    walletsBalances[walletName] = tokens.reduce((acc, token) => {
      const price = prices[token.symbol];
      return acc + Number(token.balance) * price;
    }, 0);
  });

  Object.entries(tokensByChain).forEach(([chainId, tokens]) => {
    chainsBalances[Number(chainId)] = tokens.reduce((acc, token) => {
      const price = prices[token.symbol];
      return acc + Number(token.balance) * price;
    }, 0);
  });

  return (
    <WalletsContext.Provider
      value={{
        wallets,
        disconnect,
        connect,
        connectors,
        tokens,
        fullBalance,
        walletsBalances,
        chainsBalances,
        chains
      }}
    >
      {children}
    </WalletsContext.Provider>
  );
};

export default WalletsProvider;
