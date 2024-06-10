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
  const { tokens, walletsBalances } = useWallets();

  return (
    <div className="size-full max-h-full overflow-y-auto bg-gray-12">
      <TopBalances />
      <TableBalances
        data={tokens.map((token) => ({
          address: token.address,
          asset: {
            name: token.name,
            logo: tokensLogoMap[token.symbol]?.src || ""
          },
          wallet: {
            name: token.wallet.connector.name,
            logo: token.wallet.connector.icon
          },
          chain: {
            id: token.chainId,
            name: chains[token.chainId].name,
            logo: chains[token.chainId].logo.src
          },
          balance: {
            token: token.balance,
            usd: token.value.usd
          },
          transfer: () => alert(`Transfer ${token.name}`),
          percentage:
            (Number(token.value.usd) /
              walletsBalances[token.wallet.connector.name]) *
              100 || 0
        }))}
      />
    </div>
  );
}
