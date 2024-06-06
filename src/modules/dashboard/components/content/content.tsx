import TableBalances from "./table-balances";
import TopBalances from "./top-balances";
import metamaskGray from "shared/assets/metamask-gray.png";
import arbitrum from "shared/assets/arbitrum.png";
import optimism from "shared/assets/optimism.png";

export default function Content() {
  return (
    <div className="size-full bg-gray-12">
      <TopBalances />
      <TableBalances
        data={[
          {
            wallet: {
              name: "Metamask",
              logo: metamaskGray.src
            },
            percentage: 50.1,
            chain: {
              name: "Arbitrum",
              logo: arbitrum.src
            },
            asset: {
              logo: metamaskGray.src,
              name: "USDC"
            },
            balance: 1789.14
          },
          {
            wallet: {
              name: "Metamask",
              logo: metamaskGray.src
            },
            percentage: 24.1,
            chain: {
              name: "Optimism",
              logo: optimism.src
            },
            asset: {
              logo: metamaskGray.src,
              name: "USDC"
            },
            balance: 1789.14
          },
          {
            wallet: {
              name: "Trust Wallet",
              logo: metamaskGray.src
            },
            percentage: 11.1,
            chain: {
              name: "Arbitrum",
              logo: arbitrum.src
            },
            asset: {
              logo: metamaskGray.src,
              name: "USDC"
            },
            balance: 1789.14
          }
        ]}
      />
    </div>
  );
}
