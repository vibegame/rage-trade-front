import { arbitrum, optimism } from "viem/chains";
import TableBalances from "./table-balances";
import TopBalances from "./top-balances";
import { useWallets } from "modules/web3";
import { chainLogoMap, tokensLogoMap } from "shared/assets";
import { StaticImageData } from "next/image";

const chains: Record<number, { name: string; logo: StaticImageData }> = {
  [arbitrum.id]: {
    name: "Arbitrum",
    logo: chainLogoMap[arbitrum.id]
  },
  [optimism.id]: {
    name: "Optimism",
    logo: chainLogoMap[optimism.id]
  }
};

export default function Content() {
  const { tokens } = useWallets();

  return (
    <div className="size-full max-h-full overflow-y-auto bg-gray-12">
      <TopBalances />
      <TableBalances
        data={tokens.map((token) => ({
          asset: {
            name: token.name,
            logo: tokensLogoMap[token.symbol]?.src || ""
          },
          wallet: {
            name: token.wallet.connector.name,
            logo: token.wallet.connector.icon
          },
          chain: {
            name: chains[token.chainId].name,
            logo: chains[token.chainId].logo.src
          },
          balance: {
            token: {
              count: Number(token.balance),
              value: token.balance
            },
            value: {
              usd: token.value.usd
            }
          },
          transfer: () => alert(`Transfer ${token.name}`),
          percentage: 100
        }))}
      />
    </div>
  );
}
