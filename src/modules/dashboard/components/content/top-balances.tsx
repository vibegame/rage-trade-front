import Image from "next/image";
import { twMerge } from "tailwind-merge";
import userAvatar from "shared/assets/user-avatar.png";
import metamaskGray from "shared/assets/metamask-gray.png";
import arbitrum from "shared/assets/arbitrum.png";
import optimism from "shared/assets/optimism.png";

export default function TopBalances() {
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
              <span className="text-sm font-semibold">$37,555.24</span>
            </p>
          </div>

          {/* Metamask */}
          <div className="flex items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px]">
            <Image
              alt="Wallet Avatar"
              width={24}
              height={24}
              src={metamaskGray}
              className="rounded-4"
            />
            <p>
              <span className="mr-1 text-xs font-semibold text-gray-5">
                Metamask
              </span>
              <span className="text-sm font-semibold">$132.81</span>
            </p>
          </div>

          {/* Arbitrum */}
          <div className="flex items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px]">
            <Image
              alt="Wallet Avatar"
              width={24}
              height={24}
              src={arbitrum}
              className="rounded-4"
            />
            <p>
              <span className="mr-1 text-xs font-semibold text-gray-5">
                Arbitrum
              </span>
              <span className="text-sm font-semibold">$32.81</span>
            </p>
          </div>

          {/* Optimism */}
          <div className="flex items-center gap-2 rounded-4 border border-gray-10 bg-gray-11 px-2 py-[6px]">
            <Image
              alt="Wallet Avatar"
              width={24}
              height={24}
              src={optimism}
              className="rounded-4"
            />
            <p>
              <span className="mr-1 text-xs font-semibold text-gray-5">
                Optimism
              </span>
              <span className="text-sm font-semibold">$12.81</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
