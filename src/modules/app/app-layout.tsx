"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastsManager } from "shared/ui/toast";
import { WagmiProvider } from "wagmi";
import { TokensProvider } from "modules/web3/tokens";
import { wagmiConfig } from "modules/web3/wagmi";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastsManager>
          <TokensProvider>{children}</TokensProvider>
        </ToastsManager>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
