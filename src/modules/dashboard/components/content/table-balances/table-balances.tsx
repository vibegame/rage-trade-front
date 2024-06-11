import Image from "next/image";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import ConnectWalletButton from "../../header/connect-wallet-button";
import { IoArrowUp } from "react-icons/io5";
import { useAccount } from "wagmi";
import { chainLogoMap, tokensLogoMap } from "shared/assets";
import { AccountToken, HyperliquidToken, useTokens } from "modules/web3/tokens";
import SendTransactionModal, {
  PrepareTransaction
} from "../send-transaction-modal";
import { TableColumn } from "./types";

export default function TableBalances() {
  const { isConnected } = useAccount();
  const { fullBalance, accountTokens, hyperliquidTokens } = useTokens();

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  const [preparedTransaction, setPreparedTransaction] =
    useState<PrepareTransaction | null>(null);

  const columns: TableColumn[] = useMemo(
    () => [
      {
        key: "wallet",
        title: "Wallet",
        render: (token: AccountToken | HyperliquidToken) => {
          return (
            <div className="flex items-center gap-2">
              <Image
                src={token.connector.icon || ""}
                width={24}
                height={24}
                alt="Wallet Logo"
              />
              <span className="text-xs font-semibold text-gray-5">
                {token.connector.name}
              </span>
            </div>
          );
        }
      },
      {
        key: "sum",
        title: (
          <div
            className="inline-block cursor-pointer rounded-full bg-gray-10 px-3 py-1 text-xs font-semibold text-gray-5 transition-colors group-hover:bg-gray-9 group-hover:text-gray-1"
            onClick={() => {
              setSortBy(sortBy === "asc" ? "desc" : "asc");
            }}
          >
            100%
            {sortBy === "asc" ? (
              <IoArrowUp className="ml-1 inline-block text-gray-5" />
            ) : (
              <IoArrowUp className="ml-1 inline-block rotate-180 text-gray-5" />
            )}
          </div>
        ),
        render: (token: AccountToken | HyperliquidToken) => {
          let percentage = (token.balance.usd / fullBalance) * 100 || 0;

          return (
            <div className="inline-block rounded-full bg-gray-11 px-3 py-1 text-xs font-semibold text-gray-5 transition-colors group-hover:bg-gray-9 group-hover:text-gray-1">
              {percentage.toFixed(2)}%
            </div>
          );
        }
      },
      {
        key: "chain",
        title: "Chain",
        render: (token: AccountToken | HyperliquidToken) => (
          <Image
            src={chainLogoMap[token.chainId]}
            width={24}
            height={24}
            alt="Chain Logo"
          />
        )
      },
      {
        key: "asset",
        title: "Asset",
        render: (token: AccountToken | HyperliquidToken) => (
          <div className="flex items-center gap-2">
            <Image
              src={tokensLogoMap[token.symbol]}
              width={24}
              height={24}
              alt="Asset Logo"
            />
            <span className="text-xs font-semibold text-gray-1">
              {token.name}
            </span>
          </div>
        )
      },
      {
        key: "balance",
        title: "Balance",
        render: (token: AccountToken | HyperliquidToken) => (
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-1">
              {token.balance.token} {token.name}
            </span>
            <span className="text-xs font-semibold text-gray-5">
              {token.balance.usd.toFixed(2)}$
            </span>
          </div>
        )
      },
      {
        key: "transfer",
        title: "Transfer",
        render: (token: AccountToken | HyperliquidToken) => {
          return (
            <button
              className="text-xs font-semibold text-purple"
              onClick={() => {
                if (token.type === "account") {
                  setPreparedTransaction({
                    accountAddress: token.accountAddress,
                    token: {
                      address: token.contractAddress,
                      symbol: token.symbol,
                      decimals: token.decimals,
                      chainId: token.chainId
                    }
                  });
                }
              }}
            >
              Transfer
            </button>
          );
        }
      }
    ],
    [fullBalance, sortBy]
  );

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-11">
            {columns.map((column, index) => (
              <th
                key={index}
                className={twMerge(
                  "py-3 text-left text-gray-5 font-semibold text-xs",
                  index === 0 && "pl-8"
                )}
                style={{
                  width: column.width,
                  minWidth: column.minWidth
                }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...accountTokens, ...hyperliquidTokens]
            .filter((t) => t.balance.usd > 0)
            .toSorted((ta, tb) => {
              return sortBy === "asc"
                ? ta.balance.usd - tb.balance.usd
                : tb.balance.usd - ta.balance.usd;
            })
            .map((token, index) => (
              <tr
                key={index}
                className="group border-b border-b-gray-10 transition-colors hover:bg-gray-10"
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={twMerge("py-3", index === 0 && "pl-8")}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth
                    }}
                  >
                    {column.render(token)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {!isConnected && <ConnectWalletButton className="mx-auto mt-8" />}
      {preparedTransaction && (
        <SendTransactionModal
          onClose={() => setPreparedTransaction(null)}
          isOpen={!!preparedTransaction}
          prepare={preparedTransaction}
        />
      )}
    </>
  );
}
