import { arbitrum, optimism } from "viem/chains";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [arbitrum, optimism],
  connectors: [injected()],
  transports: {
    [optimism.id]: http(),
    [arbitrum.id]: http()
  },
  ssr: true
});
