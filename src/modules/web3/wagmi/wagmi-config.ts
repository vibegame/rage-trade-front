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

export const opConfig = createConfig({
  chains: [optimism],
  transports: {
    [optimism.id]: http()
  },
  ssr: true
});

export const arbConfig = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http()
  },
  ssr: true
});
