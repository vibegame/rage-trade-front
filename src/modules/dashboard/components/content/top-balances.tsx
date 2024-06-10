import Image from "next/image";
import { twMerge } from "tailwind-merge";
import userAvatar from "shared/assets/user-avatar.png";
import { useWallets } from "modules/web3";
import { chainLogoMap } from "shared/assets";

export default function TopBalances() {
  const { fullBalance, wallets, walletsBalances, chains, chainsBalances } =
    useWallets();

  return (
    <div className="border-b border-b-gray-10 bg-gray-11 py-3 pl-8">
      <div className="flex items-center gap-3">
        <div className={twMerge("flex items-center gap-2")}>
          <div className="flex items-center gap-2 rounded-4 border border-gray-9 bg-gray-10 px-2 py-[6px]">
            <Image
              alt="Wallet Avatar"
              width={24}
              height={24}
              src={userAvatar}
              className="rounded-4"
            />
            <p>
              <span className="mr-1 text-xs font-semibold text-gray-5">
                Balance
              </span>
              <span className="text-sm font-semibold">
                ${fullBalance.toFixed(2)}
              </span>
            </p>
          </div>

          {wallets.map((wallet) => {
            return (
              <div
                key={wallet.connector.name}
                className="flex items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px]"
              >
                <Image
                  alt="Wallet Avatar"
                  width={24}
                  height={24}
                  src={wallet.connector.icon}
                  className="rounded-4"
                />
                <p>
                  <span className="mr-1 text-xs font-semibold text-gray-5">
                    {wallet.connector.name}
                  </span>
                  <span className="text-sm font-semibold">
                    ${walletsBalances[wallet.connector.name]?.toFixed(2)}
                  </span>
                </p>
              </div>
            );
          })}

          {chains.map((chain) => {
            return (
              <div
                key={chain.id}
                className="flex items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px]"
              >
                <Image
                  alt="Wallet Avatar"
                  width={24}
                  height={24}
                  src={chainLogoMap[chain.id]}
                  className="rounded-4"
                />
                <p>
                  <span className="mr-1 text-xs font-semibold text-gray-5">
                    {chain.name}
                  </span>
                  <span className="text-sm font-semibold">
                    ${chainsBalances[chain.id]?.toFixed(2)}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
